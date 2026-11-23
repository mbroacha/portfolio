/**
 * The case studies, in reading order.
 *
 * One list, so the homepage order, each case study's previous and next links,
 * and the rail's "n of 4" can never disagree. Before this, each page hand-wrote
 * its own neighbours and Originality's Next skipped Gradescope entirely.
 */
export interface SeriesEntry {
  id: "sysgit" | "beacon" | "originality" | "gradescope";
  title: string;
  to: string;
}

export const SERIES: SeriesEntry[] = [
  { id: "sysgit", title: "Sysgit", to: "/case-study/sysgit" },
  { id: "beacon", title: "Beacon", to: "/case-study/beacon" },
  { id: "originality", title: "Originality", to: "/case-study/originality" },
  { id: "gradescope", title: "Gradescope Mobile", to: "/case-study/gradescope-mobile" },
];

/** An entry's neighbours in reading order. */
export const seriesNeighbours = (id: SeriesEntry["id"]) => {
  const i = SERIES.findIndex((e) => e.id === id);
  return { prev: SERIES[i - 1], next: SERIES[i + 1] };
};

/** The entry a path belongs to, if it is a case study. */
export const seriesEntryFor = (pathname: string) => SERIES.find((e) => pathname.startsWith(e.to));
