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
}: PageContainerProps) => (
  <div className="mx-auto min-h-screen w-full max-w-page px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
    {rail && collapsibleRailOnMobile ? (
      <details className="mb-8 rounded-md border border-line bg-panel p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-medium text-ink">{mobileRailLabel}</summary>
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
