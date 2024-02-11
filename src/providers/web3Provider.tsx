"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { ReactNode } from "react";

const projectId = "bf329c0050689f9c83bf06a7d4016bb6";

const nebula = {
  chainId: 37084624,
  name: "SKALE | Nebula Gaming Hub Testnet",
  currency: "sFUEL",
  explorerUrl:
    "https://lanky-ill-funny-testnet.explorer.testnet.skalenodes.com/",
  rpcUrl: "https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet",
};

const metadata = {
  name: "GAMEXPAD",
  description:
    "Elevate Your Gaming Experience with Our Route to Triumph and Beyond!",
  url: "https://gamexpad.io",
  icons: ["/logos/gmx-logo.svg"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata,
  }),

  chains: [nebula],
  defaultChain: nebula,
  chainImages: {
    37084624: "/chains/skale.svg",
  },
  projectId,
  privacyPolicyUrl: "https://gamexpad.io/privacy-policy",
  themeMode: "dark",
  themeVariables: {
    "--w3m-color-mix": "#a664fe",
    "--w3m-color-mix-strength": 10,
    "--w3m-accent": "#a664fe",
    "--w3m-z-index": 999999999,
    "--w3m-border-radius-master": "1px",
  },
});

export function Web3ModalProvider({ children }: { children: ReactNode }) {
  return children;
}
