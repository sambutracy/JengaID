import { ethers } from "ethers";
import jengaID from "./jengaID.json";

export const contract = async (providerOverride) => {
  let provider = providerOverride;

  if (provider?.request && !provider?.getSigner) {
    provider = new ethers.providers.Web3Provider(provider);
  }

  if (!provider && typeof window !== "undefined") {
    const { ethereum } = window;
    if (ethereum) {
      provider = new ethers.providers.Web3Provider(ethereum);
    }
  }

  if (!provider) {
    throw new Error("Wallet provider not available.");
  }

  const signer = provider.getSigner ? provider.getSigner() : provider;
  const contractReader = new ethers.Contract(
    "0x0DF5bF491c54cCbd1b156c8f85A008cD902Fc0Fb",
    jengaID.abi,
    signer
  );

  return contractReader;
};
