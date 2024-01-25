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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      position="sticky"
      className="bg-dark py-4 px-[8%] z-[999]">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:flex md:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-4xl text-white font-SpaceGro">
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
          <Web3Button />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
