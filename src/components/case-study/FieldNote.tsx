import type { ReactNode } from "react";

interface FieldNoteProps {
  children: ReactNode;
}

/** Editorial annotation — styles live in `index.css` (`.field-note`). */
export const FieldNote = ({ children }: FieldNoteProps) => (
  <div className="field-note">
    <p>{children}</p>
  </div>
);
