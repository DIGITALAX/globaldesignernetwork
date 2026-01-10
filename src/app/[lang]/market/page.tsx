import { getDictionary } from "../dictionaries";
import { tParams } from "../layout";
import MarketEntry from "@/app/components/Market/modules/MarketEntry";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = "https://globaldesignernetwork.com";

  const titles: Record<string, string> = {
    en: "Market - Do you wear web3 fashion? | Global Designer Network",
    es: "Mercado - ¿Usas moda web3? | Global Designer Network",
    pt: "Mercado - Você veste moda web3? | Global Designer Network",
  };

  const descriptions: Record<string, string> = {
    en: "Indie Web3 Fashion Fleet. Intensely DIY. Radical CC0. Pattern libraries for people who read error logs. Industrial sewing machines for people who think Figma loads slow.",
    es: "Flota Indie de Moda Web3. Intensamente DIY. CC0 Radical. Bibliotecas de patrones para gente que lee logs de error. Máquinas de coser industriales para gente que piensa que Figma carga lento.",
    pt: "Frota Indie de Moda Web3. Intensamente DIY. CC0 Radical. Bibliotecas de padrões para pessoas que leem logs de erro. Máquinas de costura industriais para pessoas que acham Figma lento.",
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${lang}/market/`,
      languages: {
        en: `${baseUrl}/en/market/`,
        es: `${baseUrl}/es/market/`,
        pt: `${baseUrl}/pt/market/`,
      },
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: `${baseUrl}/${lang}/market/`,
      siteName: "Global Designer Network",
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@digitalax_",
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
    },
  };
}

export default async function Market({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <MarketEntry dict={dict} />;
}
