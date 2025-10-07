import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

interface UIState {
  sidebarOpen: boolean;
  notifications: Notification[];
  activeModal: string | null;
  theme: "light" | "dark";
  loadingStates: Record<string, boolean>;
}

const initialState: UIState = {
  sidebarOpen: true,
  notifications: [],
  activeModal: null,
  theme: "light",
  loadingStates: {},
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    addNotification: (
      state,
      action: PayloadAction<Omit<Notification, "id">>
    ) => {
      const id = Date.now().toString();
      state.notifications.push({ ...action.payload, id });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setLoadingState: (
      state,
      action: PayloadAction<{ key: string; loading: boolean }>
    ) => {
      state.loadingStates[action.payload.key] = action.payload.loading;
    },
    clearLoadingState: (state, action: PayloadAction<string>) => {
      delete state.loadingStates[action.payload];
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  addNotification,
  removeNotification,
  clearNotifications,
  setActiveModal,
  toggleTheme,
  setTheme,
  setLoadingState,
  clearLoadingState,
} = uiSlice.actions;

export default uiSlice.reducer;
