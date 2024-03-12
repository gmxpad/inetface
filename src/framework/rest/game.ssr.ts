"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  GetContractAt,
  SKALE_LankyIllFunnyTestnet,
  fetchDiamondContract,
} from "@/scripts/contracts";

type ParsedQueryParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
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

  const paths = games.flatMap((game: any) => ({
    params: { slug: game[3][0] },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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

  const { slug } = params!;

  try {
    const [game] = games.filter((game: any) => game[3][0] === slug);

    return {
      props: {
        game,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
