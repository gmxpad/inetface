import DiamondABI from "./DiamondABI.json";
import ERC20ABI from "./ERC20ABI.json";
import Distributor from "./Distributor.json";

import { Contract, JsonRpcProvider, BrowserProvider } from "ethers";

interface contractInterfaces {
  address: `0x${string}`;
  abi: object[];
  chainId: number;
}

export const SkaleChaosTestnet = {
  id: 37084624,
  rpc: "https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet",
};

// FETCH CONTRACTS
export const fetchDiamondContract: contractInterfaces = {
  address: "0x478277D03081553b7B0bD0348EEBED69F17F6AF2",
  abi: DiamondABI.abi,
  chainId: SkaleChaosTestnet.id,
};
export const fetchGMXTokenContract: contractInterfaces = {
  address: "0xdD3932ad40716aBa856694a42A23EB66e1A57BF9",
  abi: ERC20ABI.abi,
  chainId: SkaleChaosTestnet.id,
};
export const fetchXXTokenContract: contractInterfaces = {
  address: "0x2E439f0fc167e00c8c4DB7B774E3D1297895db22",
  abi: ERC20ABI.abi,
  chainId: SkaleChaosTestnet.id,
};

export const fetchDistTokenContract: contractInterfaces = {
  address: "0x4406cE68D17f82fb5dcEAbE617E579F5Ee685206",
  abi: Distributor.abi,
  chainId: SkaleChaosTestnet.id,
};

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
  } else if (address === fetchXXTokenContract.address) {
    return new Contract(
      fetchXXTokenContract.address,
      fetchXXTokenContract.abi,
      Provider
    );
  } else if (address === fetchDistTokenContract.address) {
    return new Contract(
      fetchDistTokenContract.address,
      fetchDistTokenContract.abi,
      Provider
    );
  }
}
