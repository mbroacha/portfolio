import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/cn";

export type SubmissionRow = {
  filename: string;
  assignment: string;
  classLabel: string;
  similarity: number;
  submissionDate: Date;
};

const SAMPLE_ROWS: SubmissionRow[] = [
  {
    filename: "Old Man and the Sea.docx",
    assignment: "Challenging Narrator Essay",
    classLabel: "ENG1405 Western Foundations",
    similarity: 27,
    submissionDate: new Date("2020-10-29T23:58:00"),
  },
  {
    filename: "ENG210_final_diary.docx",
    assignment: "Diary Studies",
    classLabel: "ENG210 Comparative Literature",
    similarity: 43,
    submissionDate: new Date("2020-10-11T12:30:00"),
  },
  {
    filename: "Income_and_wealth_final.docx",
    assignment: "Macroeconomics Final",
    classLabel: "ECON1200 Intermediate Macroeconomom…",
    similarity: 13,
    submissionDate: new Date("2020-10-10T15:45:00"),
  },
  {
    filename: "Non-Euclidean Geometry in Karamazov.pdf",
    assignment: "Modern Comparison Essay",
    classLabel: "PHIL2040 Topics in Russian Literature",
    similarity: 51,
    submissionDate: new Date("2020-10-08T09:12:00"),
  },
  {
    filename: "draft_v3_lab_report.docx",
    assignment: "Chemistry Lab Portfolio",
    classLabel: "CHEM1101 General Chemistry I",
    similarity: 29,
    submissionDate: new Date("2020-10-05T18:22:00"),
  },
  {
    filename: "reflection_short.docx",
    assignment: "Weekly Reflection",
    classLabel: "SOC1010 Introduction to Sociology",
    similarity: 6,
    submissionDate: new Date("2020-10-02T08:05:00"),
  },
  {
    filename: "outline_notes.pdf",
    assignment: "Research Methods Outline",
    classLabel: "PSYC2300 Research Methods",
    similarity: 4,
    submissionDate: new Date("2020-09-28T14:40:00"),
  },
  {
    filename: "cover_sheet_only.docx",
    assignment: "Term Paper Cover Sheet",
    classLabel: "ENG1405 Western Foundations",
    similarity: 0,
    submissionDate: new Date("2020-09-25T16:10:00"),
  },
];

type SortKey = keyof Pick<SubmissionRow, "filename" | "assignment" | "classLabel" | "similarity" | "submissionDate">;

const COL_MIN_PCT = 9;

const INITIAL_WIDTHS_PCT = [20, 21, 26, 17, 16] as const;

function formatSubmissionDate(d: Date, compact = false): string {
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  let h = d.getHours();
  const minutes = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  const minStr = minutes.toString().padStart(2, "0");
  if (compact) {
    return `${month} ${day}, ${h}:${minStr} ${ampm}`;
  }
  const year = d.getFullYear();
  return `${month} ${day}, ${year} ${h}:${minStr} ${ampm}`;
}

function SortChevron({ direction }: { direction: "asc" | "desc" }) {
  return (
    <svg
      className="ml-1 inline-block shrink-0 text-[#5f6368]"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "desc" ? (
        <path d="M6 9l6 6 6-6" />
      ) : (
        <path d="M18 15l-6-6-6 6" />
      )}
    </svg>
  );
}

function SimilarityCell({ value }: { value: number }) {
  const warm = value >= 25;
  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="h-2 min-w-[4.5rem] max-w-[7rem] flex-1 rounded-full bg-[#e8eaed]">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-150",
            value === 0 ? "bg-transparent" : warm ? "bg-[#f9ab00]" : "bg-[#34a853]",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="whitespace-nowrap tabular-nums text-[13px] leading-none text-[#3c4043]">{value}%</span>
    </div>
  );
}

export function SubmissionsReportTable() {
  const tableShellRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const widthsPctRef = useRef<number[]>([...INITIAL_WIDTHS_PCT]);
  const [widthsPct, setWidthsPct] = useState<number[]>(() => [...INITIAL_WIDTHS_PCT]);
  const [compactDate, setCompactDate] = useState(false);
  widthsPctRef.current = widthsPct;

  const [sortKey, setSortKey] = useState<SortKey>("submissionDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sortedRows = useMemo(() => {
    const rows = [...SAMPLE_ROWS];
    const dir = sortDir === "asc" ? 1 : -1;
    rows.sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "similarity":
          cmp = a.similarity - b.similarity;
          break;
        case "submissionDate":
          cmp = a.submissionDate.getTime() - b.submissionDate.getTime();
          break;
        default:
          cmp = String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, { sensitivity: "base" });
      }
      return cmp * dir;
    });
    return rows;
  }, [sortDir, sortKey]);

  const beginResize = useCallback((columnIndex: number, startClientX: number) => {
    const start = [...widthsPctRef.current];
    const i = columnIndex;
    const j = i + 1;
    const pairSum = start[i] + start[j];

    const move = (e: MouseEvent) => {
      const el = tableRef.current;
      if (!el) return;
      const tableW = el.getBoundingClientRect().width;
      if (tableW <= 0) return;
      const deltaPct = ((e.clientX - startClientX) / tableW) * 100;
      let nextI = start[i] + deltaPct;
      nextI = Math.min(pairSum - COL_MIN_PCT, Math.max(COL_MIN_PCT, nextI));
      const nextJ = pairSum - nextI;
      const next = [...start];
      next[i] = nextI;
      next[j] = nextJ;
      setWidthsPct(next);
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }, []);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "submissionDate" ? "desc" : "asc");
    }
  };

  const headers: { key: SortKey; label: string; align: "left" | "right" }[] = [
    { key: "filename", label: "Filename", align: "left" },
    { key: "assignment", label: "Assignment", align: "left" },
    { key: "classLabel", label: "Class", align: "left" },
    { key: "similarity", label: "Similarity", align: "left" },
    { key: "submissionDate", label: "Submission Date", align: "left" },
  ];

  useEffect(() => {
    const node = tableShellRef.current;
    if (!node) return;

    const updateCompact = () => {
      setCompactDate(node.getBoundingClientRect().width < 760);
    };
    updateCompact();

    const observer = new ResizeObserver(updateCompact);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="rounded-[20px] bg-white px-5 pb-4 pt-4 shadow-[0_10px_28px_-8px_rgba(60,64,67,0.22)] ring-1 ring-black/[0.06]"
      style={{ fontFamily: '"Roboto", system-ui, sans-serif' }}
    >
      <div className="mb-3 text-[15px] font-medium tracking-tight text-[#202124]">Submissions Report</div>
      <div ref={tableShellRef} className="-mx-1 overflow-x-auto px-1">
        <table ref={tableRef} className="w-full table-fixed border-collapse text-left text-[13px] text-[#3c4043]">
          <colgroup>
            {widthsPct.map((pct, i) => (
              <col key={i} style={{ width: `${pct}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr className="border-b border-[#ededed]">
              {headers.map((h, i) => {
                const active = sortKey === h.key;
                return (
                  <th
                    key={h.key}
                    scope="col"
                    className={cn(
                      "relative select-none py-3 pr-2 font-medium text-[#202124] first:pl-1 last:pr-1",
                      h.align === "right" ? "text-right" : "text-left",
                    )}
                    aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                  >
                    <button
                      type="button"
                      className={cn(
                        "inline-flex max-w-full items-center gap-0.5 rounded px-0.5 hover:bg-black/[0.04]",
                        h.align === "right" ? "ml-auto justify-end text-right" : "text-left",
                      )}
                      onClick={() => toggleSort(h.key)}
                    >
                      <span className="truncate">{h.label}</span>
                      {active ? <SortChevron direction={sortDir} /> : null}
                    </button>
                    {i < headers.length - 1 ? (
                      <button
                        type="button"
                        aria-hidden
                        tabIndex={-1}
                        title="Resize column"
                        className="absolute right-0 top-1/2 z-10 h-[70%] w-3 -translate-y-1/2 translate-x-1/2 cursor-col-resize border-0 bg-transparent p-0 hover:bg-[#1a73e8]/10"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          beginResize(i, e.clientX);
                        }}
                      />
                    ) : null}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr
                key={`${row.filename}-${row.submissionDate.toISOString()}`}
                className="border-b border-[#ededed] transition-colors duration-100 hover:bg-[#f1f3f4]"
              >
                <td className="truncate py-3.5 pl-1 pr-2 align-middle" title={row.filename}>
                  {row.filename}
                </td>
                <td className="truncate py-3.5 pr-2 align-middle" title={row.assignment}>
                  {row.assignment}
                </td>
                <td className="truncate py-3.5 pr-2 align-middle" title={row.classLabel}>
                  {row.classLabel}
                </td>
                <td className="py-3.5 pr-2 align-middle">
                  <SimilarityCell value={row.similarity} />
                </td>
                <td className="truncate py-3.5 pr-1 text-left align-middle tabular-nums text-[#3c4043]">
                  {formatSubmissionDate(row.submissionDate, compactDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
