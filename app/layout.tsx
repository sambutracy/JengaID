"use client";
import { defineChain } from "viem";
import { Outfit } from "next/font/google";
import "./globals.css";

import { PrivyProvider } from "@privy-io/react-auth";
const font = Outfit({ subsets: ["latin"] });

const ThetaTorrent = defineChain({
  id: 361,
  name: "Theta Mainnet",
  network: "Theta Mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Theta Mainnet",
    symbol: "TFUEL",
  },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-api.thetatoken.org/rpc"],
    },
  } as any,
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.thetatoken.org" },
  },
}) as any;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <PrivyProvider
          appId="clyy7dmmd02qb10eay4fkrzz7"
          config={{
            appearance: {
              theme: "light",
              accentColor: "#676FFF",
              logo: "https://logo.com/view/logo_2f319d72-e214-44da-9176-97743b3e3b",
            },
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
            defaultChain: ThetaTorrent,
            supportedChains: [ThetaTorrent],
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}