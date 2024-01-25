import React from "react";
import AccessGames from "@/components/accessGames";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import HeroHeader from "@/components/heroHeader";
import HowToJoin from "@/components/howToJoin";
import IgoAndIno from "@/components/igoAndIno";
import PopulerGames from "@/components/populerGames";

export default function Home() {
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
