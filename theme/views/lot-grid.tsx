import type { LotGridThemeProps } from "@/components/theme/types";
import LotCard from "@/components/theme/views/lot-card";

export default function LotGrid({
  context,
  title,
  meta,
  items,
}: LotGridThemeProps) {
  const cards = items.map((item) => (
    <LotCard
      context={context}
      key={`${item.lot.auction.id}:${item.lot.id}`}
      lot={item.lot}
      slots={item.slots}
    />
  ));

  if (context === "auction") {
    return (
      <section className="detail-lots-section">
        <header className="detail-lots-heading">
          <h2>{title}</h2>
          {meta ? <span>{meta}</span> : null}
        </header>
        <div className="lot-grid auction-grid">{cards}</div>
      </section>
    );
  }

  if (context === "wishlist") {
    return (
      <>
        <header className="wishlist-results-heading">
          <h2>{title}</h2>
          {meta ? <span>{meta}</span> : null}
        </header>
        <div className="lot-grid auction-grid">{cards}</div>
      </>
    );
  }

  return (
    <section className="lots-section">
      <h2 className="">{title}</h2>
      <div className="lot-grid auction-grid">{cards}</div>
    </section>
  );
}
