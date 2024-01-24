import React, { useEffect, useRef } from "react";
import { Button, Image, Link } from "@nextui-org/react";

const AccessGames = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);
  const divRef3 = useRef<HTMLDivElement>(null);
  const divRef4 = useRef<HTMLDivElement>(null);
  const divRef5 = useRef<HTMLDivElement>(null);
  const divRef6 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          divRef4.current?.style.setProperty("opacity", "1");
          divRef4.current?.style.setProperty("scale", "1");
        } else {
          divRef4.current?.style.setProperty("opacity", "0.01");
          divRef4.current?.style.setProperty("scale", "0.9");
        }
      },
      { threshold: 0.4 }
    );
    if (divRef4.current) {
      observer.observe(divRef4.current);
    }
    return () => {
      if (divRef4.current) {
        observer.unobserve(divRef4.current);
      }
    };
  }, []);

  return (
    <>
      <div className="h-full w-full flex items-center justify-center  relative py-24">
        <div className="absolute left-0 top-1/3 text-white">
          <Image src="/games/rocketleague.png" />
        </div>
        <div className="absolute left-6 bottom-1/3 text-white">
          <Image src="/games/cs2.png" />
        </div>
        <div className="absolute right-0 top-1/2 text-white">
          <Image src="/games/fortnite.png" />
        </div>

        <div className="absolute dual-background opacity-30 z-0"></div>
        <div className="rounded-full border border-gray-800/50 z-10 h-[800px] w-[800px] flex items-center justify-center relative">
          <div className="absolute flex justify-center flex-col text-white items-center gap-7 z-50">
            <p className=" font-SpaceGro text-4xl">Access Games Instantly</p>
            <p className="w-[80%] text-center">
              With nearly 30,000 games from AAA to indie and everything
              in-between. Enjoy exclusive deals, automatic game updates, and
              other great perks.
            </p>
            <Button
              as={Link}
              className="bg-transparent z-[99] text-white font-bold  text-xl duration-300 border-3 py-7 px-8 border-white"
              href="#">
              Explore Games
            </Button>
          </div>
          <div
            ref={divRef4}
            style={{
              opacity: "0.01",
              scale: "0.9",
              transition: "scale 1s, opacity 1s",
            }}
            className="absolute -left-6 top-32 text-white">
            <Image src="/games/valo.png" />
          </div>
          <div className="absolute -left-0 bottom-32 text-white">
            <Image src="/games/rdr2.png" />
          </div>
          <div className="absolute -right-44 top-32 text-white">
            <Image src="/games/forza.png" />
          </div>
          <div className="absolute -right-12 bottom-32 text-white">
            <Image src="/games/battlefront.png" />
          </div>

          <div className="rounded-full border border-gray-800/50 h-[500px] w-[500px] flex items-center justify-center relative">
            <div className="absolute -right-6 top-16 text-white">
              <Image src="/games/fifa.png" />
            </div>

            <div className="rounded-full border z-10 border-gray-800/50 h-[200px] w-[200px] flex items-center justify-center"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessGames;
