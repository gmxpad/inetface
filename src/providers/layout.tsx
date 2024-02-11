import React, { ReactNode } from "react";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { Web3ModalProvider } from "@/providers/web3Provider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="bg-dark">
        <Header />
        <Web3ModalProvider>{children}</Web3ModalProvider>
        <Footer />
      </div>
    </>
  );
}
