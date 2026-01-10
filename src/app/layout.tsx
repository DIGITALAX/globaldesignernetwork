import type { Metadata } from "next";
import "./globals.css";
import { LOCALES } from "./lib/constantes";
import Providers from "./providers";
import Footer from "./components/Common/modules/Footer";

export const metadata: Metadata = {
  title: "Global Designer Network",
  description: "Indie Web3 Fashion Fleet. Intensely DIY. Radical CC0. In collaboration with DIGITALAX.",
  robots: {
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: `https://globaldesignernetwork.com/`,
    languages: LOCALES.reduce((acc, item) => {
      acc[item] = `https://globaldesignernetwork.com/`;
      return acc;
    }, {} as { [key: string]: string }),
  },
  keywords:
    "Web3, Web3 Fashion, Moda Web3, Open Source, CC0, Emma-Jane MacKinnon-Lee, Open Source LLMs, DIGITALAX, F3Manifesto, digitalax.xyz, f3manifesto.xyz, Women, Life, Freedom.",
  twitter: {
    card: "summary_large_image",
    site: "@digitalax_",
    title: "Global Designer Network",
    description: "Indie Web3 Fashion Fleet. Intensely DIY. Radical CC0. In collaboration with DIGITALAX.",
  },
  openGraph: {
    title: "Global Designer Network",
    description: "Indie Web3 Fashion Fleet. Intensely DIY. Radical CC0. In collaboration with DIGITALAX.",
  },
  creator: "Emma-Jane MacKinnon-Lee",
  publisher: "Emma-Jane MacKinnon-Lee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Global Designer Network",
              url: "https://globaldesignernetwork.com/",
              logo: {
                "@type": "ImageObject",
                url: "https://globaldesignernetwork.com/images/globaldesignernetwork.png",
                width: 1200,
                height: 630,
                caption: "Global Designer Network Logo - Web3 Fashion",
              },
              founder: {
                "@type": "Person",
                name: "Emma-Jane MacKinnon-Lee",
                url: "https://emmajanemackinnonlee.com/",
                sameAs: [
                 "https://emmajanemackinnonlee.com/",
                "https://emmajanemackinnon.com/",
                "https://emmajanemackinnonlee.xyz/",
                "https://emmajanemackinnonlee.net/",
                "https://emmajanemackinnonlee.ai/",
                "https://emmajanemackinnonlee.org/",
                "https://emmajanemackinnonlee.dev/",
                "https://emmajanemackinnonlee.info/",
                "https://emmajanemackinnonlee-f3manifesto.com/",
                "https://emmajanemackinnonlee-digitalax.com/",
                "https://emmajanemackinnonlee-web3fashion.com/",
                "https://icoinedweb3fashion.com/",
                "https://syntheticfutures.xyz/",
                "https://web3fashion.xyz/",
                "https://emancipa.xyz/",
                "https://highlangu.com/",
                "https://digitalax.xyz/",
                "https://cc0web3fashion.com/",
                "https://cc0web3.com/",
                "https://cuntism.net/",
                "https://dhawu.com/",
                "https://casadeespejos.com/",
                "https://emancipa.net/",
                "https://dhawu.emancipa.xyz/",
                "https://highlangu.emancipa.xyz/",
                "https://twitter.com/emmajane1313",
                "https://medium.com/@casadeespejos",
                "https://www.flickr.com/photos/emmajanemackinnonlee/",
                ],
              },
              sameAs: [
                "https://twitter.com/digitalax_",
                "https://lens.xyz/u/globaldesignernetwork",
              ],
              description: "Indie Web3 Fashion Fleet. Intensely DIY. Radical CC0. Pattern libraries for people who read error logs.",
              keywords: "web3 fashion, digitalax, CC0 fashion, indie designers, blockchain fashion, decentralized fashion, smart contracts fashion",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                name: "Global Designer Network Introduction - Web3 Fashion",
                description: "Indie Web3 Fashion Fleet. Intensely DIY. Radical CC0.",
                thumbnailUrl: "https://globaldesignernetwork.com/images/globaldesignernetwork.png",
                uploadDate: "2024-01-01T00:00:00Z",
                contentUrl: "https://globaldesignernetwork.com/videos/globaldesignernetwork.mp4",
                embedUrl: "https://globaldesignernetwork.com/videos/globaldesignernetwork.mp4",
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                name: "Web3 Fashion Runway Collection One - DIGITALAX",
                description: "Web3 Fashion Show - On The Runway",
                thumbnailUrl: "https://globaldesignernetwork.com/images/runway1.png",
                uploadDate: "2024-01-01T00:00:00Z",
                contentUrl: "https://globaldesignernetwork.com/videos/runway1.mp4",
                embedUrl: "https://globaldesignernetwork.com/videos/runway1.mp4",
              },
              {
                "@context": "https://schema.org",
                "@type": "VideoObject",
                name: "For Indie Designers - Web3 Fashion Guide",
                description: "Tune in to this agent's thread: what's fashion about web3?",
                thumbnailUrl: "https://globaldesignernetwork.com/images/indie.png",
                uploadDate: "2024-01-01T00:00:00Z",
                contentUrl: "https://globaldesignernetwork.com/videos/indie.mp4",
                embedUrl: "https://globaldesignernetwork.com/videos/indie.mp4",
              },
            ]),
          }}
        />
      </head>
      <body className="selection:bg-red-700">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
