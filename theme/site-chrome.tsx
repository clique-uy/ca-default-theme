"use client";

import Link from "next/link";
import SiteNavigation from "./site-navigation";
import { useSiteIdentity } from "@/components/layout/site-identity-provider";

function siteInitials(value: string) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  return (words.length > 1
    ? `${words[0][0] ?? ""}${words.at(-1)?.[0] ?? ""}`
    : words[0]?.slice(0, 2) || "CA").toLocaleUpperCase("es");
}

export function SiteHeader() {
  const identity = useSiteIdentity();

  return (
    <header className="starter-header">
      <div className="starter-header-inner">
        <Link className="starter-brand" href="/">
          <span aria-hidden>{siteInitials(identity.businessName)}</span>
          <strong>{identity.businessName}</strong>
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}

export function SiteFooter() {
  const identity = useSiteIdentity();

  return (
    <footer className="starter-footer">
      <div>
        <strong>{identity.businessName}</strong>
        <small>© {new Date().getFullYear()} · Subastas en línea</small>
      </div>
    </footer>
  );
}
