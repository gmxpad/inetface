import AccessGames from "@/components/accessGames";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import HeroHeader from "@/components/heroHeader";
import HowToJoin from "@/components/howToJoin";
import IgoAndIno from "@/components/igoAndIno";
import PopulerGames from "@/components/populerGames";
import React from "react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-48 px-[10%]">
        <section>
          <HeroHeader />
        </section>
        <div>
          <IgoAndIno />
        </div>
        <div>
          <HowToJoin />
        </div>
        <div>
          <AccessGames />
        </div>
        <div>
          <Features />
        </div>
        <div>
          <PopulerGames />
        </div>
        <div>
          <FAQ />
        </div>
      </div>
    </>
  );
}
