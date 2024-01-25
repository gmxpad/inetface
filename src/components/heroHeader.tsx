import React, { useEffect, useRef } from "react";
import { Link, Button, Image } from "@nextui-org/react";
import classNames from "classnames";
import {
  applyAnimationTop,
  applyAnimationTopDuration,
} from "@/scripts/applyAnimationTop";

const HeroHeader = () => {
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

  useIntersectionObserver(divRef);
  useIntersectionObserver(divRef1);
  useIntersectionObserver(divRef2);
  useIntersectionObserver(divRef3);

  return (
    <>
      <div className=" flex w-full h-full py-8  sm:flex-col-reverse justify-between relative items-center">
        <div className="absolute sm:hidden dual-gradient-background opacity-50 z-0"></div>
        <div
          ref={divRef}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="flex flex-col h-full sm:w-full md:w-[49%] gap-10 text-white">
          <div className="sm:text-6xl sm:text-center md:text-9xl font-SpaceGro font-bold flex flex-col gap-3">
            <p>Play,</p>
            <p>Invest</p>
            <p>& Earn</p>
            <p className="md:text-lg sm:text-base md:w-[85%]">
              Elevate Your Gaming Experience with Our Route to Triumph and
              Beyond!
            </p>
          </div>
          <div
            ref={divRef1}
            style={{
              opacity: "0.01",
              scale: "0.9",
              transition: "scale 1s, opacity 1s",
            }}
            className="flex sm:flex-col sm:justify-center sm:items-center sm:gap-6 md:justify-between sm:w-full md:w-2/3">
            <div className="flex flex-col sm:text-center ">
              <div className="text-lg  relative md:max-w-48 whitespace-nowrap">
                Project Launched
                <span className="absolute -top-11 text-6xl text-purple-600 -right-3">
                  .
                </span>
              </div>
              <p className="text-5xl font-mono">0,00</p>
            </div>
            <div className="flex flex-col sm:text-center ">
              <div className="text-lg relative md:max-w-12 sm:text-center ">
                Users
                <span className="absolute -top-11 text-6xl text-green-550 -right-3">
                  .
                </span>
              </div>
              <p className="text-5xl font-mono">0,00</p>
            </div>
          </div>
          <div
            ref={divRef2}
            style={{
              opacity: "0.01",
              scale: "0.9",
              transition: "scale 1s, opacity 1s",
            }}
            className="flex md:gap-12 sm:justify-between w-full">
            <Button
              as={Link}
              isExternal={true}
              className="bg-transparent text-white font-bold  text-xl duration-300 border-3 py-7 md:px-8 sm:w-[45%] border-white"
              href="https://docs.gamexpad.io/">
              Learn More
            </Button>
            <Button
              as={Link}
              className="bg-[#a664fe] text-white font-bold  text-xl duration-300 border-3 py-7 md:px-8 sm:w-[45%] border-[#a664fe]"
              href="#">
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
          className="md:absolute sm:flex md:bottom-0 md:right-0">
          <Image
            width={1450}
            height={550}
            isBlurred
            className="md:h-[650px] sm:w-[300px]"
            src="/games/character1.png"
            alt="game"
          />
        </div>
      </div>
    </>
  );
};

export default HeroHeader;
