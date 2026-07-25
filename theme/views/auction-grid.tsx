import type { AuctionGridThemeProps } from "@/components/theme/types";
import AuctionCard from "@/components/theme/views/auction-card";

export default function AuctionGrid({ title, auctions }: AuctionGridThemeProps) {
  return (
    <section className="process-section">
      <h2 className="">{title}</h2>
      <div className="auction-banners">
        {auctions.map((auction) => (
          <AuctionCard auction={auction} key={auction.id} />
        ))}
      </div>
    </section>
  );
}
