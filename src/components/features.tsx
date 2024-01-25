import React, { useEffect, useRef } from "react";
import { Button, Image, Link } from "@nextui-org/react";

const Features = () => {
  const SLIDES = [
    {
      image: "/icons/trigger-7.svg",
      name: "IDO",
      desx: "Your gateway to the next generation of gaming finance, offering early access to exclusive GameFi projects.",
      link: "/",
    },
    {
      image: "/icons/trigger-7.svg",
      name: "INO",
      desx: "Unleash the potential of gaming with exclusive NFT offerings, crafting your path in the GameFi universe.",
      link: "/",
    },
    {
      image: "/icons/trigger-7.svg",
      name: "NFT Marketplace",
      desx: "Trade, collect, and strategize with rare digital assets in the ultimate GameFi ecosystem.",
      link: "/",
    },
    {
      image: "/icons/trigger-7.svg",
      name: "Gaming Hub",
      desx: "Connect, collaborate, and conquer in our dynamic GameFi community, where every player has a role.",
      link: "/",
    },
  ];

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

  const divRef = useRef<HTMLDivElement>(null);
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);
  const divRef4 = useRef<HTMLDivElement>(null);
  const divRef5 = useRef<HTMLDivElement>(null);

  useIntersectionObserver(divRef);
  useIntersectionObserver(divRef1);
  useIntersectionObserver(divRef2);
  useIntersectionObserver(divRef3);
  useIntersectionObserver(divRef4);
  useIntersectionObserver(divRef5);

  return (
    <>
      <div className="flex flex-col gap-28 text-white relative items-center justify-center">
        <div
          style={{ width: "50%" }}
          className="dual-background sm:hidden md:flex absolute opacity-30 z-0"></div>
        <div
          ref={divRef}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="flex flex-col gap-8 w-full items-center z-10 justify-center">
          <p className="md:text-5xl sm:text-3xl font-SpaceGro">Features</p>
          <p className="xl:w-1/3 sm:w-full text-center">
            We are constantly working to bring new updates and features to
            GameXPad, such as:
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 sm:gap-16 md:gap-16 xl:gap-12 text-white z-10">
          {SLIDES.map((item: any, index: number) => (
            <div
              ref={
                index === 0
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
              className="">
              <div className="flex items-center h-[150px] rounded-full justify-center relative">
                <div className="absolute -top-8 ">
                  <Image width={120} src={item.image} />
                </div>
              </div>
              <div className="text-center flex mt-5 gap-5 flex-col items-center">
                <p className="text-2xl">{item.name}</p>
                <p className="w-[80%] text-[#9d9d9d]">{item.desx}</p>
              </div>
            </div>
          ))}
        </div>
        <div
          ref={divRef5}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="flex flex-col w-full gap-8 justify-center items-center z-10">
          <p className="md:text-4xl sm:text-2xl font-SpaceGro">
            And so much more...
          </p>
          <p className="xl:w-[42%] text-center">
            For detailed product insights, explore our documentation.
          </p>
          <Button
            as={Link}
            isExternal={true}
            className="bg-transparent text-white font-bold  text-xl duration-300 border-3 py-7 px-8 border-white"
            href="https://docs.gamexpad.io/">
            Learn More
          </Button>
        </div>
      </div>
    </>
  );
};

export default Features;
