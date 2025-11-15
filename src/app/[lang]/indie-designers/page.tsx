import IndieDesignersEntry from "@/app/components/IndieDesigners/modules/IndieDesignersEntry";
import { getDictionary } from "../dictionaries";
import { tParams } from "../layout";

export default async function IndieDesigners({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return <IndieDesignersEntry dict={dict} />
}
