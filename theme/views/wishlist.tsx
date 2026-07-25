import Link from "next/link";
import type { WishlistViewThemeProps } from "@/components/theme/types";
import LotGrid from "@/components/theme/views/lot-grid";

export default function Wishlist({
  eyebrow,
  title,
  description,
  loading,
  loadError,
  hydrated,
  empty,
  resultsTitle,
  items,
}: WishlistViewThemeProps) {
  const ready = !loading && !loadError && hydrated;

  return (
    <div className="wishlist-page align-center flex flex-col justify-center">
      <section className="align-center text-center my-8">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <span>{description}</span>
      </section>
      <div className="wishlist-content">
        {(loading || !hydrated) && (
          <div className="wishlist-skeleton" aria-busy="true" role="status">
            <span className="sr-only">Cargando favoritos…</span>
            <header className="wishlist-results-heading">
              <div className="wishlist-skeleton-bar wishlist-skeleton-title" />
              <div className="wishlist-skeleton-bar wishlist-skeleton-meta" />
            </header>
            <div className="lot-grid auction-grid">
              {Array.from({ length: 6 }, (_, index) => (
                <article className="lot auction-lot wishlist-skeleton-card" key={index}>
                  <div className="lot-photo wishlist-skeleton-photo" />
                  <div className="lot-info">
                    <div className="wishlist-skeleton-bar wishlist-skeleton-status" />
                    <div className="wishlist-skeleton-bar wishlist-skeleton-name" />
                    <div className="wishlist-skeleton-bar wishlist-skeleton-auction" />
                    <div className="wishlist-skeleton-bar wishlist-skeleton-price" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
        {!loading && loadError && (
          <div className="market-state error" role="alert">{loadError}</div>
        )}
        {ready && items.length === 0 && (
          <section className="wishlist-empty">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
            </svg>
            <h2>{empty.title}</h2>
            <p>{empty.description}</p>
            <Link href={empty.ctaHref}>{empty.ctaLabel}</Link>
          </section>
        )}
        {ready && items.length > 0 && (
          <LotGrid
            context="wishlist"
            title={resultsTitle}
            meta={`${items.length} ${items.length === 1 ? "lote" : "lotes"}`}
            items={items}
          />
        )}
      </div>
    </div>
  );
}
