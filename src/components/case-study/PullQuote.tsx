interface PullQuoteProps {
  quote: string;
  attribution: string;
  editorial?: boolean;
}

export const PullQuote = ({ quote, attribution, editorial = true }: PullQuoteProps) => (
  <blockquote className="group space-y-4 border-l border-line pl-6">
    <p
      className={`max-w-prose font-serif leading-snug text-ink/90 ${
        editorial ? "text-[clamp(1.9rem,3.2vw,2.35rem)]" : "text-[1.75rem]"
      }`}
    >
      “{quote}”
    </p>
    <cite className="block text-xs uppercase tracking-[0.12em] text-subtext not-italic transition-colors group-hover:text-ink/80">
      {attribution}
    </cite>
  </blockquote>
);
