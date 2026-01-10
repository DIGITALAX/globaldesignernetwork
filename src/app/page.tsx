import { getDictionary } from "./[lang]/dictionaries";
import Entry from "./components/Common/modules/Entry";
import Wrapper from "./components/Common/modules/Wrapper";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://globaldesignernetwork.com";
  return {
    alternates: {
      canonical: `${baseUrl}/`,
    },
  };
}

export default async function Home() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return <Wrapper dict={dict} page={<Entry dict={dict} />}></Wrapper>;
}
