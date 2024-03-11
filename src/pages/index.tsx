import React, { useEffect } from "react";
import AccessGames from "@/components/accessGames";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import HeroHeader from "@/components/heroHeader";
import HowToJoin from "@/components/howToJoin";
import IgoAndIno from "@/components/igoAndIno";
import PopulerGames from "@/components/populerGames";

import { getStaticProps } from "@/framework/rest/ipos.ssr";
import { InferGetStaticPropsType } from "next";
import { NextPageWithLayout } from "@/types";
export { getStaticProps };

const Home: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ ipos }: any) => {
  return (
    <>
      <div className="flex flex-col sm:gap-20 md:gap-48 ">
        <section className="sm:px-[5%] md:px-[10%]">
          <HeroHeader publishedProjects={ipos.length} userCount={ipos.length} />
        </section>
        <section className="sm:px-[5%] md:px-[10%]">
          <IgoAndIno games={ipos} />
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
        {/* <section className="sm:px-[5%] md:px-[10%]">
          <PopulerGames />
        </section> */}
        <section className="sm:px-[1%] md:px-[8%]">
          <FAQ />
        </section>
      </div>
    </>
  );
};

export default Home;
