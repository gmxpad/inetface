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
      <div className=" flex flex-col gap-12 relative">
        <div
          ref={divRef}
          style={{
            opacity: "0.01",
            scale: "0.9",
            transition: "scale 1s, opacity 1s",
          }}
          className="text-4xl text-white font-semibold">
          <p>POPULAR GAMES</p>
        </div>
        <div className="flex w-full justify-between">
          <div
            ref={divRef1}
            style={{
              opacity: "0.01",
              scale: "0.9",
              transition: "scale 1s, opacity 1s",
            }}
            className="rounded-xl bg-dark-gray w-[65%] relative">
            <div className="absolute -top-12 right-0">
              <Image isBlurred src="/games/populerGame-1.png" />
            </div>
            <div className="w-2/3 flex flex-col gap-8 justify-center p-5 h-[440px] overflow-hidden text-white">
              <div className="flex flex-col gap-3">
                <p>18 million players</p>
                <Image isBlurred radius="none" src="/icons/valorant.png" />
                <p className="w-[50%]">
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
          <div className="flex flex-col w-[31%] justify-between">
            <div
              ref={divRef2}
              style={{
                opacity: "0.01",
                scale: "0.9",
                transition: "scale 1s, opacity 1s",
              }}
              className="relative flex flex-col justify-between p-5 rounded-xl h-[45%]  bg-[#a664fe]/50">
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
              className="relative flex flex-col justify-between p-5 rounded-xl h-[45%] bg-dark-gray">
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
