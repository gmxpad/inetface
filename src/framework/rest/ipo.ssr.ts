"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import { GetContract, fetchDiamondContract } from "@/scripts/contracts";

type ParsedQueryParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const contract: any = GetContract(fetchDiamondContract.address);
  const allGames = await contract.getAllGames();

  const games = allGames.map((game: any) => ({
    ...game,
    4: Number(game[4]),
    5: Number(game[5]),
  }));
  const ipos = games.filter(
    (game: any) => game[1] === true && game[2] === true
  );

  const paths = ipos.flatMap((ipo: any) => ({
    params: { slug: ipo[3][0] },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const contract: any = GetContract(fetchDiamondContract.address);
  const allGames = await contract.getAllGames();

  const gamesWithIpoPromises = await allGames.map(async (game: any) => {
    const currentIpo = await contract.getIpo(
      Number(game[4]),
      Number(game[5][game[5].length - 1])
    );
    const ipoData = {
      ...currentIpo,
      1: Number(currentIpo[1]),
      2: Number(currentIpo[2]),
      3: Number(currentIpo[3]),
      4: Number(currentIpo[4]),
      5: Number(currentIpo[5]),
      6: Number(currentIpo[6]),
      7: Number(currentIpo[7]),
      8: Number(currentIpo[8]),
      9: Number(currentIpo[9]),
      10: Number(currentIpo[10]),
      11: Number(currentIpo[11]),
      12: Number(currentIpo[12]),
      13: Number(currentIpo[13]),
      14: Number(currentIpo[14]),
    };
    return {
      ...game,
      4: Number(game[4]),
      5: Number(game[5]),
      ipoDatas: ipoData,
    };
  });
  const gamesWithIpo = await Promise.all(gamesWithIpoPromises);

  const ipos = gamesWithIpo.filter(
    (game: any) => game[1] === true && game[2] === true
  );

  const { slug } = params!;

  try {
    const [ipo] = ipos.filter((game: any) => game[3][0] === slug);

    return {
      props: {
        ipo,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
