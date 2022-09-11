import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import '@rainbow-me/rainbowkit/styles.css';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Chain, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
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

const polygonChain: Chain = {
  id: 137,
  name: 'Polygon',
  network: 'polygon',
  iconUrl: 'https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Matic',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: 'https://polygon-rpc.com/',
  },
  blockExplorers: {
    default: { name: 'PolygonScan', url: 'https://polygonscan.com' },
    etherscan: { name: 'PolygonScan', url: 'https://polygonscan.com' },
  },
};

const mumbaiChain: Chain = {
  id: 80_001,
  name: 'Mumbai',
  network: 'mumbai',
  iconUrl: 'https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Matic',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: 'https://rpc-mumbai.maticvigil.com/',
  },
  blockExplorers: {
    default: { name: 'PolygonScan', url: 'https://mumbai.polygonscan.com/' },
    etherscan: { name: 'PolygonScan', url: 'https://mumbai.polygonscan.com/' },
  },
};



const { provider, chains } = configureChains(
  [polygonChain, mumbaiChain],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const client = createClient({
  provider,
  autoConnect: true,
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
