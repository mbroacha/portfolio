import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface PageContainerProps {
  rail?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ rail, children, className }: PageContainerProps) => (
  <div className="mx-auto min-h-screen w-full max-w-page px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
    <div className={cn(rail ? "grid gap-8 lg:grid-cols-[var(--max-width-rail)_minmax(0,1fr)]" : "", className)}>
      {rail ? <aside className="hidden lg:block">{rail}</aside> : null}
      <main>{children}</main>
    </div>
  </div>
);
