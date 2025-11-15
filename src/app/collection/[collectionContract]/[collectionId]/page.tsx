import { getDictionary } from "@/app/[lang]/dictionaries";
import CollectionEntry from "@/app/components/Collection/modules/CollectionEntry";
import Wrapper from "@/app/components/Common/modules/Wrapper";

export default async function Collection() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return <Wrapper dict={dict} page={<CollectionEntry dict={dict} />}></Wrapper>;
}
