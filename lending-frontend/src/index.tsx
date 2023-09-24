import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { 
  mainnet,
  goerli,
  polygon,
  polygonZkEvm,
  polygonZkEvmTestnet,
  gnosis,
  gnosisChiado,
} from 'wagmi/chains'
import { environment } from './utils/environment.js';
import { Provider } from 'react-redux'
import {store, persistor} from './redux/store';
import { LensConfig, development, production, LensProvider } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
import { PersistGate } from 'redux-persist/integration/react';


const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
};

const chains = [
  mainnet,
  goerli,
  polygon,
  polygonZkEvm,
  polygonZkEvmTestnet,
  gnosis,
  gnosisChiado
];

const wagmiConfig = defaultWagmiConfig({ chains, projectId: environment.WALLETCONNECT.PROYECT_ID, appName: 'Web3Modal' })

createWeb3Modal({ wagmiConfig, projectId: environment.WALLETCONNECT.PROYECT_ID, chains })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <WagmiConfig config={wagmiConfig}>
          <LensProvider config={lensConfig}>
            <App />
          </LensProvider>
        </WagmiConfig>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);