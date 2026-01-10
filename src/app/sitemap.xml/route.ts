import { NextResponse } from "next/server";
import { getDesignersPaginated } from "../../../graphql/gdn/getDesigners";
import { getCollectionsPaginated } from "../../../graphql/gdn/getCollections";
import { LOCALES } from "@/app/lib/constantes";

const locales = LOCALES;

async function getAllDesigners() {
  const allDesigners: any[] = [];
  let skip = 0;
  const first = 100;
  try {
    while (true) {
      const result = await getDesignersPaginated(first, skip);
      if (!result?.data?.designers || result.data.designers.length === 0) break;
      allDesigners.push(...result.data.designers);
      if (result.data.designers.length < first) break;
      skip += first;
    }
  } catch (error) {
    console.error("Error fetching designers:", error);
  }
  return allDesigners;
}

async function getAllCollections() {
  const allCollections: any[] = [];
  let skip = 0;
  const first = 100;
  try {
    while (true) {
      const result = await getCollectionsPaginated(first, skip);
      if (!result?.data?.collections || result.data.collections.length === 0) break;
      allCollections.push(...result.data.collections);
      if (result.data.collections.length < first) break;
      skip += first;
    }
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
  return allCollections;
}

const allImages = [
  { loc: "globaldesignernetwork_poster.png", title: "Global Designer Network Poster | Web3 Fashion" },
  { loc: "factorydoor.png", title: "Factory Door - Web3 Fashion Manufacturing" },
  { loc: "designer.png", title: "Designer - CC0 Fashion Design" },
  { loc: "streetwear1.png", title: "Web3 Streetwear Collection One | DIGITALAX" },
  { loc: "streetwear2.png", title: "Web3 Streetwear Collection Two | DIGITALAX" },
  { loc: "gdn_table.png", title: "Global Designer Network Fashion Studio" },
  { loc: "howtoweb3fashion1.png", title: "How To Web3 Fashion Tutorial One" },
  { loc: "howtoweb3fashion2.png", title: "How To Web3 Fashion Tutorial Two" },
  { loc: "howtoweb3fashion3.png", title: "How To Web3 Fashion Tutorial Three" },
  { loc: "howtoweb3fashion4.png", title: "How To Web3 Fashion Tutorial Four" },
  { loc: "howtoweb3fashion5.png", title: "How To Web3 Fashion Tutorial Five" },
  { loc: "howtoweb3fashion6.png", title: "How To Web3 Fashion Tutorial Six" },
  { loc: "howtoweb3fashion7.png", title: "How To Web3 Fashion Tutorial Seven" },
  { loc: "start.png", title: "Start Your Web3 Fashion Journey" },
  { loc: "indie.png", title: "Indie Web3 Fashion Designers" },
  { loc: "ontherunway1.png", title: "On The Runway Collection One | Web3 Fashion" },
  { loc: "ontherunway2.png", title: "On The Runway Collection Two | Web3 Fashion" },
  { loc: "ontherunway3.png", title: "On The Runway Collection Three | Web3 Fashion" },
  { loc: "ontherunway4.png", title: "On The Runway Collection Four | Web3 Fashion" },
  { loc: "tres.png", title: "Los Tres Grandes - Web3 Fashion Economics" },
  { loc: "black.png", title: "BlackRockification - Digital Fashion Commentary" },
  { loc: "globaldesignernetwork.png", title: "Global Designer Network Logo | Web3 Fashion" },
  { loc: "telar.png", title: "Desde el Telar Jacquard - Web3 Fashion Technology" },
  { loc: "forum.png", title: "Global Designer Network Forum" },
  { loc: "runway1.png", title: "Global Designer Network Runway One | Web3 Fashion" },
  { loc: "runway2.png", title: "Global Designer Network Runway Two | Web3 Fashion" },
  { loc: "runway3.png", title: "Global Designer Network Runway Three | Web3 Fashion" },
  { loc: "runway4.png", title: "Global Designer Network Runway Four | Web3 Fashion" },
  { loc: "runway5.png", title: "Global Designer Network Runway Five | Web3 Fashion" },
  { loc: "runway6.png", title: "Global Designer Network Runway Six | Web3 Fashion" },
  { loc: "factory.png", title: "Web3 Fashion Factory - DIGITALAX Manufacturing" },
];

const allVideos = [
  { loc: "globaldesignernetwork.mp4", title: "Global Designer Network Introduction | Web3 Fashion Video" },
  { loc: "factorydoor.mp4", title: "Factory Door - Web3 Fashion Manufacturing Process" },
  { loc: "telar.mp4", title: "Desde el Telar Jacquard - Web3 Fashion Tech Explained" },
  { loc: "chica_gdn.mp4", title: "Global Designer Network Fashion Showcase" },
  { loc: "black.mp4", title: "BlackRockification - Digital Fashion Commentary Video" },
  { loc: "start.mp4", title: "Start Your Web3 Fashion Journey Video" },
  { loc: "indie.mp4", title: "For Indie Designers - Web3 Fashion Guide" },
  { loc: "tres.mp4", title: "Los Tres Grandes - Web3 Fashion Economics Video" },
  { loc: "runway1.mp4", title: "Runway Collection One - Web3 Fashion Show | DIGITALAX" },
  { loc: "runway2.mp4", title: "Runway Collection Two - Web3 Fashion Show | DIGITALAX" },
  { loc: "runway3.mp4", title: "Runway Collection Three - Web3 Fashion Show | DIGITALAX" },
  { loc: "runway4.mp4", title: "Runway Collection Four - Web3 Fashion Show | DIGITALAX" },
  { loc: "runway5.mp4", title: "Runway Collection Five - Web3 Fashion Show | DIGITALAX" },
  { loc: "runway6.mp4", title: "Runway Collection Six - Web3 Fashion Show | DIGITALAX" },
  { loc: "factory.mp4", title: "Web3 Fashion Factory Process - DIGITALAX Manufacturing" },
  { loc: "streetwear1.mp4", title: "Web3 Streetwear Collection One Video | DIGITALAX" },
  { loc: "streetwear2.mp4", title: "Web3 Streetwear Collection Two Video | DIGITALAX" },
  { loc: "gdn_table.mp4", title: "Global Designer Network Fashion Studio Video" },
];

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://globaldesignernetwork.com";

  const designers = await getAllDesigners();
  const collections = await getAllCollections();

  const staticPages = ["", "market", "indie-designers", "account"];

  let staticPagesXml = "";
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}${page ? `/${page}` : ""}/`;
      const priority = page === "" ? "1.0" : "0.8";
      staticPagesXml += `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${priority}</priority>
        ${locales.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}/${l}${page ? `/${page}` : ""}/" />`).join("\n        ")}
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page ? `/${page}` : ""}/" />
      </url>`;
    });
  });

  let designerPagesXml = "";
  designers.forEach((designer) => {
    locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}/designer/${designer.wallet}/`;
      const lastmod = designer.blockTimestamp ? new Date(parseInt(designer.blockTimestamp) * 1000).toISOString() : new Date().toISOString();
      designerPagesXml += `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`;
    });
  });

  let collectionPagesXml = "";
  collections.forEach((collection) => {
    locales.forEach((locale) => {
      const url = `${baseUrl}/${locale}/collection/${collection.collectionContract}/${collection.collectionId}/`;
      const lastmod = collection.blockTimestamp ? new Date(parseInt(collection.blockTimestamp) * 1000).toISOString() : new Date().toISOString();
      collectionPagesXml += `
      <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`;
    });
  });

  const imagesXml = allImages.map((img) => `
      <url>
        <loc>${baseUrl}/images/${img.loc}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
        <image:image>
          <image:loc>${baseUrl}/images/${img.loc}</image:loc>
          <image:title><![CDATA[${img.title}]]></image:title>
          <image:caption><![CDATA[${img.title} - Global Designer Network]]></image:caption>
        </image:image>
      </url>`).join("");

  const videosXml = allVideos.map((vid) => `
      <url>
        <loc>${baseUrl}/videos/${vid.loc}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
        <video:video>
          <video:thumbnail_loc>${baseUrl}/images/${vid.loc.replace(".mp4", ".png")}</video:thumbnail_loc>
          <video:title><![CDATA[${vid.title}]]></video:title>
          <video:description><![CDATA[${vid.title} - Global Designer Network Web3 Fashion Content]]></video:description>
          <video:content_loc>${baseUrl}/videos/${vid.loc}</video:content_loc>
        </video:video>
      </url>`).join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
    >${staticPagesXml}${designerPagesXml}${collectionPagesXml}${imagesXml}${videosXml}
    </urlset>`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
