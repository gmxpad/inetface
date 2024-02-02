import { getContract } from "@wagmi/core";
import DiamondABI from "./DiamondABI.json";
import ERC20ABI from "./ERC20ABI.json";
import { Contract, JsonRpcProvider } from "ethers";
interface contractInterfaces {
  address: `0x${string}`;
  abi: object[];
  chainId: number;
}

const SkaleChaosTestnet = {
  id: 1351057110,
  rpc: "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
};

// FETCH CONTRACTS
export const fetchDiamondContract: contractInterfaces = {
  address: "0x132b09ed4e69d1dC563cC6cb916bc9Cc1Ab403d6",
  abi: DiamondABI.abi,
  chainId: SkaleChaosTestnet.id,
};
export const fetchGMXTokenContract: contractInterfaces = {
  address: "0x89861cedD8c7AB630ef9C150d609e2264a87Fe1a",
  abi: ERC20ABI.abi,
  chainId: SkaleChaosTestnet.id,
};
export const fetchXXTokenContract: contractInterfaces = {
  address: "0x3C689afF79B3e53dE387b1663b19D0C4084444A6",
  abi: ERC20ABI.abi,
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
  }
}
