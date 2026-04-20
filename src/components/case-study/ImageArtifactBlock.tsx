interface ImageArtifactBlockProps {
  src: string;
  alt: string;
  caption: string;
  washed?: boolean;
}

export const ImageArtifactBlock = ({ src, alt, caption, washed = true }: ImageArtifactBlockProps) => (
  <figure className="group space-y-3">
    <div className="overflow-hidden bg-bg p-2 transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
      <img
        className={`h-auto w-full transition-[filter] duration-300 ease-out ${
          washed ? "brightness-110 contrast-95 saturate-75 group-hover:brightness-105" : ""
        }`}
        src={src}
        alt={alt}
        loading="lazy"
      />
    </div>
    <figcaption className="font-mono text-xs uppercase tracking-[0.12em] text-subtext transition-colors group-hover:text-ink/80">
      {caption}
    </figcaption>
  </figure>
);
