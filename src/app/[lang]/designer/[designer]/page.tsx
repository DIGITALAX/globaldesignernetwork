import { tParams } from "../../layout";
import { getDictionary } from "../../dictionaries";
import DesignerEntry from "@/app/components/Designer/modules/DesignerEntry";

export default async function Designer({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <DesignerEntry dict={dict} />;
}
