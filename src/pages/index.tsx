import React, { useEffect } from "react";
import AccessGames from "@/components/accessGames";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import HeroHeader from "@/components/heroHeader";
import HowToJoin from "@/components/howToJoin";
import IgoAndIno from "@/components/igoAndIno";
import PopulerGames from "@/components/populerGames";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

export default function Home() {
  const SKALE_CHAIN_ID: number = 1351057110;

  const {
    address: userAddress,
    isConnected: connect,
    isDisconnected: disconnect,
  } = useAccount();

  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();
  const { chain } = useNetwork();
  const selectedObject: any = chains.find((item) => item.id === SKALE_CHAIN_ID);

  const FSCNetworkFunction = () => {
    if (chain) {
      if (SKALE_CHAIN_ID > 0 && chain?.id !== SKALE_CHAIN_ID) {
        switchNetwork?.(selectedObject.id);
      }
    }
  };

  useEffect(() => {
    if (connect === true) {
      FSCNetworkFunction();
    }
  }, [chain, connect, userAddress]);

  return (
    <>
      <div className="flex flex-col sm:gap-20 md:gap-48 sm:px-[5%] md:px-[10%]">
        <section>
          <HeroHeader />
        </section>
        <section>
          <IgoAndIno />
        </section>
        <section>
          <HowToJoin />
        </section>
        <section>
          <AccessGames />
        </section>
        <section>
          <Features />
        </section>
        <section>
          <PopulerGames />
        </section>
        <section>
          <FAQ />
        </section>
      </div>
    </>
  );
}
