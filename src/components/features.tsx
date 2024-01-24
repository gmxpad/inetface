import React from "react";
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
  return (
    <>
      <div className="flex flex-col gap-20 text-white relative items-center justify-center">
        <div
          style={{ width: "50%" }}
          className="dual-background absolute opacity-30 z-0"></div>
        <div className="flex flex-col gap-8 w-full items-center z-10 justify-center">
          <p className="text-5xl font-SpaceGro">Features</p>
          <p className="w-1/3 text-center">
            We are constantly working to bring new updates and features to
            GameXPad, such as:
          </p>
        </div>

        <div className="grid grid-cols-4 gap-12 text-white z-10">
          {SLIDES.map((item: any, index: number) => (
            <div key={"how_to_join_key_" + index.toString()} className="">
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
        <div className="flex flex-col w-full gap-8 justify-center items-center z-10">
          <p className="text-4xl font-SpaceGro">And so much more...</p>
          <p className="w-[42%] text-center">
            Earn achievements, read reviews, explore custom recommendations, and
            more.
          </p>
          <Button
            as={Link}
            className="bg-transparent text-white font-bold  text-xl duration-300 border-3 py-7 px-8 border-white"
            href="#">
            Learn More
          </Button>
        </div>
      </div>
    </>
  );
};

export default Features;
