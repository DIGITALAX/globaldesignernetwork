import IndieDesignersEntry from "@/app/components/IndieDesigners/modules/IndieDesignersEntry";
import { getDictionary } from "../dictionaries";
import { tParams } from "../layout";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = "https://globaldesignernetwork.com";

  const titles: Record<string, string> = {
    en: "Indie Designers - Web3 Fashion Fleet | Global Designer Network",
    es: "Diseñadores Indie - Flota de Moda Web3 | Global Designer Network",
    pt: "Designers Indie - Frota de Moda Web3 | Global Designer Network",
  };

  const descriptions: Record<string, string> = {
    en: "Meet the indie web3 fashion designers. GPU clusters that don't ask what you're training. Designers who code and coders who cut. CC0 pattern libraries for computational creative sovereignty.",
    es: "Conoce a los diseñadores indie de moda web3. Clusters GPU que no preguntan qué entrenas. Diseñadores que codean y programadores que cortan. Bibliotecas de patrones CC0 para soberanía creativa computacional.",
    pt: "Conheça os designers indie de moda web3. Clusters GPU que não perguntam o que você está treinando. Designers que programam e programadores que cortam. Bibliotecas de padrões CC0 para soberania criativa computacional.",
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${lang}/indie-designers/`,
      languages: {
        en: `${baseUrl}/en/indie-designers/`,
        es: `${baseUrl}/es/indie-designers/`,
        pt: `${baseUrl}/pt/indie-designers/`,
      },
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: `${baseUrl}/${lang}/indie-designers/`,
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

export default async function IndieDesigners({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <IndieDesignersEntry dict={dict} />
}
