import { getDictionary } from "../[lang]/dictionaries";
import Wrapper from "../components/Common/modules/Wrapper";
import IndieDesignersEntry from "../components/IndieDesigners/modules/IndieDesignersEntry";

export default async function IndieDesigners() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return <Wrapper dict={dict} page={<IndieDesignersEntry dict={dict} />}></Wrapper>;
}
