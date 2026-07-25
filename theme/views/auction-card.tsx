import Link from "next/link";
import type { AuctionCardThemeProps } from "@/components/theme/types";

export default function AuctionCard({ auction }: AuctionCardThemeProps) {
  return (
    <Link
      className={`auction-banner banner-fallback-${auction.fallbackIndex % 3}`}
      href={auction.detailsHref}
      prefetch
      style={auction.imageUrl
        ? { backgroundImage: `url(${JSON.stringify(auction.imageUrl)})` }
        : undefined}
    >
      <div>
        <h3 className="text-white">{auction.title}</h3>
        <p>{auction.statusLabel} · {auction.timingLabel}</p>
      </div>
    </Link>
  );
}
