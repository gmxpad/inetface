import React, { useEffect, useRef } from "react";
import { Link, Button, Image } from "@nextui-org/react";

const HeroHeader = () => {
  const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>) => {
    useEffect(() => {
      const currentRef = ref.current;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            currentRef?.style.setProperty("opacity", "1");
            currentRef?.style.setProperty("scale", "1");
          } else {
            currentRef?.style.setProperty("opacity", "0.01");
            currentRef?.style.setProperty("scale", "0.9");
          }
        },
        { threshold: 0.4 }
      );
      if (currentRef) {
        observer.observe(currentRef);
      }
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [ref]);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const divRef1 = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);

  useIntersectionObserver(divRef);
  useIntersectionObserver(divRef1);
  useIntersectionObserver(divRef2);
  useIntersectionObserver(divRef3);

  return (
    <>
      <div className=" flex w-full h-full py-8 sm:flex-col-reverse md:flex-col-reverse lg:flex-row justify-between relative items-center">
        <div className="absolute md:flex sm:hidden dual-gradient-background top-12 -left-12 opacity-50 z-0"></div>
        <div
          ref={divRef}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="flex flex-col h-full sm:w-full md:w-full lg:w-[49%] gap-10 text-white">
          <div className="sm:text-6xl md:text-8xl sm:text-center md:text-center lg:text-start xl:text-9xl font-SpaceGro font-bold flex flex-col gap-3">
            <p>Play,</p>
            <p>Invest</p>
            <p>& Earn</p>
            <p className="lg:text-lg sm:text-base md:text-base lg:w-[85%]">
              New Era of Decentralized Game Publisher Platform.
            </p>
          </div>
          <div
            ref={divRef1}
            style={{
              opacity: "0.01",
              scale: "0.9",
              transition: "scale 1s, opacity 1s",
            }}
            className="flex sm:flex-col sm:justify-center sm:items-center sm:gap-6 md:justify-between md:items-center md:gap-6 lg:justify-between sm:w-full md:w-full lg:w-2/3">
            <div className="flex flex-col sm:text-center ">
              <div className="text-lg  relative md:max-w-48 whitespace-nowrap">
                Project Published
                <span className="absolute -top-11 text-6xl text-purple-600 -right-3">
                  .
                </span>
              </div>
              <p className="text-5xl font-mono">0</p>
            </div>
            <div className="flex flex-col sm:text-center ">
              <div className="text-lg relative md:max-w-12 sm:text-center ">
                Users
                <span className="absolute -top-11 text-6xl text-green-550 -right-3">
                  .
                </span>
              </div>
              <p className="text-5xl font-mono">0</p>
            </div>
          </div>
          <div
            ref={divRef2}
            style={{
              opacity: "0.01",
              scale: "0.9",
              transition: "scale 1s, opacity 1s",
            }}
            className="flex lg:gap-12 sm:justify-between md:gap-5 md:justify-center xl:justify-start w-full">
            <Button
              as={Link}
              isExternal={true}
              className="bg-transparent text-white font-bold  text-xl duration-300 border-3 py-7 md:px-8 sm:w-[45%] border-white"
              href="https://docs.gamexpad.io/">
              Learn More
            </Button>

            <Button
              as={Link}
              isExternal={true}
              className="bg-[#a664fe] text-white font-bold  text-xl duration-300 border-3 py-7 md:px-8 sm:w-[45%] border-[#a664fe]"
              href="https://tl2s7cdikdk.typeform.com/to/k7QUQDdh">
              Submit Project
            </Button>
          </div>
        </div>
        <div
          ref={divRef3}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="lg:absolute sm:flex md:flex lg:bottom-12 xl:bottom-0 xl:right-12 lg:right-0 h-full">
          <Image
            width={550}
            height={550}
            className="xl:w-full lg:w-[500px] md:w-[600px] sm:w-[300px] "
            src="/gamesGallery/katanainu/blockchain-pose.webp"
            alt="game-chracter"
          />
        </div>
      </div>
    </>
  );
};

export default HeroHeader;
