interface PullQuoteProps {
  quote: string;
  attribution: string;
}

export const PullQuote = ({ quote, attribution }: PullQuoteProps) => (
  <blockquote className="space-y-4">
    <p className="pull-quote max-w-prose">"{quote}"</p>
    {attribution ? <cite className="type-mono block not-italic text-caption">{attribution}</cite> : null}
  </blockquote>
);
