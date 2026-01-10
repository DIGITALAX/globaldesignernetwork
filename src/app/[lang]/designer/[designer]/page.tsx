import { tParams } from "../../layout";
import { getDictionary } from "../../dictionaries";
import DesignerEntry from "@/app/components/Designer/modules/DesignerEntry";
import { Metadata } from "next";
import { getDesigner } from "../../../../../graphql/gdn/getDesigners";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; designer: string }>;
}): Promise<Metadata> {
  const { lang, designer } = await params;
  const baseUrl = "https://globaldesignernetwork.com";

  const result = await getDesigner(designer);
  const designerData = result?.data?.designers?.[0];

  if (!designerData) {
    return {
      title: "Designer Not Found | Global Designer Network",
      description: "Web3 Fashion Designer Profile",
    };
  }

  const title = `${designerData.metadata?.title || "Designer"} | Web3 Fashion | Global Designer Network`;
  const description =
    designerData.metadata?.description ||
    "Indie web3 fashion designer. Because I can, and this is fucking cool = computational creative sovereignty.";

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/designer/${designer}/`,
      languages: {
        en: `${baseUrl}/en/designer/${designer}/`,
        es: `${baseUrl}/es/designer/${designer}/`,
        pt: `${baseUrl}/pt/designer/${designer}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/designer/${designer}/`,
      siteName: "Global Designer Network",
      locale: lang,
      type: "profile",
      images: designerData.metadata?.image
        ? [
            {
              url: `https://thedial.infura-ipfs.io/ipfs/${designerData.metadata.image}`,
              width: 1200,
              height: 630,
              alt: designerData.metadata.title || "Designer",
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      site: "@digitalax_",
      title,
      description,
      images: designerData.metadata?.image
        ? [`https://thedial.infura-ipfs.io/ipfs/${designerData.metadata.image}`]
        : [],
    },
  };
}

export default async function Designer({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <DesignerEntry dict={dict} />;
}
