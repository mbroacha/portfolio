import { useSearchParams } from "react-router-dom";

/**
 * The lens: who the reader says they are, held in the URL.
 *
 * `/` is the prompt. `/?lens=hiring` is the answered page.
 *
 * Keeping it in the URL rather than in state or storage is what makes the
 * prompt safe. Anyone arriving at a lensed link never sees the prompt, they see
 * exactly what the person who sent it saw, and the back button works. Referral
 * traffic is the most valuable traffic a portfolio gets, and it is the thing
 * every self-rearranging site breaks.
 *
 * Case studies are never lensed. The argument runs in one order for everyone.
 */

export const LENSES = ["hiring", "engineering", "browsing"] as const;
export type Lens = (typeof LENSES)[number];

export interface LensOption {
  id: Lens;
  /** What the reader clicks. Their words, not a category name. */
  label: string;
  /** Shown once a lens is on, so the reordering is never a trick. */
  applied: string;
  /** Replaces the sidebar eyebrow. */
  eyebrow: string;
  /** One sentence that leads the bio. */
  lead: string;
  /** Work list order, by id. Anything omitted is dropped from the list. */
  order: string[];
}

export const LENS_OPTIONS: LensOption[] = [
  {
    id: "hiring",
    label: "I'm hiring a product designer",
    applied: "Ordered by scope and ownership.",
    eyebrow: "SOLE DESIGNER, SIX HARD DOMAINS",
    lead: "I get fluent in hard domains fast, and I have been the entire design function for three years.",
    order: ["sysgit", "beacon", "originality", "gradescope"],
  },
  {
    id: "engineering",
    label: "I work in engineering",
    applied: "Code and practice first.",
    eyebrow: "DESIGNER WHO SHIPS THE CODE",
    lead: "I prototype in code and ship my own front-end PRs, through the same review everyone else goes through.",
    order: ["sysgit", "how-i-work", "originality", "beacon", "gradescope"],
  },
  {
    id: "browsing",
    label: "Just looking",
    applied: "Artifacts first.",
    eyebrow: "CRAFT FOR HARD TECH",
    lead: "Interfaces for domains where being wrong is expensive.",
    order: ["originality", "sysgit", "beacon", "gradescope"],
  },
];

/**
 * Default order when nobody has declared anything.
 *
 * Sysgit leads. It is the only project where Morgan was the entire design
 * function, it carries the strongest artifacts, and a reader who bounces after
 * one entry should have seen that one.
 */
export const DEFAULT_ORDER = ["sysgit", "originality", "beacon", "gradescope"];

export function useLens(): {
  lens: LensOption | null;
  order: string[];
  set: (id: Lens) => void;
  clear: () => void;
} {
  const [params, setParams] = useSearchParams();
  const raw = params.get("lens");
  const lens = LENS_OPTIONS.find((o) => o.id === raw) ?? null;

  return {
    lens,
    order: lens?.order ?? DEFAULT_ORDER,
    set: (id) => setParams({ lens: id }),
    clear: () => setParams({}),
  };
}
