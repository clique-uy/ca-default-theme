"use client";

import { useState } from "react";
import Link from "next/link";
import type { LotDetailThemeProps } from "@/components/theme/types";

type DetailTab = "details" | "history" | "info";

export default function LotDetail({
  loading,
  loadError,
  lot,
  slots,
}: LotDetailThemeProps) {
  const [tab, setTab] = useState<DetailTab>("details");

  if (loading) {
    return (
      <div className="lot-detail-shell lot-detail-skeleton" aria-busy="true" role="status">
        <span className="sr-only">Cargando lote…</span>

        <div className="lot-detail-skeleton-bar lot-detail-skeleton-breadcrumb" />
        <div className="lot-detail-skeleton-status">
          <div className="lot-detail-skeleton-bar" />
          <div className="lot-detail-skeleton-bar" />
        </div>

        <section className="lot-detail-primary" aria-hidden="true">
          <div className="lot-detail-gallery">
            <div className="lot-detail-image lot-detail-skeleton-block" />
          </div>

          <div className="lot-detail-copy">
            <div className="lot-detail-skeleton-bar lot-detail-skeleton-heading" />
            <div className="lot-detail-skeleton-bar lot-detail-skeleton-meta" />

            <div className="lot-detail-bid-panel">
              <div className="lot-detail-skeleton-bar lot-detail-skeleton-label" />
              <div className="lot-detail-skeleton-bar lot-detail-skeleton-price" />
              <div className="lot-detail-skeleton-bar lot-detail-skeleton-input" />
              <div className="lot-detail-skeleton-bar lot-detail-skeleton-button" />
            </div>

            <div className="lot-detail-trust">
              <div className="lot-detail-skeleton-bar lot-detail-skeleton-trust-title" />
              <div className="lot-detail-skeleton-bar lot-detail-skeleton-line" />
              <div className="lot-detail-skeleton-bar lot-detail-skeleton-line is-short" />
            </div>
          </div>
        </section>

        <div className="lot-detail-skeleton-tabs" aria-hidden="true">
          <div className="lot-detail-skeleton-bar" />
          <div className="lot-detail-skeleton-bar" />
          <div className="lot-detail-skeleton-bar" />
        </div>
      </div>
    );
  }

  if (loadError || !lot) {
    return (
      <div className="lot-detail-shell">
        <div className="market-state error" role="alert">
          {loadError || "No pudimos cargar este lote. Puede que ya no esté disponible."}
        </div>
      </div>
    );
  }

  const startLabel = lot.info.rows.find((row) => row.label === "Inicio")?.value;
  const bidCount = lot.stats?.find((stat) => stat.label === "Ofertas")?.value;
  const nextBid = lot.stats?.find((stat) => stat.label === "Próxima oferta")?.value;

  return (
    <div className="lot-detail-shell">
      <nav className="lot-detail-breadcrumb" aria-label="Navegación">
        <Link href={lot.auction.backHref}>{lot.auction.backLabel}</Link>
        <span className="lot-detail-breadcrumb-sep" aria-hidden="true">|</span>
        <span>{lot.auction.title}</span>
      </nav>

      <div className="lot-detail-status-bar">
        <p className="lot-detail-status-timing">
          {lot.auction.status === "scheduled" && startLabel
            ? `La subasta comienza: ${startLabel}`
            : lot.auction.status === "live"
              ? "Subasta en curso"
              : lot.auction.statusLabel}
          <span className="lot-detail-status-countdown">{slots.countdown}</span>
        </p>
        <p className="lot-detail-status-lot">
          Viendo lote:{" "}
          <span className="lot-detail-lot-id">{lot.lot.id}</span>
        </p>
      </div>

      {lot.hasLivestream ? (
        <aside className="lot-live-player" aria-label="Transmisión de la subasta">
          {slots.livestream}
        </aside>
      ) : null}

      <section className="lot-detail-primary">
        <div className="lot-detail-gallery">
          <div
            className="lot-detail-image"
            role="img"
            aria-label={lot.lot.name}
            style={lot.lot.imageUrl
              ? { backgroundImage: `url(${JSON.stringify(lot.lot.imageUrl)})` }
              : undefined}
          />
        </div>

        <div className="lot-detail-copy">
          <h1>{lot.lot.name}</h1>

          <div className="lot-detail-meta">
            <span>{lot.saleMethods}</span>
            {startLabel ? <span>{startLabel}</span> : null}
          </div>

          <div className="lot-detail-bid-panel">
            <div className="lot-detail-bid-panel-head">
              <span>
                {lot.auction.status === "scheduled" ? "Precio de salida" : "Precio actual"}
              </span>
              <span className="lot-detail-secure">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M7 10V8a5 5 0 0 1 10 0v2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
                Seguro
              </span>
            </div>

            {lot.currentAmountLabel ? (
              <div className="lot-detail-price">{lot.currentAmountLabel}</div>
            ) : null}

            {nextBid ? (
              <p className="lot-detail-next-bid">Próxima oferta: {nextBid}</p>
            ) : null}

            {lot.youAreWinning ? <p className="winning">{lot.youAreWinningLabel}</p> : null}
            {lot.youWon ? <p className="winning">{lot.youWonLabel}</p> : null}

            {slots.bidControl}

            {bidCount ? (
              <p className="lot-detail-watchers">
                {bidCount} {bidCount === "1" ? "oferta registrada" : "ofertas registradas"}
              </p>
            ) : null}
          </div>

          <aside className="lot-detail-trust">
            <h2>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6l-8-3Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="m9 12 2 2 4-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
              Protección Clique
            </h2>
            <ul>
              <li>Casas de subastas verificadas</li>
              <li>Ofertas online seguras</li>
              <li>Historial de pujas transparente</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="lot-detail-tabs" aria-label="Información del lote">
        <div className="lot-detail-tablist" role="tablist">
          {(
            [
              ["details", "Detalles del lote"],
              ["history", lot.history.title],
              ["info", lot.info.title],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`lot-tab-${id}`}
              aria-selected={tab === id}
              aria-controls={`lot-panel-${id}`}
              className={tab === id ? "is-active" : undefined}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div
          className="lot-detail-tabpanel"
          role="tabpanel"
          id="lot-panel-details"
          aria-labelledby="lot-tab-details"
          hidden={tab !== "details"}
        >
          <h2 className="lot-detail-panel-heading">Descripción</h2>
          {lot.auction.description ? (
            <p className="lot-detail-description">{lot.auction.description}</p>
          ) : (
            <p className="lot-detail-description is-muted">
              Sin descripción adicional para este lote.
            </p>
          )}
        </div>

        <div
          className="lot-detail-tabpanel"
          role="tabpanel"
          id="lot-panel-history"
          aria-labelledby="lot-tab-history"
          hidden={tab !== "history"}
        >
          <header className="lot-history-header">
            <h2 className="lot-detail-panel-heading">{lot.history.title}</h2>
            <span>{lot.history.countLabel}</span>
          </header>
          {lot.history.biddingEnabled
            ? lot.history.items.length > 0
              ? (
                <ol className="lot-history-list">
                  {lot.history.items.map((bid) => (
                    <li key={bid.id}>
                      <span className="lot-history-position">{bid.positionLabel}</span>
                      <strong>{bid.amountLabel}</strong>
                      <time dateTime={bid.placedAt}>{bid.placedAtLabel}</time>
                      {bid.highest ? (
                        <span className="lot-history-highest">Más alta</span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              )
              : <p className="lot-history-empty">{lot.history.emptyLabel}</p>
            : <p className="lot-history-empty">{lot.history.unavailableLabel}</p>}
        </div>

        <div
          className="lot-detail-tabpanel"
          role="tabpanel"
          id="lot-panel-info"
          aria-labelledby="lot-tab-info"
          hidden={tab !== "info"}
        >
          <h2 className="lot-detail-panel-heading">{lot.info.title}</h2>
          <dl className="lot-detail-info-list">
            {lot.info.rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
