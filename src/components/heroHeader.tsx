import React, { useEffect, useRef } from "react";
import { Link, Button, Image } from "@nextui-org/react";
import classNames from "classnames";
import {
  applyAnimationTop,
  applyAnimationTopDuration,
} from "@/scripts/applyAnimationTop";

const HeroHeader = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyAnimationTop(ref1);
    applyAnimationTop(ref4);

    applyAnimationTopDuration(ref2);
    applyAnimationTopDuration(ref3);
  }, []);

  return (
    <>
      <div className="flex w-full h-full justify-between relative items-center">
        <div className="absolute dual-gradient-background opacity-50 z-0"></div>
        <div
          ref={ref1}
          className={classNames(
            "flex flex-col h-full w-[49%] gap-10 text-white",
            ref1.current
              ? "sm:translate-y-[50px] sm:opacity-10"
              : "translate-y-[50px] opacity-10"
          )}>
          <div className="text-9xl font-SpaceGro font-bold flex flex-col gap-3">
            <p>Play,</p>
            <p>Invest</p>
            <p>& Earn</p>
            <p className="text-lg w-[85%]">
              Elevate Your Gaming Experience with Our Route to Triumph and
              Beyond!
            </p>
          </div>
          <div
            ref={ref2}
            className={classNames(
              "flex justify-between w-2/3",
              ref2.current
                ? "sm:translate-y-[50px] sm:opacity-10"
                : "translate-y-[50px] opacity-10"
            )}>
            <div className="flex flex-col">
              <div className="text-lg relative max-w-48 whitespace-nowrap">
                Project Launched
                <span className="absolute -top-11 text-6xl text-purple-600 -right-3">
                  .
                </span>
              </div>
              <p className="text-5xl font-mono">0,00</p>
            </div>
            <div className="flex flex-col ">
              <div className="text-lg relative max-w-12 ">
                Users
                <span className="absolute -top-11 text-6xl text-green-550 -right-3">
                  .
                </span>
              </div>
              <p className="text-5xl font-mono">0,00</p>
            </div>
          </div>
          <div
            ref={ref3}
            className={classNames(
              "flex gap-12",
              ref3.current ? " sm:opacity-10" : "opacity-10"
            )}>
            <Button
              as={Link}
              isExternal={true}
              className="bg-transparent text-white font-bold  text-xl duration-300 border-3 py-7 px-8 border-white"
              href="https://docs.gamexpad.io/">
              Learn More
            </Button>
            <Button
              as={Link}
              className="bg-[#a664fe] text-white font-bold  text-xl duration-300 border-3 py-7 px-8 border-[#a664fe]"
              href="#">
              Submit Project
            </Button>
          </div>
        </div>
        <div
          ref={ref4}
          className={classNames(
            "absolute bottom-0 right-0",
            ref4.current
              ? "sm:translate-y-[50px] sm:opacity-10"
              : "translate-y-[50px] opacity-10"
          )}>
          <Image
            width={1450}
            height={550}
            isBlurred
            className="md:h-[650px] w-full"
            src="/games/character1.png"
            alt="game"
          />
        </div>
      </div>
    </>
  );
};

export default HeroHeader;
