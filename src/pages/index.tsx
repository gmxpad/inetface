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
      <div className="flex flex-col gap-20 ">
        <div className="px-[18%]">
          <HeroHeader />
        </div>
        <div className="px-[18%]">
          <IgoAndIno />
        </div>
        <div className="px-[18%]">
          <HowToJoin />
        </div>
        <div className="px-[10%]">
          <AccessGames />
        </div>
        <div className="px-[18%]">
          <Features />
        </div>
        <div className="px-[18%]">
          <PopulerGames />
        </div>
        <div className="px-[18%]">
          <FAQ />
        </div>
      </div>
    </>
  );
}
