"use client";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/providers/layout";
import "@/assets/globals.css";

import { skaleChaosTestnet } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { Provider as ReduxProvider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { NextPageWithLayout } from "@/types";
import { wrapper } from "@/store/store";

const chains = [skaleChaosTestnet, skaleChaosTestnet];

const projectId: string = "bf329c0050689f9c83bf06a7d4016bb6";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ReduxProvider store={store}>
          <NextUIProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NextUIProvider>
        </ReduxProvider>
      </WagmiConfig>
      <Web3Modal
        themeVariables={{
          "--w3m-accent-color": "#a664fe",
          "--w3m-background-color": "#a664fe",
          "--w3m-z-index": "999999999999",
        }}
        themeMode="dark"
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
