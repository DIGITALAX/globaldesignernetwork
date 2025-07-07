import { NextResponse } from "next/server";

const locales = ["en", "es"];

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://globaldesignernetwork.com";

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >
      <url>
        <loc>${baseUrl}/</loc>
        ${locales
          .map(
            (locale) => `
          <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}/${locale}/" />
          `
          )
          .join("")}
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/"  />

        ${[
          {
            image: "Global Designer Network Fashion Studio",
            title: "gdn_table.png",
          },
          {
            image: "Global Designer Network Runway One",
            title: "runway1.png",
          },
          {
            image: "Global Designer Network Runway Two",
            title: "runway2.png",
          },
          {
            image: "Global Designer Network Runway Three",
            title: "runway3.png",
          },
          {
            image: "Global Designer Network Runway Four",
            title: "runway4.png",
          },
          {
            image: "Global Designer Network Runway Five",
            title: "runway5.png",
          },
          {
            image: "Global Designer Network Runway Six",
            title: "runway6.png",
          },
          {
            image: "GDN",
            title: "globaldesignernetwork.png",
          },
          {
            image: "How to Be Web3 Fashion",
            title: "designer.png",
          },
        ].map(
          (im) =>
            `<image:image>
            <image:loc>${`${baseUrl}/images/${im.image}`}</image:loc>
            <image:title><![CDATA[${
              im.title
            } | Global Designer Network ]]></image:title>
            <image:caption><![CDATA[${
              im.title
            } | Global Designer Network]]></image:caption>
          </image:image>
         `
        )}
      </url>
    </urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
