import Link from "next/link";
import OptionalAuthControls from "@/components/auth/optional-auth-controls";

export default function SiteNavigation() {
  return (
    <div className="starter-navigation">
      <nav aria-label="Navegación principal">
        <Link href="/">Subastas</Link>
        <Link href="/wishlist">Favoritos</Link>
        <Link href="/account">Mi cuenta</Link>
      </nav>
      <OptionalAuthControls />
    </div>
  );
}
