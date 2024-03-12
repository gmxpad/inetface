"use client";
import { GetStaticProps } from "next";
import {
  GetContractAt,
  SKALE_LankyIllFunnyTestnet,
  fetchDiamondContract,
} from "@/scripts/contracts";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const contract: any = GetContractAt(
      fetchDiamondContract.address,
      fetchDiamondContract.abi,
      SKALE_LankyIllFunnyTestnet
    );
    const allGames = await contract.getAllGames();

    const games = allGames.map((game: any) => ({
      ...game,
      4: Number(game[4]),
      5: Number(game[5]),
    }));

    return {
      props: {
        games,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
