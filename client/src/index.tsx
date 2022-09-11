import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import '@rainbow-me/rainbowkit/styles.css';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff"
    }
  }
});

const { provider, webSocketProvider, chains } = configureChains(defaultChains, [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
  // added connectors from rainbowkit
  connectors,
});

root.render(
  <StrictMode>
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains}>
        <ThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
