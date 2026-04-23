import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ContentModuleProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ContentModule = ({ className, children, ...props }: ContentModuleProps) => (
  <div className={cn("content-module p-8 md:p-10 lg:p-12", className)} {...props}>
    {children}
  </div>
);
