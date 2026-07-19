import type { Metadata } from "next";
import MaintenanceScreen from "@/components/MaintenanceScreen";

export const metadata: Metadata = {
  title: "Under Maintenance, Jelapang Resources",
  description:
    "Jelapang Resources is currently undergoing scheduled maintenance. We will be back online shortly.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return <MaintenanceScreen />;
}
