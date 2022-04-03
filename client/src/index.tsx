import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <MoralisProvider
      initializeOnMount
      appId={process.env.REACT_APP_MORALIS_APP_ID ?? ""}
      serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL ?? ""}
    >
      <App />
    </MoralisProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
