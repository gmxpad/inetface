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
          <Button
            as={Link}
            className="bg-transparent text-white font-normal  text-xl duration-300 border-2 md:py-7 md:px-8 sm:w-[35%] border-white"
            href="/">
            View All
          </Button>
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
            <div className="xl:absolute sm:flex md:flex xl:-top-12 xl:right-0 sm:-translate-y-12 sm:translate-x-16 md:-translate-y-12 md:translate-x-[50%] xl:-translate-y-0 xl:translate-x-0">
              <Image
                isBlurred
                className="sm:w-[300px] md:w-[300px] xl:w-full"
                src="/games/populerGame-1.png"
              />
            </div>
            <div className="xl:w-2/3 flex flex-col gap-8 justify-center p-5 xl:h-[440px] overflow-hidden text-white">
              <div className="flex flex-col gap-3">
                <p>18 million players</p>
                <Image isBlurred radius="none" src="/icons/valorant.png" />
                <p className="xl:w-[50%] sm:w-[75%] md:w-[75%]">
                  Tactical shooter with 5v5 matches and unique characters.
                </p>
              </div>

              <Button
                as={Link}
                className="bg-transparent text-white font-bold  max-w-32 text-xl duration-300 border-3 py-7 px-8 border-white"
                href="#">
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
              className="relative flex flex-col justify-between p-5 rounded-xl sm:h-[200px] md:h-[200px] xl:h-[200px]  bg-[#a664fe]/50">
              <div className="absolute -top-3">
                <Image isBlurred src="/games/forza-car.png" />
              </div>
              <div className="h-full items-end flex">
                <div className="flex items-center justify-between w-full">
                  <Image
                    isBlurred
                    radius="none"
                    src="/icons/forza-horizon.png"
                  />
                  <Button
                    as={Link}
                    className="bg-transparent text-white font-bold duration-300 border-2 py-5 px-8 border-white"
                    href="#">
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
              className="relative flex flex-col justify-between p-5 rounded-xl sm:h-[200px] md:h-[200px] xl:h-[200px] bg-dark-gray">
              <div className="absolute -top-5 -right-1">
                <Image isBlurred src="/games/soldier.png" />
              </div>
              <div className="flex flex-col justify-between h-full">
                <Image isBlurred radius="none" src="/icons/cod-name.png" />
                <Button
                  as={Link}
                  className="bg-transparent text-white font-bold duration-300 max-w-28 border-2 py-5 px-8 border-white"
                  href="#">
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
