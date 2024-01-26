"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import { MOCK_GAMES } from "@/MOCK/mockGames";

type ParsedQueryParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const paths = MOCK_GAMES.flatMap((game: any) => ({
    params: { slug: game.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const games = MOCK_GAMES;
  const { slug } = params!; //* we know it's required because of getStaticPaths

  try {
    const [game] = games.filter((game: any) => game.slug === slug);

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
