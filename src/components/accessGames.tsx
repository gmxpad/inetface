import React, { useEffect, useRef } from "react";
import { Button, Image, Link } from "@nextui-org/react";
import {
  applyAnimationTop,
  applyAnimationTopDuration,
} from "@/scripts/applyAnimationTop";
import useWindowDimensions from "@/scripts/useWindowDimensions";

const AccessGames = () => {
  const { windowWidth } = useWindowDimensions();

  const useIntersectionObserverWithAnimation = (
    divRef: React.RefObject<HTMLDivElement>,
    windowWidth: number
  ) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            divRef.current?.style.setProperty("opacity", "1");
            if (windowWidth > 768) {
              divRef.current?.style.setProperty(
                "transform",
                "translateY(-100px)"
              );
            } else {
              divRef.current?.style.setProperty(
                "transform",
                "translateY(100px)"
              );
            }

            divRef.current?.style.setProperty("scale", "1");
          } else {
            divRef.current?.style.setProperty("transform", "translateY(100px)");

            divRef.current?.style.setProperty("opacity", "0.01");
            divRef.current?.style.setProperty("scale", "0.9");
          }
        },
        { threshold: 0.4 }
      );

      if (divRef.current) {
        observer.observe(divRef.current);
      }

      return () => {
        if (divRef.current) {
          observer.unobserve(divRef.current);
        }
      };
    }, [divRef, windowWidth]);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);
  const divRef4 = useRef<HTMLDivElement>(null);
  const divRef5 = useRef<HTMLDivElement>(null);
  const divRef6 = useRef<HTMLDivElement>(null);
  const divRef7 = useRef<HTMLDivElement>(null);
  const divRef8 = useRef<HTMLDivElement>(null);

  useIntersectionObserverWithAnimation(divRef, windowWidth);
  useIntersectionObserverWithAnimation(divRef2, windowWidth);
  useIntersectionObserverWithAnimation(divRef3, windowWidth);
  useIntersectionObserverWithAnimation(divRef4, windowWidth);
  useIntersectionObserverWithAnimation(divRef5, windowWidth);
  useIntersectionObserverWithAnimation(divRef6, windowWidth);
  useIntersectionObserverWithAnimation(divRef7, windowWidth);
  useIntersectionObserverWithAnimation(divRef8, windowWidth);

  return (
    <>
      <div className="h-full w-full flex items-center justify-center  relative py-24">
        <div
          ref={divRef8}
          style={{
            transform:
              windowWidth > 767 ? "translateY(-100px)" : "translateY(100px)",
            opacity: "0",
            scale: "0.9",
            transition: "scale 1s,transform 1s, opacity 1s",
          }}
          className="absolute left-24 top-[40%] z-50 text-white">
          <Image src="/games/rocketleague.png" />
        </div>
        <div
          ref={divRef7}
          style={{
            transform:
              windowWidth > 767 ? "translateY(-100px)" : "translateY(100px)",
            opacity: "0",
            scale: "0.9",
            transition: "scale 1s,transform 1s, opacity 1s",
          }}
          className="absolute -left-12 bottom-[30%] z-50 text-white">
          <Image src="/games/cs2.png" />
        </div>
        <div
          ref={divRef6}
          style={{
            transform:
              windowWidth > 767 ? "translateY(-100px)" : "translateY(100px)",
            opacity: "0",
            scale: "0.9",
            transition: "scale 1s,transform 1s, opacity 1s",
          }}
          className="absolute -right-12 top-1/2 z-50 text-white">
          <Image src="/games/fortnite.png" />
        </div>

        <div className="absolute dual-background opacity-30 z-0"></div>
        <div className="rounded-full border border-gray-800/50  h-[800px] w-[800px] flex items-center justify-center relative">
          <div className="absolute flex justify-center flex-col text-white items-center gap-7 z-50">
            <p className=" font-SpaceGro text-4xl">Access Games Instantly</p>
            <p className="w-[80%] text-center">
              Explore these thrilling Web3 games and immerse yourself in an
              engaging and profitable experience
            </p>
            <Button
              as={Link}
              className="bg-transparent z-50 text-white font-bold  text-xl duration-300 border-3 py-7 px-8 border-white"
              href="#">
              Explore Games
            </Button>
          </div>
          <div
            ref={divRef}
            style={{
              transform:
                windowWidth > 767 ? "translateY(-100px)" : "translateY(100px)",
              opacity: "0.01",
              scale: "0.9",
              transition: "scale 1s,transform 1s, opacity 1s",
            }}
            className="absolute left-6 top-[20%] z-50 text-white">
            <Image src="/games/valo.png" />
          </div>
          <div
            ref={divRef2}
            style={{
              transform:
                windowWidth > 767 ? "translateY(-100px)" : "translateY(100px)",
              opacity: "0",
              scale: "0.9",
              transition: "scale 1s,transform 1s, opacity 1s",
            }}
            className="absolute left-12 bottom-0 z-50 text-white">
            <Image src="/games/rdr2.png" />
          </div>
          <div
            ref={divRef3}
            style={{
              transform:
                windowWidth > 767 ? "translateY(-100px)" : "translateY(100px)",
              opacity: "0",
              scale: "0.9",
              transition: "scale 1s,transform 1s, opacity 1s",
            }}
            className="absolute -right-20 z-50 top-32 text-white">
            <Image src="/games/forza.png" />
          </div>
          <div
            ref={divRef4}
            style={{
              transform:
                windowWidth > 767 ? "translateY(-100px)" : "translateY(100px)",
              opacity: "0",
              scale: "0.9",
              transition: "scale 1s,transform 1s, opacity 1s",
            }}
            className="absolute -right-12 bottom-32 z-50 text-white">
            <Image src="/games/battlefront.png" />
          </div>

          <div className="rounded-full border border-gray-800/50 h-[500px]  w-[500px] flex items-center justify-center relative">
            <div
              ref={divRef5}
              style={{
                transform:
                  windowWidth > 767
                    ? "translateY(-100px)"
                    : "translateY(100px)",
                opacity: "0",
                scale: "0.9",
                transition: "scale 1s,transform 1s, opacity 1s",
              }}
              className="absolute right-16 top-28 z-50 text-white">
              <Image src="/games/fifa.png" />
            </div>

            <div className="rounded-full border border-gray-800/50  h-[200px] w-[200px] flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessGames;
