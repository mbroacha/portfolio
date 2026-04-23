import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export const Display = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn("type-title--hero max-w-content", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("type-title--card", className)} {...props} />
);

export const SectionTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("type-section mb-4", className)} {...props} />
);

export const BodyText = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("type-body", className)} {...props} />
);

export const BodyLead = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("type-body type-body--lead", className)} {...props} />
);

export const Caption = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("type-caption", className)} {...props} />
);

/** @deprecated Prefer `Caption` — alias for migration */
export const MetaText = Caption;
