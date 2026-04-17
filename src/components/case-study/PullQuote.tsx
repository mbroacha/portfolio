interface PullQuoteProps {
  quote: string;
  attribution: string;
}

export const PullQuote = ({ quote, attribution }: PullQuoteProps) => (
  <blockquote className="space-y-4 border-l border-line pl-6">
    <p className="max-w-prose font-serif text-[1.75rem] leading-snug text-ink/90">“{quote}”</p>
    <cite className="block text-xs uppercase tracking-[0.12em] text-subtext not-italic">{attribution}</cite>
  </blockquote>
);
