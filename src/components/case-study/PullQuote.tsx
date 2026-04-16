interface PullQuoteProps {
  quote: string;
  attribution: string;
}

export const PullQuote = ({ quote, attribution }: PullQuoteProps) => (
  <blockquote className="my-6 border-l border-line pl-6">
    <p className="font-serif text-3xl leading-snug text-ink/90">“{quote}”</p>
    <cite className="mt-4 block text-sm uppercase tracking-[0.12em] text-subtext not-italic">{attribution}</cite>
  </blockquote>
);
