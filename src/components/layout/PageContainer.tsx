import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface PageContainerProps {
  rail?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ rail, children, className }: PageContainerProps) => (
  <div className="mx-auto min-h-screen w-full max-w-[var(--layout-page-max)] px-6 py-10 md:px-10 md:py-14">
    <div className={cn("grid gap-10 md:grid-cols-[var(--layout-rail-width)_minmax(0,1fr)]", className)}>
      <aside className="hidden md:block">{rail}</aside>
      <main>{children}</main>
    </div>
  </div>
);
