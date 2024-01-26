"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import { MOCK_GAMES } from "@/MOCK/mockGames";

type ParsedQueryParams = {
  slug: string;
};
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const games = MOCK_GAMES;

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
