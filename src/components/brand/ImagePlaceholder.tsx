interface ImagePlaceholderProps {
  label: string;
  className?: string;
  height?: number | string;
}

export const ImagePlaceholder = ({ label, className, height = 260 }: ImagePlaceholderProps) => (
  <div className={className} style={{ height }}>
    <div className="image-placeholder h-full w-full">
      <span className="image-placeholder__label">{label}</span>
    </div>
  </div>
);
