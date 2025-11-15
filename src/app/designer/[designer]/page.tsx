import { getDictionary } from "@/app/[lang]/dictionaries";
import Wrapper from "@/app/components/Common/modules/Wrapper";
import DesignerEntry from "@/app/components/Designer/modules/DesignerEntry";

export default async function IndieDesigners() {
  const dict = await (getDictionary as (locale: any) => Promise<any>)("en");
  return<Wrapper dict={dict} page={<DesignerEntry dict={dict} />}></Wrapper>
}
