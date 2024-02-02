import { formatEther, hexToString, parseEther } from "viem";
import {
  GetContract,
  fetchDiamondContract,
  fetchGMXTokenContract,
  fetchXXTokenContract,
} from "./contracts";

export async function AllowanceCheck(userAddress, tokenAddress) {
  try {
    let allowance = parseEther("0");
    if (userAddress && userAddress.length === 42) {
      const contract = GetContract(tokenAddress);
      allowance = await contract.allowance(
        userAddress,
        fetchDiamondContract.address
      );
    }
    return allowance;
  } catch (error) {}
}

export async function GetBalance(userAddress, tokenAddress) {
  let balance = parseEther("0");
  try {
    if (userAddress && userAddress.length === 42) {
      const contract = GetContract(tokenAddress);
      balance = await contract.balanceOf(userAddress);
    }
    return balance;
  } catch (error) {}
}

export async function GetStakePool() {
  try {
    const contract = GetContract(fetchDiamondContract.address);
    return await contract.getPoolInfo();
  } catch (error) {}
}

export async function CalculateScore(amount, time) {
  try {
    const contract = GetContract(fetchDiamondContract.address);
    const score = await contract.calculateScore(
      parseEther(amount),
      parseFloat(Number(time) * 86401)
    );
    return score;
  } catch (error) {
    console.log(error);
  }
}

export async function GetStaker(userAddress) {
  try {
    let staker = false;
    let totalStakedAmount = 0;
    let totalScore = 0;
    let earnedToDateGMX = 0;
    let earnedToDateSGMX = 0;

    if (userAddress && userAddress.length === 42) {
      const contract = GetContract(fetchDiamondContract.address);
      const result = await contract.getUserInfo(userAddress);
      staker = result[0];
      // totalStakedAmount = formatEther(result[2].toString());
      totalStakedAmount = parseEther("2001");
      totalScore = parseFloat(result[3]) / 1e6;
      earnedToDateGMX = formatEther(result[5].toString());
      earnedToDateSGMX = formatEther(result[6].toString());
      return {
        staker,
        totalStakedAmount,
        totalScore,
        earnedToDateGMX,
        earnedToDateSGMX,
      };
    }
  } catch (error) {
    return {
      staker,
      totalStakedAmount,
      totalScore,
      earnedToDateGMX,
      earnedToDateSGMX,
    };
  }
}
