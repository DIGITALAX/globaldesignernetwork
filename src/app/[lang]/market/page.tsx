import { getDictionary } from "../dictionaries";
import { tParams } from "../layout";
import MarketEntry from "@/app/components/Market/modules/MarketEntry";

export default async function Market({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <MarketEntry dict={dict} />;
}
