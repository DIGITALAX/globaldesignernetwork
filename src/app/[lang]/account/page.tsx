import { getDictionary } from "../dictionaries";
import { tParams } from "../layout";
import AccountEntry from "@/app/components/Account/modules/AccountEntry";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: tParams;
}): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = "https://globaldesignernetwork.com";

  const titles: Record<string, string> = {
    en: "Account - Designer Dashboard | Global Designer Network",
    es: "Cuenta - Panel de Diseñador | Global Designer Network",
    pt: "Conta - Painel do Designer | Global Designer Network",
  };

  const descriptions: Record<string, string> = {
    en: "Designer dashboard. Code, sew, design. Deploy smart contracts. Mint on ETH + ZK aligned chains. Because you can, and this is fucking cool = computational creative sovereignty.",
    es: "Panel de diseñador. Codea, cose, diseña. Despliega contratos inteligentes. Mintea en ETH + cadenas alineadas con ZK. Porque puedes, y esto es jodidamente cool = soberanía creativa computacional.",
    pt: "Painel do designer. Programe, costure, projete. Implante contratos inteligentes. Minte em ETH + chains alinhadas com ZK. Porque você pode, e isso é incrível = soberanía criativa computacional.",
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${lang}/account/`,
      languages: {
        en: `${baseUrl}/en/account/`,
        es: `${baseUrl}/es/account/`,
        pt: `${baseUrl}/pt/account/`,
      },
    },
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      url: `${baseUrl}/${lang}/account/`,
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
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function Account({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <AccountEntry dict={dict} />;
}
