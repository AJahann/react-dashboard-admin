import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { CookiesProvider } from "react-cookie";
import { createRoot } from "react-dom/client";

import "./index.css";

import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <AuthProvider>
          <ThemeProvider>
            <AppWrapper>
              <ToastContainer />
              <App />
            </AppWrapper>
          </ThemeProvider>
        </AuthProvider>
      </CookiesProvider>
    </QueryClientProvider>
  </StrictMode>,
);
