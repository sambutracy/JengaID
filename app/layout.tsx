"use client";
import { defineChain } from "viem";
import { Outfit } from "next/font/google";
import "./globals.css";

import { PrivyProvider } from "@privy-io/react-auth";
const font = Outfit({ subsets: ["latin"] });

const ThetaTorrent = defineChain({
  id: 365,
  name: "Theta Testnet",
  network: "Theta Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Theta Testnet",
    symbol: "TFUEL",
  },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"],
    },
  } as any,
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet-explorer.thetatoken.org" },
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
              logo: "https://ibb.co/hmZGqGL",
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