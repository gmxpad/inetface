import ERC20ABI from "./abis/ERC20ABI.json";
import Distributor from "./abis/Distributor.json";
import vesting from "./abis/vesting.json";
import XPassDistribute from "./abis/XPassDistribute.json";
import XGameCard from "./abis/XGameCard.json";
import DiamondABI from "./abis/DiamondABI.json";

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

export const SKALE_LankyIllFunnyTestnet: networkInterface = {
  id: 37084624,
  rpc: "https://testnet.skalenodes.com/v1/lanky-ill-funny-testnet",
};

export const fetchDiamondContract: contractInterfaces = {
  address: "0x7CC5d09557105753b3B2bF035435392727fc3F02",
  abi: DiamondABI.abi,
  chainId: SKALE_LankyIllFunnyTestnet.id,
};

export const fetchUsdtTokenContract: contractInterfaces = {
  address: "0x3E26e361Fe1E9d39E4362c6233C298bCdEAFffcb",
  abi: ERC20ABI.abi,
  chainId: SKALE_LankyIllFunnyTestnet.id,
};

export const fetchXPassDistributeContract: contractInterfaces = {
  address: "0x3DA1F63E7bac343a13edb1A24c3e571989975AaB",
  abi: XPassDistribute.abi,
  chainId: SKALE_LankyIllFunnyTestnet.id,
};

export const fetchGMXTokenContract: contractInterfaces = {
  address: "0xdD3932ad40716aBa856694a42A23EB66e1A57BF9",
  abi: ERC20ABI.abi,
  chainId: SKALE_LankyIllFunnyTestnet.id,
};

export const fetchDistTokenContract: contractInterfaces = {
  address: "0x4406cE68D17f82fb5dcEAbE617E579F5Ee685206",
  abi: Distributor.abi,
  chainId: SKALE_LankyIllFunnyTestnet.id,
};

export const fetchXGameCardContract: contractInterfaces = {
  address: "0x29194B2189b6Bdb67337E70323cE22F68c1E2c7e",
  abi: XGameCard.abi,
  chainId: SKALE_LankyIllFunnyTestnet.id,
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
