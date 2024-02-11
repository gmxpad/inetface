"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import { MOCK_LAUNCHPADS_INO } from "@/MOCK/launchpads";

type ParsedQueryParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
  const paths = MOCK_LAUNCHPADS_INO.flatMap((launch: any) => ({
    params: { slug: launch.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const launchpads = MOCK_LAUNCHPADS_INO;
  const { slug } = params!; //* we know it's required because of getStaticPaths

  try {
    const [launch] = launchpads.filter((launch: any) => launch.slug === slug);

    return {
      props: {
        launch,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
