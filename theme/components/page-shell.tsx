import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/layout/site-chrome";
import {ReactLenis} from "lenis/react"
export default function PageShell({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <ReactLenis root/>
      <p>
        {JSON.stringify(Math.random())}
      </p>
        <main className="starter-page">{children}</main>
      <SiteFooter />
    </>
  );
}
