interface ImageArtifactBlockProps {
  src: string;
  alt: string;
  caption: string;
  tone?: "oxide" | "steel";
}

export const ImageArtifactBlock = ({ src, alt, caption, tone = "oxide" }: ImageArtifactBlockProps) => (
  <figure className="space-y-3">
    <div
      className={`signal-bleed overflow-hidden rounded-md border bg-panel p-2 shadow-artifact ${
        tone === "oxide" ? "border-accent/35" : "border-steel/35"
      }`}
    >
      <img className="h-auto w-full rounded-sm grayscale-[8%]" src={src} alt={alt} loading="lazy" />
    </div>
    <figcaption className="type-meta text-subtext">{caption}</figcaption>
  </figure>
);
