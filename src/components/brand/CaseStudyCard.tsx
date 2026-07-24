import { Link } from "react-router-dom";
import { Eyebrow } from "./Eyebrow";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { cn } from "../../lib/cn";

interface CaseStudyCardProps {
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  imageLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  mediaHeight?: number;
  className?: string;
}

/** Case-study card: fern surface, hedge border, eyebrow → title → description. */
export const CaseStudyCard = ({
  eyebrow,
  title,
  description,
  to,
  imageLabel = "[ product shot ]",
  imageSrc,
  imageAlt = "",
  mediaHeight = 260,
  className,
}: CaseStudyCardProps) => (
  <Link
    to={to}
    className={cn(
      "gh-card gh-card--interactive group flex flex-col overflow-hidden no-underline",
      className,
    )}
  >
    {imageSrc ? (
      <div className="overflow-hidden border-b border-hedge" style={{ height: mediaHeight }}>
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    ) : (
      <ImagePlaceholder label={imageLabel} height={mediaHeight} />
    )}
    <div className="flex flex-col gap-2.5 px-[26px] pb-7 pt-[26px]">
      <Eyebrow className="!text-[10px] !tracking-[0.14em]">{eyebrow}</Eyebrow>
      <h3 className="gh-card__title type-title--card">{title}</h3>
      <p className="text-[13.5px] leading-[1.55] text-sage">{description}</p>
    </div>
  </Link>
);

/** @deprecated Prefer `CaseStudyCard` */
export const CaseCard = CaseStudyCard;
