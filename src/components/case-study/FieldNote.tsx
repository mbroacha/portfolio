import type { ReactNode } from "react";

interface FieldNoteProps {
  children: ReactNode;
}

/** Personal margin note — styles live in `index.css` (`.field-note`) for reliable contrast and typography. */
export const FieldNote = ({ children }: FieldNoteProps) => (
  <div className="field-note">
    <p>{children}</p>
  </div>
);
