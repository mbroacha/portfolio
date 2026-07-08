import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface PageContainerProps {
  rail?: ReactNode;
  children: ReactNode;
  className?: string;
  railClassName?: string;
  mainClassName?: string;
  stickyRailOnDesktop?: boolean;
  collapsibleRailOnMobile?: boolean;
  mobileRailLabel?: string;
  fullBleed?: boolean;
}

export const PageContainer = ({
  rail,
  children,
  className,
  railClassName,
  mainClassName,
  stickyRailOnDesktop = false,
  collapsibleRailOnMobile = false,
  mobileRailLabel = "Page details",
  fullBleed = false,
}: PageContainerProps) => (
  <div
    className={cn(
      fullBleed ? "w-full" : "page-gutter mx-auto w-full max-w-content py-10 sm:py-12 lg:py-16",
    )}
  >
    {rail && collapsibleRailOnMobile ? (
      <details className="mb-8 rounded-md border border-hedge bg-fern p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-medium text-bone">{mobileRailLabel}</summary>
        <div className="mt-4">{rail}</div>
      </details>
    ) : null}

    <div className={cn(rail ? "grid gap-8 lg:grid-cols-[var(--max-width-rail)_minmax(0,1fr)]" : "", className)}>
      {rail ? (
        <aside
          className={cn("hidden lg:block", stickyRailOnDesktop ? "lg:sticky lg:top-8 lg:self-start" : "", railClassName)}
        >
          {rail}
        </aside>
      ) : null}
      <main className={mainClassName}>{children}</main>
    </div>
  </div>
);
