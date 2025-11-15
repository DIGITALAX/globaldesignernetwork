import { getDictionary } from "@/app/[lang]/dictionaries";
import { tParams } from "@/app/[lang]/layout";
import CollectionEntry from "@/app/components/Collection/modules/CollectionEntry";

export default async function Collection({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <CollectionEntry dict={dict} />;
}
