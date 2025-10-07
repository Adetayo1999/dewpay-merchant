import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./store";
import router from "./routes";
import { ErrorBoundary } from "@components/error-boundary";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "transparent",
              boxShadow: "none",
              padding: 0,
            },
          }}
          containerStyle={{
            top: 20,
            right: 20,
          }}
        />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
