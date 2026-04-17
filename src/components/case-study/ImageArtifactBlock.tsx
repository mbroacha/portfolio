interface ImageArtifactBlockProps {
  src: string;
  alt: string;
  caption: string;
}

export const ImageArtifactBlock = ({ src, alt, caption }: ImageArtifactBlockProps) => (
  <figure className="space-y-3">
    <div className="overflow-hidden border border-line p-2">
      <img className="h-auto w-full" src={src} alt={alt} loading="lazy" />
    </div>
    <figcaption className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">{caption}</figcaption>
  </figure>
);
