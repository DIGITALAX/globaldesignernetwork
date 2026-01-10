import { getDictionary } from "@/app/[lang]/dictionaries";
import Wrapper from "@/app/components/Common/modules/Wrapper";
import DesignerEntry from "@/app/components/Designer/modules/DesignerEntry";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ designer: string }>;
}): Promise<Metadata> {
  const baseUrl = "https://globaldesignernetwork.com";
  const { designer } = await params;
  return {
    alternates: {
      canonical: `${baseUrl}/designer/${designer}/`,
    },
  };
}

export default async function IndieDesigners() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return<Wrapper dict={dict} page={<DesignerEntry dict={dict} />}></Wrapper>
}
