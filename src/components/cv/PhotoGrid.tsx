export interface Photo {
  /** Path under public/. */
  src: string;
  /** Describes the image. Not a category label. */
  alt: string;
}

/**
 * Square 2x2 photo grid, for answers where a picture is the answer.
 *
 * Sized for the case study rail: 33% of a 90rem page is 475px, less 32px
 * padding each side leaves 411px, so two across with a 12px gap is ~200px per
 * chip. Below `md` the rail stacks and the grid grows with it.
 *
 * Photos stay in full color on purpose. The rest of the site is a grayscale
 * document, which is exactly what makes this land.
 */
export const PhotoGrid = ({ photos }: { photos: Photo[] }) => (
  <div className="mt-3 grid grid-cols-2 gap-3">
    {photos.map((p) => (
      <div
        key={p.src}
        className="aspect-square overflow-hidden border border-[color:var(--edge)]"
        style={{ backgroundColor: "var(--ink-600)" }}
      >
        <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
    ))}
  </div>
);
