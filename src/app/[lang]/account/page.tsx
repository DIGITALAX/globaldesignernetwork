import { getDictionary } from "../dictionaries";
import AccountEntry from "@/app/components/Account/modules/AccountEntry";

export default async function Account() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return <AccountEntry dict={dict} />;
}
