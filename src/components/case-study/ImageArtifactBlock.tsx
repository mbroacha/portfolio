interface ImageArtifactBlockProps {
  src: string;
  alt: string;
  caption: string;
  washed?: boolean;
}

export const ImageArtifactBlock = ({ src, alt, caption, washed = true }: ImageArtifactBlockProps) => (
  <figure className="group space-y-4">
    <div className="content-module overflow-hidden p-4 md:p-6">
      <img
        className={`h-auto w-full transition-[filter] duration-300 ease-out ${
          washed ? "brightness-110 contrast-95 saturate-75 group-hover:brightness-105" : ""
        }`}
        src={src}
        alt={alt}
        loading="lazy"
      />
    </div>
    <figcaption className="type-caption transition-colors group-hover:text-ink/80">{caption}</figcaption>
  </figure>
);
