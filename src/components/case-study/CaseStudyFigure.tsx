import { cn } from "../../lib/cn";

interface CaseStudyFigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export const CaseStudyFigure = ({ src, alt, caption, className }: CaseStudyFigureProps) => (
  <figure className={cn("flex flex-col gap-4", className)}>
    <div className="overflow-hidden rounded-md border border-hedge">
      <img src={src} alt={alt} className="h-auto w-full" loading="lazy" />
    </div>
    {caption ? <figcaption className="type-body max-w-prose text-sm text-caption">{caption}</figcaption> : null}
  </figure>
);
