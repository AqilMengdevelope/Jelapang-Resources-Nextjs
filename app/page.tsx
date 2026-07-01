import type { Metadata } from "next";
import MaintenanceScreen from "@/components/MaintenanceScreen";

/**
 * TEMPORARY: the home page is showing the maintenance screen.
 * The original home page is preserved in `app/page.tsx.bak` — to restore the
 * live site, replace this file's contents with that backup (or revert this
 * commit).
 */
export const metadata: Metadata = {
  title: "Under Maintenance — Jelapang Resources",
  description:
    "Jelapang Resources is currently undergoing scheduled maintenance. We will be back online shortly.",
  robots: { index: false, follow: false },
};

export default function Home() {
  return <MaintenanceScreen />;
}
