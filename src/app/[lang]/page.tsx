import { getDictionary } from "./dictionaries";
import { tParams } from "./layout";
import Entry from "../components/Common/modules/Entry";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = "https://globaldesignernetwork.com";

  const titles: Record<string, string> = {
    en: "Global Designer Network | Web3 Fashion Fleet - Intensely DIY, Radical CC0",
    es: "Global Designer Network | Flota de Moda Web3 - Intensamente DIY, CC0 Radical",
    pt: "Global Designer Network | Frota de Moda Web3 - Intensamente DIY, CC0 Radical",
  };

  const descriptions: Record<string, string> = {
    en: "When someone with GPU access and vibe coding skills can iterate faster and create more than traditional fashion structures, the question isn't 'why are you doing this?' but 'why aren't you?' Computational creative sovereignty for web3 fashion.",
    es: "Cuando alguien con acceso a GPU y habilidades de codificación puede iterar más rápido y crear más que las estructuras de moda tradicionales, la pregunta no es '¿por qué haces esto?' sino '¿por qué no?' Soberanía creativa computacional para moda web3.",
    pt: "Quando alguém com acesso a GPU e habilidades de codificação pode iterar mais rápido e criar mais que as estruturas de moda tradicionais, a pergunta não é 'por que você está fazendo isso?' mas 'por que não?' Soberania criativa computacional para moda web3.",
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${lang}/`,
      languages: {
        en: `${baseUrl}/en/`,
        es: `${baseUrl}/es/`,
        pt: `${baseUrl}/pt/`,
      },
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: `${baseUrl}/${lang}/`,
      siteName: "Global Designer Network",
      locale: lang,
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/globaldesignernetwork_poster.png`,
          width: 1200,
          height: 630,
          alt: "Global Designer Network - Web3 Fashion",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@digitalax_",
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      images: [`${baseUrl}/images/globaldesignernetwork_poster.png`],
    },
  };
}

export default async function IndexPage({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <Entry dict={dict} />;
}
