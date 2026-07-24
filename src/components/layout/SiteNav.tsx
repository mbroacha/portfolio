import { Link, useLocation } from "react-router-dom";
import { Lockup } from "../brand/Lockup";
import { Button } from "../brand/Button";
import { cn } from "../../lib/cn";

interface SiteNavProps {
  className?: string;
}

export const SiteNav = ({ className }: SiteNavProps) => {
  const { pathname } = useLocation();
  const isCaseStudy = pathname.startsWith("/case-study");

  return (
    <header
      className={cn(
        "flex items-center justify-between border-b border-hedge px-6 py-6 sm:px-10 lg:px-gutter",
        className,
      )}
    >
      <Link to="/" className="no-underline hover:opacity-90">
        <Lockup />
      </Link>

      <nav className="flex items-center gap-6 sm:gap-9">
        {isCaseStudy ? (
          <Link to="/#work" className="type-mono text-glow no-underline hover:text-bone">
            ← All work
          </Link>
        ) : (
          <>
            <a href="/#work" className="type-mono hidden text-sage no-underline hover:text-bone sm:block">
              Work
            </a>
            <a href="/#about" className="type-mono hidden text-sage no-underline hover:text-bone sm:block">
              About
            </a>
          </>
        )}
        <Button href="mailto:hello@morganbroacha.com" variant="primary" className="!px-[18px] !py-2.5">
          Contact
        </Button>
      </nav>
    </header>
  );
};
