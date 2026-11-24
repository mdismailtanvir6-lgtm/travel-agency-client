"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "@/components/layout/navbar";

// The navbar sits on top of the hero banner only on the home route; every
// other route keeps the navbar in the normal document flow.
export function SiteNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return <Navbar variant={isHome ? "overlay" : "default"} />;
}
