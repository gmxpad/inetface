import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Web3Button, Web3Modal } from "@web3modal/react";
import useWindowDimensions from "@/scripts/useWindowDimensions";

export default function Header() {
  const { windowWidth } = useWindowDimensions();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Launchpad",
      link: "/",
    },
    {
      name: "Stake",
      link: "/",
    },
    {
      name: "Games",
      link: "/",
    },
    {
      name: "X Hub",
      link: "/",
    },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position="sticky"
      className="bg-dark py-4 sm:px-1 md:px-[8%] z-[999] w-screen">
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:flex md:hidden text-white"
        />
        <NavbarBrand>
          <p className="font-bold sm:hidden md:flex md:text-4xl text-white font-SpaceGro">
            GAMEXPAD
          </p>
          <p className="font-bold md:hidden sm:flex sm:text-xl text-white font-SpaceGro">
            GAMEXPAD
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden md:flex gap-4 " justify="center">
        <NavbarItem>
          <Button
            as={Link}
            radius="none"
            className="bg-transparent text-white font-normal  text-lg duration-300"
            href="#">
            Launchpads
          </Button>
        </NavbarItem>
        <NavbarItem isActive>
          <Button
            as={Link}
            href="#"
            radius="none"
            className="bg-transparent text-white font-normal  text-lg duration-300"
            aria-current="page">
            Stake
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            radius="none"
            className="bg-transparent text-white font-normal  text-lg duration-300"
            href="#">
            Games
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            radius="none"
            className="bg-transparent text-white font-normal  text-lg duration-300"
            href="#">
            X Hub
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Web3Button
            label={windowWidth > 768 ? "Connect Wallet" : "Connect"}
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="w-full flex gap-8 py-12 bg-dark">
        {menuItems.map((item, index) => (
          <NavbarMenuItem className="flex" key={`${item}-${index}`}>
            <Link className="w-full text-white py-2" href={item.link} size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
