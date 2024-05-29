import SessionProvider from "@/provider/SessionProvider";
import { ContextProvider } from "@/provider/WalletProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </ContextProvider>

  );
}
