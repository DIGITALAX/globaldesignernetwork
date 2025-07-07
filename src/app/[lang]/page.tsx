import { Suspense } from "react";
import { getDictionary } from "./dictionaries";
import { tParams } from "./layout";
import Entry from "../components/modules/Entry";

export default async function IndexPage({ params }: { params: tParams }) {
  const { lang } = await params;
  const dict = await (getDictionary as (locale: any) => Promise<any>)(lang);
  return (
    <Suspense fallback={<></>}>
      <Entry dict={dict} />
    </Suspense>
  );
}
