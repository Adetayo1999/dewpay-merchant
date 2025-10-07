import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import {
  showApiSuccessToast,
  showApiErrorToast,
} from "@components/toast/custom-toast";
import {
  useChangeMerchantModeMutation,
  useLogoutMutation,
} from "../../store/api/merchantApi";

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

  useEffect(() => {
    loadAppState();
  }, []);

  const loadAppState = useCallback(async () => {
    try {
      const appState = await getFromCache("app");
      if (appState) {
        setState((prev) => ({
          ...prev,
          app: { ...prev.app, ...appState },
        }));
      }
    } catch (error) {
      console.error("Error loading app state:", error);
    }
  }, []);

  const updateAppCache = useCallback(async (path: string, data: any) => {
    try {
      const existingData = (await getFromCache(path)) || {};
      const updatedData = { ...existingData, ...data };
      localStorage.setItem(path, JSON.stringify(updatedData));
      return updatedData;
    } catch (error) {
      console.error("Error updating cache:", error);
      throw error;
    }
  }, []);

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

  const getFromCache = useCallback(async (path: string) => {
    try {
      const data = localStorage.getItem(path);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error reading from cache:", error);
      return null;
    }
  }, []);

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
    <div className="flex items-center space-x-4">
      {/* Mode Toggle */}
      <ModeToggle
        isLive={state.app.isLive}
        onChange={changeAppStatus}
        loading={state.loading.modeChange}
      />

      {/* Logout Button */}
      <button
        onClick={handleLogoutClick}
        disabled={state.loading.logout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2"
      >
        {state.loading.logout ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
    <label className="flex items-center space-x-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={isLive}
          onChange={(e) => onChange(e.target.checked)}
          disabled={loading}
          className="sr-only"
        />
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            isLive ? "bg-green-500" : "bg-gray-300"
          } ${loading ? "opacity-50" : ""}`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
              isLive ? "translate-x-6" : "translate-x-0.5"
            } mt-0.5`}
          />
        </div>
      </div>
      <span className={`text-sm font-medium ${loading ? "opacity-50" : ""}`}>
        {isLive ? "Live" : "Demo"}
        {loading && " (Updating...)"}
      </span>
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
