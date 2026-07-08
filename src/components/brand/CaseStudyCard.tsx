import { Link } from "react-router-dom";
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
  className?: string;
}

export const CaseStudyCard = ({
  eyebrow,
  title,
  description,
  to,
  imageLabel = "[ product shot ]",
  imageSrc,
  imageAlt = "",
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
      <div className="h-[260px] overflow-hidden border-b border-hedge">
        <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
      </div>
    ) : (
      <ImagePlaceholder label={imageLabel} />
    )}
    <div className="flex flex-col gap-2.5 px-[26px] py-7">
      <span className="type-mono type-mono--ember">{eyebrow}</span>
      <h3 className="gh-card__title type-title--card">{title}</h3>
      <p className="text-[0.84375rem] leading-[1.55] text-sage">{description}</p>
    </div>
  </Link>
);
