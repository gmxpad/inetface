import { formatEther, hexToString, parseEther, BigNumber } from "viem";
import {
  GetContract,
  fetchDiamondContract,
  fetchGMXTokenContract,
  fetchXXTokenContract,
  SkaleChaosTestnet,
} from "./contracts";
import { Contract, JsonRpcProvider, BrowserProvider } from "ethers";
const { ethers } = require("ethers");

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    let calTime = 0;
    if (Number(time) == 31) {
      calTime = 300;
    } else {
      calTime = parseFloat(Number(time) * 86400);
    }
    const score = await contract.calculateScore(parseEther(amount), calTime);
    return score;
  } catch (error) {}
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
      totalStakedAmount = Number(formatEther(result[2].toString()))
        .toFixed(1)
        .toString();
      totalScore = Number(parseFloat(result[3]) / 1e6).toFixed(0);
      earnedToDateGMX = Number(formatEther(result[5].toString())).toFixed(3);
      earnedToDateSGMX = Number(formatEther(result[6].toString())).toFixed(3);

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

export async function calculateRewards(address) {
  let rewardGMXP = 0;
  let rewardSGMXP = 0;

  if (address && address.length === 42) {
    const contract = GetContract(fetchDiamondContract.address);
    const results = await contract.calculateRewards(address);

    if (Number(results[0]) > 0) {
      rewardGMXP = Number(formatEther(results[0].toString())).toFixed(3);
    }
    if (Number(results[1]) > 0) {
      rewardSGMXP = Number(formatEther(results[1].toString())).toFixed(3);
    }
  }
  return {
    rewardGMXP,
    rewardSGMXP,
  };
}

function calculateLockTimes(unlockTimes, requestTime, requaribles) {
  if (requaribles === false && unlockTimes === 0) {
    return "Requestable";
  } else if (requaribles === true && requestTime === 0) {
    return "Withdrawable";
  }

  let result = "";

  const formatTimeUnit = (value, unit) => {
    if (value > 0) {
      result += `${value}${unit} `;
    }
  };

  const formatTime = (seconds, units) => {
    units.forEach(([unit, divisor]) => {
      formatTimeUnit(Math.floor(seconds / divisor), unit);
      seconds %= divisor;
    });

    if (seconds < 60 && seconds > 0) {
      result += `${seconds}s`;
    }
  };

  formatTime(unlockTimes, [
    ["M", 3600 * 24 * 30],
    ["D", 3600 * 24],
    ["H", 3600],
    ["m", 60],
  ]);
  formatTime(requestTime, [
    ["D", 3600 * 24],
    ["H", 3600],
    ["m", 60],
  ]);

  return result.trim();
}

export async function getStakeList(address) {
  try {
    if (address && address.length === 42) {
      const contract = GetContract(fetchDiamondContract.address);
      const tierSections = await contract.getUserStakeList(address);

      const stakeInfos = tierSections.map(async (index) => {
        const [stakerInfo, stakeEndTime, requestEndTime] = await Promise.all([
          contract.getUserStakePeriod(index, address),
          contract.getStakeEndTime(index, address),
          contract.getRequestEndTime(index, address),
        ]);
        let amount = Number(formatEther(stakerInfo[4].toString())).toFixed(0);
        let multipler = Number(stakerInfo[7]) / 10e1;
        let score = parseFloat(Number(stakerInfo[5]) / 10e5).toFixed(0);

        let isRequest = stakerInfo[0];
        let indexID = Number(stakerInfo[1]);

        const remainingTime = calculateLockTimes(
          Number(stakeEndTime),
          Number(requestEndTime),
          isRequest
        );
        return {
          isRequest,
          amount,
          multipler,
          score,
          indexID,
          remainingTime,
          stakeEndTime,
          requestEndTime,
        };
      });

      const listStakeInfo = await Promise.all(stakeInfos);
      return listStakeInfo.reverse();
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export async function getSigner(walletProvider) {
  const provider = new BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  return signer;
}

export function formatTimestampGMT(timestamp) {
  const date = new Date(timestamp * 1000);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${month} ${day}, ${hour}:${minute}`;
}

export function getImageChainImage(chainId) {
  let imageUrl;
  switch (chainId) {
    case 1:
      imageUrl = "/chains/eth.svg";
      break;
    case 37084624:
      imageUrl = "/chains/skale.svg";
      break;
    case 42161:
      imageUrl = "/chains/arb-logo.svg";
      break;
    case 137:
      imageUrl = "/chains/polygon.svg";
      break;
    case 56:
      imageUrl = "/chains/bnb.svg";
      break;
    default:
      imageUrl = "";
      break;
  }
  return imageUrl;
}

export function format6DecimalsAsEther(value) {
  const bigValue = ethers.parseUnits(value.toString(), 6);
  const multipliedValue = bigValue / ethers.toBigInt(1e6);
  const formattedValue = ethers.formatUnits(multipliedValue, 6);
  return formattedValue;
}
