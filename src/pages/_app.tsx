import "@/assets/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import Layout from "@/providers/layout";
import { Provider as ReduxProvider } from "react-redux";
import { NextPageWithLayout } from "@/types";
import { wrapper } from "@/store/store";
import { Web3ModalProvider } from "@/providers/web3Provider";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <>
      <Web3ModalProvider>
        <ReduxProvider store={store}>
          <NextUIProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NextUIProvider>
        </ReduxProvider>
      </Web3ModalProvider>
    </>
  );
}
