import Header from "./Header";
import { getSiteInfo } from "@/lib/wordpress";

export default async function SiteHeader() {
  const site = await getSiteInfo();
  return (
    <Header phoneDisplay={site.phoneDisplay} phoneHref={site.phoneHref} />
  );
}
