import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { bsc } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "BrokeToRich",
  projectId: "aac38f12829e8f9cc02d3e10d2e83746",
  chains: [bsc],
});
const queryClient = new QueryClient();cle

// Widget initialization function
function initWidget(containerId = 'widget-container') {
  console.log('Initializing widget in container:', containerId);
  
  const container = document.getElementById(containerId);
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            modalSize="compact"
            theme={darkTheme({
              overlayBlur: "small",
            })}
          >
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
    console.log('Widget initialized successfully');
    return true;
  } else {
    console.error(`Container with ID "${containerId}" not found`);
    return false;
  }
}

// Auto-initialize when DOM is ready
function autoInit() {
  if (document.getElementById('widget-container')) {
    initWidget();
  }
}

// Check if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  // DOM is already loaded
  autoInit();
}

// Export the init function - this becomes window.ReactPresaleWidget in IIFE builds
export default initWidget;