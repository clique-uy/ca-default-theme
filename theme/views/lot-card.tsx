import Link from "next/link";
import type { LotCardThemeProps } from "@/components/theme/types";

export default function LotCard({ lot, slots }: LotCardThemeProps) {
  return (
    <article className="lot auction-lot">
      <Link
        aria-label={`Ver ${lot.name}`}
        className="lot-card-hit-area"
        href={lot.detailsHref}
        prefetch
      >
        <span className="sr-only">Ver detalle de {lot.name}</span>
      </Link>
      {slots.wishlistControl}
      <div
        className={`lot-photo coin-${lot.fallbackVariant}`}
        style={lot.imageUrl
          ? { backgroundImage: `url(${JSON.stringify(lot.imageUrl)})` }
          : undefined}
      />
      <div className="lot-info">
        <div className="lot-status">{slots.countdown}</div>
        <h3>{lot.name}</h3>
        <p className="lot-auction-name">{lot.auction.title}</p>
        {lot.bid ? <div className="price">{lot.bid.currentAmountLabel}</div> : null}
        {lot.bid?.youAreWinning ? (
          <p className="winning">Vas ganando este lote.</p>
        ) : null}
        {lot.bid?.youWon ? (
          <p className="winning">
            Terminaste con la oferta más alta. El resultado es provisional
            hasta la adjudicación del rematador.
          </p>
        ) : null}
        {lot.legacySale ? (
          <small className="sale-method-note">
            Modalidad heredada: transacciones en línea no disponibles
          </small>
        ) : null}
        {slots.bidControl}
      </div>
    </article>
  );
}
