import { getDictionary } from "../dictionaries";
import { tParams } from "../layout";
import AccountEntry from "@/app/components/Account/modules/AccountEntry";

export default async function Account({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <AccountEntry dict={dict} />;
}
