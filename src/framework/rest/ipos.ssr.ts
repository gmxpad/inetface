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
      7: Number(game[7]),
      8: Number(game[8]),
      9: Number(game[9]),
      10: Number(game[10]),
      11: Number(game[11]),
      12: Number(game[12]),
      13: Number(game[13]),
      14: Number(game[14]),
      15: Number(game[15]),
      16: Number(game[16]),
      17: Number(game[17]),
      18: Number(game[18]),
      19: Number(game[19]),
    }));

    const ipos = games.filter(
      (game: any) => game[1] === true && game[2] === true
    );

    return {
      props: {
        ipos,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
