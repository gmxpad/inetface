import React, { useEffect, useRef } from "react";
import { Button, Image, Link } from "@nextui-org/react";

const PopulerGames = () => {
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
      <div className="flex flex-col gap-12 relative">
        <div
          ref={divRef}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="xl:text-4xl flex justify-between whitespace-nowrap sm:text-2xl items-center md:text-2xl text-white font-semibold sm:pb-5 md:pb-5 xl:pb-0">
          <p>POPULAR GAMES</p>
        </div>
        <div className="flex xl:flex-row md:flex-col sm:flex-col sm:gap-10 md:gap-10 xl:gap-0 w-full h-full xl:justify-between">
          <div
            ref={divRef1}
            style={{
              opacity: "0.01",
              scale: "0.9",
              transition: "scale 1s, opacity 1s",
            }}
            className="rounded-xl bg-dark-gray xl:w-[65%] sm:w-full md:w-full relative">
            <div className="xl:absolute sm:flex md:flex xl:-bottom-0 xl:-right-16 2xl:right-0 sm:-translate-y-12 sm:translate-x-16 md:-translate-y-12 md:translate-x-[50%] xl:-translate-y-0 xl:translate-x-0">
              <Image
                isBlurred
                className="sm:w-[300px] md:w-[300px] xl:w-[550px]"
                src="/gamesGallery/lussa/chracter.png"
              />
            </div>
            <div className="xl:w-2/3 flex flex-col gap-8 justify-center p-5 xl:h-[440px] overflow-hidden text-white">
              <div className="flex flex-col gap-3">
                <p>10K+ players</p>
                <Image
                  width={350}
                  isBlurred
                  radius="none"
                  src="/gamesGallery/lussa/lussa-logo-green.png"
                />
                <p className="xl:w-[50%] sm:w-[75%] md:w-[75%]">
                  The Final Frontier
                </p>
              </div>

              <Button
                as={Link}
                className="bg-transparent text-white font-bold  max-w-32 text-xl duration-300 border-3 py-7 px-8 border-white"
                href="/games/lussa">
                Explore
              </Button>
            </div>
          </div>
          <div className="flex flex-col xl:w-[31%] sm:h-full md:w-full sm:gap-10 md:h-full md:gap-10 xl:justify-between">
            <div
              ref={divRef2}
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}
              className="relative flex flex-col justify-between overflow-hidden rounded-xl sm:h-[160px] md:h-[160px] 2xl:h-[200px]  bg-transparent">
              <div className="h-full items-end flex relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full">
                  <video
                    className="h-full w-full"
                    src="/gamesGallery/katanainu/cinematic.mp4"
                    autoPlay
                    muted
                    loop></video>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="absolute top-5 sm:top-12 left-5">
                    <Image
                      width={70}
                      isBlurred
                      radius="none"
                      className=""
                      src="/gamesGallery/katanainu/logo.png"
                    />
                  </div>
                  <Button
                    as={Link}
                    className="bg-transparent z-10 absolute bottom-5 right-5 text-white font-bold duration-300 border-2 py-5 px-8 border-white"
                    href="/games/katana-inu">
                    Explore
                  </Button>
                </div>
              </div>
            </div>
            <div
              ref={divRef3}
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}
              className="relative flex flex-col justify-between  p-5 rounded-xl sm:h-[200px] md:h-[200px] xl:h-[235px] 2xl:h-[200px] bg-dark-gray">
              <div className="flex flex-col justify-between h-full relative">
                <Image
                  width={170}
                  isBlurred
                  radius="none"
                  src="/gamesGallery/magicCraft/lolg.png"
                />
                <Button
                  as={Link}
                  className="bg-transparent z-10 absolute bottom-0 right-0 text-white font-bold duration-300 border-2 py-5 px-8 border-white"
                  href="/games/magic-craft">
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PopulerGames;
