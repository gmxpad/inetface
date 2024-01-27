import React, { useEffect, useRef } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function FAQ() {
  const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ref.current?.style.setProperty("opacity", "1");
            ref.current?.style.setProperty("scale", "1");
          } else {
            ref.current?.style.setProperty("opacity", "0.01");
            ref.current?.style.setProperty("scale", "0.9");
          }
        },
        { threshold: 0.4 }
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref]);
  };
  const FAQ_ITEMS = [
    {
      id: 0,
      query: "What is GameXPad?",
      answer:
        "GameXPad is a blockchain-based platform that represents the convergence of the gaming world and finance. It offers a range of features for gamers, developers, and investors, facilitating interaction between game projects, players, and investors.",
    },
    {
      id: 1,
      query: "What is GMXP Token and What is Its Purpose?",
      answer:
        "GameXPad offers features such as IDO Launchpad, INO Platform, NFT Marketplace, and Gaming Hub. The IDO Launchpad supports the launch of new game projects, while the INO Platform provides funding for independent developers. The NFT Marketplace allows gamers to buy and sell digital assets, and the Gaming Hub brings together a global gaming community.",
    },
    {
      id: 2,
      query: "What Features Does GameXPad Offer?",
      answer:
        "GameXPad offers features such as IDO Launchpad, INO Platform, NFT Marketplace, and Gaming Hub. The IDO Launchpad supports the launch of new game projects, while the INO Platform provides funding for independent developers. The NFT Marketplace allows gamers to buy and sell digital assets, and the Gaming Hub brings together a global gaming community.",
    },
    {
      id: 3,
      query: "What is the Relationship Between GameXPad and SKALE Network?",
      answer:
        "GameXPad has established a strategic partnership with SKALE Network. SKALE Network's scalability solutions enhance GameXPad's transaction speed and offer low transaction fees, helping GameXPad reach a wider user base.",
    },
  ];
  const FAQ_ITEMS_2 = [
    {
      id: 4,
      query: "What Problems Does GameXPad Solve?",
      answer:
        "GameXPad addresses the limitations of traditional gaming platforms. It enables players to own real digital assets, provides funding to independent developers, and facilitates interaction between players, developers, and investors.",
    },
    {
      id: 5,
      query: "How Do I Stake My Tokens?",
      answer:
        "GameXpad's staking system allows users to stake their GMXP tokens to earn rewards in $GMXP and participate in upcoming projects launching on the platform. The Staking Score is calculated based on the number of staked tokens and multipliers for the amount and duration of staking.",
    },
    {
      id: 6,
      query: "How Can I Participate in Launchpads?",
      answer:
        "A certain GMXP Score grants guaranteed allocations in Launchpads. Staking more GMXP for longer periods results in larger allocation quotas.",
    },
    {
      id: 7,
      query: "How Can I Purchase GMXP Tokens?",
      answer:
        "You can purchase GameXPad (GMXP) tokens from various decentralized exchanges (DEXs) and centralized exchanges (CEXs). However, GMXP tokens have not yet been officially listed on specific exchanges. Please regularly check the official GameXPad website or GameXPad's official communication channels as this information may be updated.",
    },
  ];

  const divRef = useRef<HTMLDivElement>(null);
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);
  const divRef4 = useRef<HTMLDivElement>(null);
  const divRef5 = useRef<HTMLDivElement>(null);
  const divRef6 = useRef<HTMLDivElement>(null);
  const divRef7 = useRef<HTMLDivElement>(null);
  const divRef8 = useRef<HTMLDivElement>(null);

  useIntersectionObserver(divRef);
  useIntersectionObserver(divRef1);
  useIntersectionObserver(divRef2);
  useIntersectionObserver(divRef3);
  useIntersectionObserver(divRef4);
  useIntersectionObserver(divRef5);
  useIntersectionObserver(divRef6);
  useIntersectionObserver(divRef7);
  useIntersectionObserver(divRef8);

  return (
    <>
      <div className="flex flex-col gap-12 justify-center items-center pb-24">
        <div
          ref={divRef}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="flex flex-col items-center justify-center text-center text-white gap-2">
          <p className=" font-SpaceGro sm:text-3xl md:text-3xl xl:text-5xl text-white z-10">
            FAQ
          </p>
          <p>The Most Common Questions</p>
        </div>
        <div className="flex w-full xl:flex-row md:flex-col sm:flex-col justify-between">
          <div className="h-full flex flex-col xl:justify-start md:justify-center sm:justify-center  xl:w-1/2 sm:w-full md:w-full rounded-lg">
            <div
              ref={divRef1}
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}
              className="  text-white/75 p-4 gap-2 flex flex-col">
              <Accordion
                variant="light"
                showDivider={false}
                itemClasses={{
                  base: "w-full py-2",
                  heading:
                    " data-[open=true]:bg-dark-gray  bg-dark-gray px-4 py-2 rounded",
                  indicator: " text-white data-[open=true]:text-white",
                  content: "px-3 rounded mt-2 bg-dark text-[#9d9d9d]",
                  trigger: "mt-2",
                  title: " text-white text-sm data-[open=true]:text-white",
                }}>
                {FAQ_ITEMS.map((item) => (
                  <AccordionItem
                    key={"key" + item.id.toString()}
                    title={item.query}>
                    <div>{item.answer}</div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
          <div className="h-full md:flex sm:hidden flex-col xl:w-1/2 md:w-full sm:w-full rounded-lg">
            <div
              ref={divRef2}
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}
              className="  text-white/75 p-4 gap-2 flex flex-col">
              <Accordion
                variant="light"
                showDivider={false}
                itemClasses={{
                  base: "w-full py-2",
                  heading:
                    " data-[open=true]:bg-dark-gray  bg-dark-gray px-4 py-2 rounded",
                  indicator: " text-white data-[open=true]:text-white",
                  content: "px-3 rounded mt-2 bg-dark text-[#9d9d9d]",
                  trigger: "mt-2",
                  title: " text-white text-sm data-[open=true]:text-white",
                }}>
                {FAQ_ITEMS_2.map((item) => (
                  <AccordionItem
                    key={"key" + item.id.toString()}
                    title={item.query}>
                    <div>{item.answer}</div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
