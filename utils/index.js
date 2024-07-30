import { ethers } from "ethers";
import jengaID from "./jengaID.json";

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (ethereum) {
    const signer = provider.getSigner();
    const contractReader = new ethers.Contract(
      "0x0DF5bF491c54cCbd1b156c8f85A008cD902Fc0Fb",
      jengaID.abi,
      signer
    );

    return contractReader;
  }
};