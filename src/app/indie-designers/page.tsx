import { getDictionary } from "../[lang]/dictionaries";
import Wrapper from "../components/Common/modules/Wrapper";
import IndieDesignersEntry from "../components/IndieDesigners/modules/IndieDesignersEntry";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gms.globaldesignernetwork.com";
  return {
    alternates: {
      canonical: `${baseUrl}/indie-designers/`,
    },
  };
}

export default async function IndieDesigners() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return <Wrapper dict={dict} page={<IndieDesignersEntry dict={dict} />}></Wrapper>;
}
