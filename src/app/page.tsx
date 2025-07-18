import { getDictionary } from "./[lang]/dictionaries";
import Entry from "./components/modules/Entry";

export default async function Home() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return <Entry dict={dict} />;
}
