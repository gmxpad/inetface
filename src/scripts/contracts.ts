import DiamondABI from "./DiamondABI.json";
import ERC20ABI from "./ERC20ABI.json";
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
  address: "0xF1dA369F44e612dAf62C14141Af2B0b01375fD48",
  abi: DiamondABI.abi,
  chainId: SkaleChaosTestnet.id,
};
export const fetchGMXTokenContract: contractInterfaces = {
  address: "0xc7a1568b9e05eb49B48D18D923e26A7936a105E9",
  abi: ERC20ABI.abi,
  chainId: SkaleChaosTestnet.id,
};
export const fetchXXTokenContract: contractInterfaces = {
  address: "0xc60Dd8B0FC103190cA3D85C26B2e78F3aE05De2D",
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
