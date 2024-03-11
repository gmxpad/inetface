"use client";
import { GetStaticProps } from "next";
import { GetContract, fetchDiamondContract } from "@/scripts/contracts";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const contract: any = GetContract(fetchDiamondContract.address);
    const allGames = await contract.getAllGames();

    const games = allGames.map((game: any) => ({
      ...game,
      4: Number(game[4]),
      5: Number(game[5]),
      6: Number(game[6]),
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
