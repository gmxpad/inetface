import React, { useEffect } from "react";
import AccessGames from "@/components/accessGames";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import HeroHeader from "@/components/heroHeader";
import HowToJoin from "@/components/howToJoin";
import IgoAndIno from "@/components/igoAndIno";
import PopulerGames from "@/components/populerGames";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { skaleNebulaTestnet } from "viem/chains";

export default function Home() {
  return (
    <>
      <div className="flex flex-col sm:gap-20 md:gap-48 ">
        <section className="sm:px-[5%] md:px-[10%]">
          <HeroHeader />
        </section>
        <section className="sm:px-[5%] md:px-[10%]">
          <IgoAndIno />
        </section>
        <section className="sm:px-[5%] md:px-[10%]">
          <HowToJoin />
        </section>
        <section className="sm:px-[5%] md:px-[10%]">
          <AccessGames />
        </section>
        <section className="sm:px-[5%] md:px-[10%]">
          <Features />
        </section>
        <section className="sm:px-[5%] md:px-[10%]">
          <PopulerGames />
        </section>
        <section className="sm:px-[1%] md:px-[8%]">
          <FAQ />
        </section>
      </div>
    </>
  );
}
