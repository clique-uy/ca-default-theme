import Link from "next/link";
import type { AuctionDetailThemeProps } from "@/components/theme/types";
import LotGrid from "@/components/theme/views/lot-grid";

export default function AuctionDetail({
  loading,
  loadError,
  auction,
  slots,
}: AuctionDetailThemeProps) {
  if (auction?.kind === "live") {
    return (
      <>
        <section className="live-event-shell">
          <header className="live-event-header">
            <div>
              <span className="live-event-badge"><i /> En vivo</span>
              <div>
                <p>{auction.eyebrow}</p>
                <h1>{auction.title}</h1>
              </div>
            </div>
            <span className={`live-event-connection ${auction.connection}`} role="status">
              <i />
              {auction.connectionLabel}
            </span>
          </header>

          <div className="live-event-stage">
            <div className="live-event-video">
              {auction.hasLivestream
                ? slots.livestream
                : (
                  <div className="live-event-video-placeholder">
                    <span aria-hidden="true">▶</span>
                    <strong>{auction.livestreamUnavailableTitle}</strong>
                    <small>{auction.livestreamUnavailableDescription}</small>
                  </div>
                )}
            </div>

            <aside className="live-event-active" aria-live="polite">
              <header>
                <span>Lote actual</span>
                {auction.activeLot
                  ? (
                    <small>
                      {auction.activeLot.position} de {auction.rail.lots.length}
                    </small>
                  )
                  : null}
              </header>
              {auction.activeLot
                ? (
                  <>
                    <div
                      className="live-event-active-image"
                      style={auction.activeLot.imageUrl
                        ? { backgroundImage: `url(${JSON.stringify(auction.activeLot.imageUrl)})` }
                        : undefined}
                    >
                      <span>{auction.activeLot.positionLabel}</span>
                    </div>
                    <div className="live-event-active-copy">
                      <h2>{auction.activeLot.name}</h2>
                      {auction.activeLot.currentAmountLabel
                        ? (
                          <div className="live-event-price">
                            <small>{auction.activeLot.priceLabel}</small>
                            <strong>{auction.activeLot.currentAmountLabel}</strong>
                            {auction.activeLot.bidCountLabel
                              ? <span>{auction.activeLot.bidCountLabel}</span>
                              : null}
                          </div>
                        )
                        : null}
                      {auction.activeLot.legacySale
                        ? (
                          <p className="sale-method-note">
                            Modalidad heredada: transacciones en línea no disponibles.
                          </p>
                        )
                        : null}
                      {auction.activeLot.youAreWinning
                        ? (
                          <p className="live-event-winning">
                            <i /> {auction.activeLot.youAreWinningLabel}
                          </p>
                        )
                        : null}
                      {slots.activeBidControl}
                      <Link className="live-event-lot-link" href={auction.activeLot.detailsHref}>
                        Ver ficha e historial <span>→</span>
                      </Link>
                    </div>
                  </>
                )
                : (
                  <div className="live-event-waiting">
                    <span className="live-event-waiting-icon" aria-hidden="true">◷</span>
                    <h2>{auction.waiting.title}</h2>
                    <p>{auction.waiting.description}</p>
                    {auction.waiting.nextLotName
                      ? (
                        <div>
                          <small>A continuación</small>
                          <strong>{auction.waiting.nextLotName}</strong>
                        </div>
                      )
                      : null}
                  </div>
                )}
            </aside>
          </div>

          <nav className="live-event-rail" aria-label="Lotes de la subasta">
            <div>
              <strong>{auction.rail.title}</strong>
              <span>{auction.rail.progressLabel}</span>
            </div>
            <div className="live-event-rail-list">
              {auction.rail.lots.map((lot) => (
                <Link
                  className={lot.status}
                  aria-current={lot.current ? "step" : undefined}
                  href={lot.detailsHref}
                  key={lot.id}
                >
                  <span>{lot.positionLabel}</span>
                  <strong>{lot.name}</strong>
                  <small>{lot.statusLabel}</small>
                </Link>
              ))}
            </div>
          </nav>
        </section>

        <div className="auction-detail-content live-event-content">
          {!loading && loadError
            ? <div className="market-state error" role="alert">{loadError}</div>
            : null}
        </div>
      </>
    );
  }

  const catalog = auction?.kind === "catalog" ? auction : undefined;

  if (loading && !catalog) {
    return (
      <div className="auction-detail-skeleton" aria-busy="true" role="status">
        <span className="sr-only">Cargando subasta…</span>
        <section className="auction-detail-hero" aria-hidden="true">
          <div className="auction-detail-hero-copy">
            <div className="auction-detail-skeleton-bar auction-detail-skeleton-headline" />
            <div className="auction-detail-skeleton-bar auction-detail-skeleton-title" />
            <div className="auction-detail-skeleton-bar auction-detail-skeleton-subtitle" />
          </div>
        </section>
        <div className="auction-detail-content" aria-hidden="true">
          <section className="detail-lots-section">
            <header className="detail-lots-heading">
              <div className="auction-detail-skeleton-bar auction-detail-skeleton-lots-title" />
              <div className="auction-detail-skeleton-bar auction-detail-skeleton-lots-meta" />
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
          </section>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className={`auction-detail-hero${catalog?.hasLivestream ? " with-livestream" : ""}`}>
        {catalog?.hasLivestream ? slots.livestream : null}
        {catalog
          ? (
            <div className="auction-detail-hero-copy">
              <h1>{catalog.headline}</h1>
              <p>{catalog.title}</p>
              {catalog.scheduled
                ? slots.preAuctionActions
                : catalog.subtitle
                  ? <small>{catalog.subtitle}</small>
                  : null}
            </div>
          )
          : (
            <div className="auction-detail-hero-copy">
              <h1>Subasta no disponible</h1>
            </div>
          )}
      </section>

      <div className="auction-detail-content">
        {!loading && loadError
          ? <div className="market-state error" role="alert">{loadError}</div>
          : null}

        {catalog?.terms
          ? (
            <section className="auction-terms">
              <h2>{catalog.terms.title}</h2>
              {catalog.terms.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph.split("\n").map((line, index, lines) => (
                    <span key={`${paragraph}-${index}`}>
                      {line}
                      {index < lines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
              ))}
            </section>
          )
          : null}

        {catalog
          ? catalog.lotItems.length > 0
            ? (
              <LotGrid
                context="auction"
                title={catalog.lotsTitle}
                meta={catalog.lotsMeta}
                items={catalog.lotItems}
              />
            )
            : (
              <section className="detail-lots-section" aria-live="polite">
                <header className="detail-lots-heading">
                  <h2>{catalog.lotsTitle}</h2>
                  <span>{catalog.lotsMeta}</span>
                </header>
                <div className="market-state">{catalog.lotsEmptyLabel}</div>
              </section>
            )
          : null}
      </div>
    </>
  );
}
