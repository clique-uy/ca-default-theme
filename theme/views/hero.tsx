import Link from "next/link";
import type { MarketHeroThemeProps } from "@/components/theme/types";

export default function Hero({ auction }: MarketHeroThemeProps) {
  return (
    <Link
      aria-label={`Ver subasta ${auction.title}`}
      className={`hero ${auction.imageUrl ? "" : "image-birds"}`}
      href={auction.detailsHref}
      style={auction.imageUrl
        ? { backgroundImage: `url(${JSON.stringify(auction.imageUrl)})` }
        : undefined}
    >
      <div className="hero-copy">
        <h1 className="text-white" >{auction.title}</h1>
        <p>{auction.subtitle}</p>
      </div>
    </Link>
  );
}
