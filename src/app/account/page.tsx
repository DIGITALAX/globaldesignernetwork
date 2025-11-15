import { getDictionary } from "../[lang]/dictionaries";
import AccountEntry from "../components/Account/modules/AccountEntry";
import Wrapper from "../components/Common/modules/Wrapper";

export default async function Account() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return <Wrapper dict={dict} page={<AccountEntry dict={dict} />}></Wrapper>;
}
