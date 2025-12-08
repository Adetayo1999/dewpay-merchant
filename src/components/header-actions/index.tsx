/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import {
  showApiSuccessToast,
  showApiErrorToast,
} from "@components/toast/custom-toast";
import {
  useChangeMerchantModeMutation,
  useLogoutMutation,
} from "../../store/api/merchantApi";
import { paths } from "@routes/paths";

interface AppState {
  unlocked: boolean;
  isLive: boolean;
  isSidebarOpen: boolean;
}

interface HeaderActionsState {
  app: AppState;
  loading: {
    modeChange: boolean;
    logout: boolean;
  };
  showLogoutConfirm: boolean;
}

export const HeaderActions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [changeMerchantMode] = useChangeMerchantModeMutation();
  const [logoutApi] = useLogoutMutation();

  const [state, setState] = useState<HeaderActionsState>({
    app: {
      unlocked: false,
      isLive: false,
      isSidebarOpen: false,
    },
    loading: {
      modeChange: false,
      logout: false,
    },
    showLogoutConfirm: false,
  });

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.first_name) {
      return user.first_name[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown]);

  const getFromCache = useCallback(async (path: string) => {
    try {
      const data = localStorage.getItem(path);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading from cache:", error);
      return null;
    }
  }, []);

  const updateAppCache = useCallback(
    async (path: string, data: any) => {
      try {
        const existingData = (await getFromCache(path)) || {};
        const updatedData = { ...existingData, ...data };
        localStorage.setItem(path, JSON.stringify(updatedData));
        return updatedData;
      } catch (error) {
        console.error("Error updating cache:", error);
        throw error;
      }
    },
    [getFromCache]
  );

  const clearAppCache = useCallback(async () => {
    try {
      const keysToRemove = [
        "bio_data",
        "account",
        "merchant_id",
        "token",
        "app",
        "user_preferences",
      ];

      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });

      console.info("Cache cleared successfully");
    } catch (error) {
      console.error("Error clearing cache:", error);
      throw error;
    }
  }, []);

  // Initialize mode from profile status or cache
  useEffect(() => {
    const initializeMode = async () => {
      // First, try to get from user profile (most accurate)
      if (user?.status) {
        const isLive = user.status.toLowerCase() === "live";
        setState((prev) => ({
          ...prev,
          app: { ...prev.app, isLive },
        }));
        // Update cache to match profile
        await updateAppCache("app", { isLive });
      } else {
        // Fallback to cache if profile not loaded yet
        try {
          const appState = await getFromCache("app");
          if (appState?.isLive !== undefined) {
            setState((prev) => ({
              ...prev,
              app: { ...prev.app, isLive: appState.isLive },
            }));
          }
        } catch (error) {
          console.error("Error loading app state:", error);
        }
      }
    };

    initializeMode();
  }, [user?.status, updateAppCache, getFromCache]);

  const changeAppStatus = useCallback(
    async (isLive: boolean) => {
      setState((prev) => ({
        ...prev,
        loading: { ...prev.loading, modeChange: true },
      }));

      try {
        // Call API to change merchant mode
        await changeMerchantMode({ mode: isLive ? "live" : "demo" }).unwrap();

        console.info("Merchant App Status:", {
          mode: isLive ? "live" : "demo",
        });

        // Update local state
        setState((prev) => ({
          ...prev,
          app: {
            ...prev.app,
            isLive: isLive,
          },
          loading: { ...prev.loading, modeChange: false },
        }));

        // Update localStorage
        await updateAppCache("app", { isLive });

        // Show success notification
        showApiSuccessToast(`Switched to ${isLive ? "Live" : "Demo"} mode`);
      } catch (error) {
        console.error("Error changing app status:", error);
        showApiErrorToast("Failed to change app mode");

        // Revert toggle state on error
        setState((prev) => ({
          ...prev,
          app: {
            ...prev.app,
            isLive: !isLive,
          },
          loading: { ...prev.loading, modeChange: false },
        }));
      }
    },
    [changeMerchantMode, updateAppCache]
  );

  const handleLogout = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      loading: { ...prev.loading, logout: true },
    }));

    try {
      // Call logout API (optional)
      try {
        await logoutApi().unwrap();
      } catch (apiError) {
        // If API logout fails, continue with local logout
        console.warn(
          "API logout failed, proceeding with local logout:",
          apiError
        );
      }

      // Clear all cached data
      await clearAppCache();

      console.info("Logged out successfully");
      console.clear();

      // Dispatch logout action to clear Redux state
      dispatch(logout());

      // Show success notification
      showApiSuccessToast("Logged out successfully");

      // Navigate to landing page
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
      showApiErrorToast("Error during logout");
    } finally {
      setState((prev) => ({
        ...prev,
        loading: { ...prev.loading, logout: false },
        showLogoutConfirm: false,
      }));
    }
  }, [logoutApi, clearAppCache, dispatch, navigate]);

  const handleLogoutClick = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showLogoutConfirm: true,
    }));
  }, []);

  const confirmLogout = useCallback(() => {
    handleLogout();
  }, [handleLogout]);

  const cancelLogout = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showLogoutConfirm: false,
    }));
  }, []);

  return (
    <div className="flex items-center gap-x-5">
      {/* Mode Toggle */}
      <ModeToggle
        isLive={state.app.isLive}
        onChange={changeAppStatus}
        loading={state.loading.modeChange}
      />

      {/* User Avatar Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowUserDropdown(!showUserDropdown)}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm border-2 border-white/30">
            {getUserInitials()}
          </div>
          <svg
            className={`h-4 w-4 text-white transition-transform ${
              showUserDropdown ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {showUserDropdown && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                  {getUserInitials()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.first_name && user?.last_name
                      ? `${user.first_name} ${user.last_name}`
                      : user?.email || "User"}
                  </p>
                  {user?.email && (
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={() => {
                  navigate(paths.settings.profile);
                  setShowUserDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Profile
              </button>
              <button
                onClick={() => {
                  navigate(paths.settings.index);
                  setShowUserDropdown(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Settings
              </button>
            </div>

            {/* Logout Button */}
            <div className="border-t border-gray-200 pt-1">
              <button
                onClick={handleLogoutClick}
                disabled={state.loading.logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {state.loading.logout ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                    Logging out...
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmationDialog
        isOpen={state.showLogoutConfirm}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
        loading={state.loading.logout}
      />
    </div>
  );
};

// Mode Toggle Component
interface ModeToggleProps {
  isLive: boolean;
  onChange: (isLive: boolean) => void;
  loading: boolean;
}

const ModeToggle = ({ isLive, onChange, loading }: ModeToggleProps) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          checked={isLive}
          onChange={(e) => onChange(e.target.checked)}
          disabled={loading}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 rounded-full transition-all duration-300 ${
            isLive ? "bg-green-500" : "bg-gray-400"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""} ${
            !loading ? "group-hover:shadow-md" : ""
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-300 ${
              isLive ? "translate-x-5" : "translate-x-0.5"
            } mt-0.5`}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <span
          className={`text-xs font-semibold text-white leading-tight ${
            loading ? "opacity-50" : ""
          }`}
        >
          {isLive ? "Live" : "Demo"}
        </span>
        {loading && (
          <span className="text-[10px] text-white/70">Updating...</span>
        )}
      </div>
    </label>
  );
};

// Logout Confirmation Dialog Component
interface LogoutConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

const LogoutConfirmationDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  loading,
}: LogoutConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-[1000000000] w-full h-screen  bg-black bg-opacity-50 flex items-center justify-center top-0 left-0">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Confirm Logout
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to logout? You will need to sign in again to
          access your account.
        </p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
