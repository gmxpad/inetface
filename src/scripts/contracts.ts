import DiamondABI from "./DiamondABI.json";
import ERC20ABI from "./ERC20ABI.json";
import Distributor from "./Distributor.json";
import vesting from "./vesting.json";
import XPassDistribute from "./XPassDistribute.json";

import { Contract, JsonRpcProvider, BrowserProvider } from "ethers";

interface contractInterfaces {
  address: `0x${string}`;
  abi: object[];
  chainId: number;
}
interface networkInterface {
  id: number;
  rpc: string;
}

export const SkaleChaosTestnet: networkInterface = {
  id: 37084624,
  rpc: "https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet",
};

// FETCH CONTRACTS
export const fetchDiamondContract: contractInterfaces = {
  address: "0xDd32E902AE551CBA07016AAb66debCd077Ccfb77",
  abi: DiamondABI.abi,
  chainId: SkaleChaosTestnet.id,
};
export const fetchXPassDistributeContract: contractInterfaces = {
  address: "0x3DA1F63E7bac343a13edb1A24c3e571989975AaB",
  abi: XPassDistribute.abi,
  chainId: SkaleChaosTestnet.id,
};
export const fetchGMXTokenContract: contractInterfaces = {
  address: "0xdD3932ad40716aBa856694a42A23EB66e1A57BF9",
  abi: ERC20ABI.abi,
  chainId: SkaleChaosTestnet.id,
};

export const fetchDistTokenContract: contractInterfaces = {
  address: "0x4406cE68D17f82fb5dcEAbE617E579F5Ee685206",
  abi: Distributor.abi,
  chainId: SkaleChaosTestnet.id,
};

export function GetContractAt(
  address: `0x${string}` | undefined | string,
  abi: object[] | undefined | any[],
  network: networkInterface
) {
  const Provider = new JsonRpcProvider(network.rpc);
  if (!address || address.length !== 42 || !abi || !network.id) {
    return;
  }
  return new Contract(address, abi, Provider);
}

export function GetContract(address: `0x${string}` | undefined | string) {
  const Provider = new JsonRpcProvider(SkaleChaosTestnet.rpc);

  if (address === fetchDiamondContract.address) {
    return new Contract(
      fetchDiamondContract.address,
      fetchDiamondContract.abi,
      Provider
    );
  } else if (address === fetchGMXTokenContract.address) {
    return new Contract(
      fetchGMXTokenContract.address,
      fetchGMXTokenContract.abi,
      Provider
    );
  } else if (address === fetchDistTokenContract.address) {
    return new Contract(
      fetchDistTokenContract.address,
      fetchDistTokenContract.abi,
      Provider
    );
  } else {
    return new Contract(
      // @ts-ignore
      address,
      vesting.abi,
      Provider
    );
  }
}
