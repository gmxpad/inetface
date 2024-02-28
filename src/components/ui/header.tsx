import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  Image,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import useWindowDimensions from "@/scripts/useWindowDimensions";
import { useRouter } from "next/router";
import { ChevronDown } from "../icons/Icons";
import classNames from "classnames";
import ConnectButton from "@/providers/connectButton";

export default function Header() {
  const { windowWidth } = useWindowDimensions();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const icons = {
    chevron: (
      <ChevronDown
        fill="currentColor"
        size={16}
        height={undefined}
        width={undefined}
      />
    ),
  };

  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "X Pad",
      link: "/x-pad",
    },
    {
      name: "Stake",
      link: "/stake",
    },
    {
      name: "Games",
      link: "/games",
    },
  ];
  const [lab, setLab] = useState<string>("Connect Wallet");
  useEffect(() => {
    windowWidth > 767 ? setLab("Connect Wallet") : setLab("Connect");
  }, [windowWidth]);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position="sticky"
      className="bg-dark py-4 sm:px-1 md:px-1 lg:px-[8%] z-[9999] w-screen">
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:flex md:flex lg:hidden text-white"
        />
        <NavbarBrand>
          <Link
            size="lg"
            href="/"
            className="bg-transparent sm:h-[50px] sm:w-[50px] md:h-[70px] md:w-[290px] px-0">
            <Image
              radius="none"
              width={50}
              className="sm:flex md:hidden"
              src="/logos/gmx-logo.svg"
            />
            <Image
              radius="none"
              width={250}
              className="sm:hidden md:flex"
              src="/logos/game-x-pad.svg"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="sm:hidden md:hidden lg:flex gap-4 "
        justify="center">
        <NavbarItem>
          <Button
            onPress={() => router.push("/x-pad")}
            radius="full"
            className="bg-transparent text-white font-normal  text-lg duration-300"
            aria-current="page">
            GameXPad
          </Button>
        </NavbarItem>

        <NavbarItem isActive>
          <Button
            onPress={() => router.push("/stake")}
            radius="full"
            className="bg-transparent text-white font-normal  text-lg duration-300"
            aria-current="page">
            Stake
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onPress={() => router.push("/games")}
            radius="full"
            className="bg-transparent text-white font-normal  text-lg duration-300">
            Games
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            onPress={() => router.push("/x-pass")}
            radius="full"
            className="bg-transparent text-white font-normal  text-lg duration-300 animate-pulse">
            XPass Card
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ConnectButton />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="w-full flex gap-8 py-12 z-[999] bg-dark">
        {menuItems.map((item, index) => (
          <NavbarMenuItem className="flex" key={`${item}-${index}`}>
            <Button
              as={Link}
              href={item.link}
              className="w-full text-white flex px-3 justify-start bg-transparent"
              size="lg">
              {item.name}
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
