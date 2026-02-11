"use client";
import React, { useState, useEffect } from "react";
import { useWallets } from "@privy-io/react-auth";
import { usePrivy } from "@privy-io/react-auth";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Accordion } from "@/components/ui/accordion";

import { getUserByAddress } from "@/utils/queries";

interface DropDownMenuProps {
  onClose: () => void;
}

const DropdownMenu: React.FC<DropDownMenuProps> = ({ onClose }) => {
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const [hasIdentity, setHasIdentity] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      if (!ready || !authenticated || !wallets[0]) {
        setHasIdentity(false);
        return;
      }

      try {
        const provider = await wallets[0].getEthersProvider();
        await getUserByAddress(wallets[0].address, provider);
        setHasIdentity(true);
      } catch {
        setHasIdentity(false);
      }
    };

    getUserInfo();
  }, [ready, authenticated, wallets]);
  return (
    <div className="w-screen h-screen bg-white  px-2 items-center justify-center absolute  right-0 xl:hidden">
      <Accordion
        defaultValue="item-1"
        className="
            pl-2
            "
        type="single"
        collapsible
      >
        <Link
          href={"/"}
          onClick={onClose}
          className="
            flex
            flex-1
            items-center 
            justify-between
           
            mt-11
           pt-2
            py-4
            
            border-b
            "
        >
          Home
        </Link>

        <Link
          href={"/jobs"}
          onClick={onClose}
          className="
            flex
            flex-1
            items-center 
            justify-between
            border-b
            py-4
          
      
            "
        >
          Jobs
        </Link>

        <Link
          href={"/verify-identity"}
          onClick={onClose}
          className="
            flex
            flex-1
            items-center 
            justify-between
     
          
            py-4
            
            border-b
            "
        >
          Verify Identity
        </Link>
      </Accordion>

      <div className="pt-12">
        <div className="  space-y-4 flex flex-col px-4">
          {authenticated && hasIdentity ? (
            <Link href={"/dashboard"} onClick={onClose}>
              <Button
                className="
              w-full
                  
                        "
              >
                Dashboard
              </Button>
            </Link>
          ) : authenticated && !hasIdentity ? (
            <Link href={"/onboard"} onClick={onClose}>
              <Button variant={"outline"} className="w-full">
                Create DID
              </Button>
            </Link>
          ) : (
            ""
          )}
          {authenticated ? (
            <Button variant={"outline"} onClick={logout} className="w-full">
              Disconnect
            </Button>
          ) : (
            <Button variant={"outline"} onClick={login} className="w-full">
              Connect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;