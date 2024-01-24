import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/ui/header";
import "@/assets/globals.css";
import Footer from "@/components/ui/footer";

import { skaleChaosTestnet } from "wagmi/chains";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";

const chains = [skaleChaosTestnet];
const projectId: string =
  process.env.PROJECT_ID || "bf329c0050689f9c83bf06a7d4016bb6";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ chains, projectId }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <NextUIProvider>
          <div className="bg-dark">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </NextUIProvider>
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
