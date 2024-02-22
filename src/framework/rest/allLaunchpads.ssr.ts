"use client";
import { GetStaticPaths, GetStaticProps } from "next";
import { MOCK_LAUNCHPADS_INO } from "@/MOCK/launchpads";
import { GetContract, fetchDiamondContract } from "@/scripts/contracts";

// type ParsedQueryParams = {
//   slug: string;
// };
// export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async () => {
//   return {
//     paths: ["/launchpads/ino"],
//     fallback: "blocking",
//   };
// };

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const contract: any = GetContract(fetchDiamondContract.address);
    const allLaunchpads = await contract.getAllLaunchpads();

    const launchpads = allLaunchpads.map((launchpad: any) => ({
      ...launchpad,
      8: Number(launchpad[8]),
      9: Number(launchpad[9]),
      10: Number(launchpad[10]),
      11: Number(launchpad[11]),
      12: Number(launchpad[12]),
      13: Number(launchpad[13]),
      14: Number(launchpad[14]),
      15: Number(launchpad[15]),
      16: Number(launchpad[16]),
      17: Number(launchpad[17]),
      18: Number(launchpad[18]),
      19: Number(launchpad[19]),
      20: Number(launchpad[20]),
      21: Number(launchpad[21]),
      22: Number(launchpad[22]),
      23: Number(launchpad[23]),
      24: Number(launchpad[24]),
      25: Number(launchpad[25]),
      26: Number(launchpad[26]),
      27: Number(launchpad[27]),
      28: Number(launchpad[28]),
      29: Number(launchpad[29]),
      30: Array.isArray(launchpad[30])
        ? launchpad[30].map((item: any) => Number(item))
        : [],
    }));

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
