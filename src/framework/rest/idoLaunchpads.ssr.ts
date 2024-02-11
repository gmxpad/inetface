"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import { MOCK_LAUNCHPADS } from "@/MOCK/launchpads";

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
    const launchpads = MOCK_LAUNCHPADS;

    return {
      props: {
        launchpads,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
