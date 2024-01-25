import React, { useEffect, useRef } from "react";

import { Image } from "@nextui-org/react";

const HowToJoin = () => {
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
  const SLIDES = [
    {
      image: "/icons/trigger-1.svg",
      name: "Get $GMXP",
      desx: "Get your hands on $GMXP tokens and unlock the door to engaging in exciting Initial Game Offerings (IGOs) available on GameXPad.",
      link: "/",
    },
    {
      image: "/icons/trigger-1.svg",
      name: "Stake $GMXP",
      desx: "Unlock the world of Initial Game Offerings (IGOs) with GMXP token staking. The key to winning is here at GameXPad!",
      link: "/",
    },
    {
      image: "/icons/trigger-1.svg",
      name: "Register",
      desx: "Apply to IGOs and unlock your path to winning by determining your participation amount with GameXPad.",
      link: "/",
    },
    {
      image: "/icons/trigger-1.svg",
      name: "Join IDO",
      desx: "Acquire your new tokens and reveal the earnings that are on the horizon. Your adventure towards success begins now!",
      link: "/",
    },
  ];

  const divRef = useRef<HTMLDivElement>(null);
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);
  const divRef4 = useRef<HTMLDivElement>(null);

  useIntersectionObserver(divRef);
  useIntersectionObserver(divRef1);
  useIntersectionObserver(divRef2);
  useIntersectionObserver(divRef3);
  useIntersectionObserver(divRef4);

  return (
    <>
      <div className=" flex flex-col gap-5">
        <div
          ref={divRef}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="text-4xl text-white font-semibold">
          <p>HOW TO JOIN?</p>
        </div>
        <div className="grid grid-cols-2 gap-12 text-white">
          {SLIDES.map((item: any, index: number) => (
            <div
              ref={
                index == 0
                  ? divRef1
                  : index === 1
                  ? divRef2
                  : index === 2
                  ? divRef3
                  : divRef4
              }
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}
              key={"how_to_join_key_" + index.toString()}
              className="bg-dark-gray rounded-lg ">
              <div className="flex p-5">
                <div className="w-1/2 flex flex-col gap-7">
                  <p className="text-2xl">{item.name}</p>
                  <p className="text-[#9d9d9d]">{item.desx}</p>
                </div>
                <div className="flex w-1/2 justify-center items-center h-full relative">
                  <div className="absolute -top-12 right-0">
                    <Image width={180} src={item.image} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default HowToJoin;
