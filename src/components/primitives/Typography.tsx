import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export const Display = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn("type-display max-w-content", className)} {...props} />
);

export const SectionTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("type-section mb-10", className)} {...props} />
);

export const BodyText = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("type-body", className)} {...props} />
);

export const MetaText = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("type-meta", className)} {...props} />
);

export const SerifLead = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("font-serif text-xl leading-relaxed text-ink/90", className)} {...props} />
);
