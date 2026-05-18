import "@fontsource/lexend-deca/latin-400.css";
import "@fontsource/lexend-deca/latin-600.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import { useState } from "react";
import { cn } from "../../lib/cn";

type IntegrityRow = {
  filename: string;
  keywords: number | null;
  hiddenText: boolean;
  similarity: number;
  quotesPct: number;
  revisions: number;
  editingMinutes: number;
};

const TABLE_ROWS: IntegrityRow[] = [
  {
    filename: "Old Man and the Sea.docx",
    keywords: null,
    hiddenText: true,
    similarity: 27,
    quotesPct: 11,
    revisions: 1,
    editingMinutes: 7,
  },
  {
    filename: "ENG210_final_diary.docx",
    keywords: null,
    hiddenText: false,
    similarity: 43,
    quotesPct: 6,
    revisions: 1,
    editingMinutes: 11,
  },
  {
    filename: "Income_and_wealth_final.docx",
    keywords: 1,
    hiddenText: false,
    similarity: 13,
    quotesPct: 2,
    revisions: 1,
    editingMinutes: 8,
  },
  {
    filename: "Non-Euclidean Geometry in Karamazov.pdf",
    keywords: null,
    hiddenText: false,
    similarity: 0,
    quotesPct: 0,
    revisions: 3,
    editingMinutes: 20,
  },
  {
    filename: "Little Women and Mean Girls.docx",
    keywords: null,
    hiddenText: true,
    similarity: 29,
    quotesPct: 9,
    revisions: 1,
    editingMinutes: 11,
  },
  {
    filename: "ENG210_final_essay.docx",
    keywords: 1,
    hiddenText: false,
    similarity: 4,
    quotesPct: 10,
    revisions: 2,
    editingMinutes: 6,
  },
  {
    filename: "Intro to Proust.docx",
    keywords: null,
    hiddenText: false,
    similarity: 51,
    quotesPct: 16,
    revisions: 6,
    editingMinutes: 0,
  },
  {
    filename: "On Writing Review.pdf",
    keywords: null,
    hiddenText: false,
    similarity: 6,
    quotesPct: 11,
    revisions: 1,
    editingMinutes: 11,
  },
];

/** Chronological series (Aug → Oct), oldest submission first. */
const SERIES = {
  similarity: [6, 51, 4, 29, 0, 13, 43, 27],
  revisions: [1, 6, 2, 1, 3, 1, 1, 1],
  editingTime: [55, 0, 30, 55, 100, 40, 55, 35],
} as const;

type ChartId = keyof typeof SERIES;

const CHARTS: {
  id: ChartId;
  title: string;
  yLabel: string;
  yMax: number;
  yStep: number;
  showScale?: boolean;
}[] = [
  {
    id: "similarity",
    title: "Similarity Scores",
    yLabel: "Similarity Score",
    yMax: 100,
    yStep: 10,
    showScale: true,
  },
  {
    id: "revisions",
    title: "Revisions",
    yLabel: "Revisions",
    yMax: 10,
    yStep: 1,
  },
  {
    id: "editingTime",
    title: "Editing Time",
    yLabel: "Editing Time",
    yMax: 100,
    yStep: 10,
  },
];

function similaritySwatchColor(value: number): string {
  if (value === 0) return "#3b82f6";
  if (value >= 45) return "#f97316";
  if (value >= 25) return "#fbbf24";
  if (value >= 10) return "#86efac";
  return "#22c55e";
}

function DocumentIcon() {
  return (
    <svg
      className="mr-2 inline-block shrink-0 text-[#9ca3af]"
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 0h5.2L13 4.8V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M8 0v4.5H13" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function SimilarityScale() {
  const stops = [
    { top: 0, height: 10, color: "#22c55e" },
    { top: 10, height: 10, color: "#86efac" },
    { top: 20, height: 10, color: "#fde047" },
    { top: 30, height: 20, color: "#fb923c" },
    { top: 50, height: 50, color: "#ef4444" },
  ];
  return (
    <g>
      {stops.map((stop) => (
        <rect
          key={stop.top}
          x={0}
          y={stop.top}
          width={8}
          height={stop.height}
          fill={stop.color}
        />
      ))}
    </g>
  );
}

function MiniLineChart({
  values,
  yMax,
  yStep,
  yLabel,
  title,
  showScale,
  zoomed,
}: {
  values: readonly number[];
  yMax: number;
  yStep: number;
  yLabel: string;
  title: string;
  showScale?: boolean;
  zoomed: boolean;
}) {
  const plotLeft = showScale ? 52 : 40;
  const plotRight = 248;
  const plotTop = 14;
  const plotBottom = 132;
  const plotW = plotRight - plotLeft;
  const plotH = plotBottom - plotTop;

  const xForIndex = (i: number) => plotLeft + (i / (values.length - 1)) * plotW;
  const yForValue = (v: number) => plotBottom - (v / yMax) * plotH;

  const points = values.map((v, i) => ({ x: xForIndex(i), y: yForValue(v) }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");

  const yTicks: number[] = [];
  for (let v = 0; v <= yMax; v += yStep) {
    yTicks.push(v);
  }

  return (
    <svg
      viewBox="0 0 280 168"
      className="h-auto w-full"
      role="img"
      aria-label={`${title} line chart by submission date`}
    >
      {showScale ? (
        <g transform={`translate(24, ${plotTop}) scale(1, ${plotH / 100})`}>
          <SimilarityScale />
        </g>
      ) : null}

      <text
        x={showScale ? 14 : 10}
        y={74}
        transform={`rotate(-90 ${showScale ? 14 : 10} 74)`}
        className="fill-[#6b7280] text-[9px]"
        style={{ fontFamily: '"Roboto", system-ui, sans-serif' }}
      >
        {yLabel}
      </text>

      {yTicks.map((tick) => {
        const y = yForValue(tick);
        return (
          <g key={tick}>
            <line
              x1={plotLeft}
              x2={plotRight}
              y1={y}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={plotLeft - 6}
              y={y + 3}
              textAnchor="end"
              className="fill-[#9ca3af] text-[8px] tabular-nums"
              style={{ fontFamily: '"Roboto", system-ui, sans-serif' }}
            >
              {tick}
            </text>
          </g>
        );
      })}

      <path d={linePath} fill="none" stroke="#4b5563" strokeWidth="1.6" strokeLinejoin="round" />

      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={zoomed ? 5 : 3.4} fill="#ffffff" stroke="#4b5563" strokeWidth="1.4" />
      ))}

      <text
        x={(plotLeft + plotRight) / 2}
        y={150}
        textAnchor="middle"
        className="fill-[#6b7280] text-[9px]"
        style={{ fontFamily: '"Roboto", system-ui, sans-serif' }}
      >
        Submission Date
      </text>
      {(["Aug", "Sep", "Oct"] as const).map((month, i) => (
        <text
          key={month}
          x={plotLeft + (i / 2) * plotW}
          y={162}
          textAnchor="middle"
          className="fill-[#9ca3af] text-[8px]"
          style={{ fontFamily: '"Roboto", system-ui, sans-serif' }}
        >
          {month}
        </text>
      ))}

    </svg>
  );
}

export function EssayIntegrityDashboard() {
  const [hoveredChart, setHoveredChart] = useState<ChartId | null>(null);
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);

  return (
    <div
      className="essay-integrity-dashboard overflow-visible rounded-[12px] bg-[#f7f7f7] ring-1 ring-[#e5e7eb]/80"
      style={{ fontFamily: '"Roboto", system-ui, sans-serif' }}
      onMouseLeave={() => setHoveredChart(null)}
    >
      <div className="relative px-6 pb-5 pt-6">
        <h3 className="text-[24px] leading-tight tracking-[-0.02em] text-[#111827]">
          Essay Integrity
        </h3>
        <p className="mt-2 max-w-[58rem] text-[13px] leading-[1.45] text-[#6b7280]">
          Information in this section may indicate work written by a different author. Look for contract cheating
          keywords, hidden text, extremely high or low similarity scores, and little to no editing.
        </p>

        <div className="relative z-20 mt-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {CHARTS.map((chart) => {
            const zoomed = hoveredChart === chart.id;
            const dimmed = hoveredChart !== null && !zoomed;
            return (
                <article
                  key={chart.id}
                  className={cn(
                    "relative cursor-default rounded-[6px] border border-[#e5e7eb] bg-white px-2 pb-2 pt-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[transform,box-shadow,opacity] duration-300 ease-out will-change-transform",
                    zoomed && "z-30 shadow-[0_12px_32px_-10px_rgba(17,24,39,0.28)]",
                    dimmed && "opacity-[0.72]",
                  )}
                  style={{
                    transform: zoomed ? "scale(1.65)" : dimmed ? "scale(0.94)" : "scale(1)",
                    transformOrigin: "center center",
                  }}
                  onMouseEnter={() => setHoveredChart(chart.id)}
                >
                  <MiniLineChart
                    values={SERIES[chart.id]}
                    yMax={chart.yMax}
                    yStep={chart.yStep}
                    yLabel={chart.yLabel}
                    title={chart.title}
                    showScale={chart.showScale}
                    zoomed={zoomed}
                  />
                  <p className="pb-0.5 text-center text-[11px] font-normal text-[#374151]">{chart.title}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="relative z-0 mt-5 overflow-hidden rounded-[6px] border border-[#e5e7eb] bg-white">
          <table className="w-full border-collapse text-left text-[12px] text-[#374151]">
            <thead>
              <tr className="bg-[#f9fafb] text-[10px] font-medium uppercase tracking-[0.04em] text-[#6b7280]">
                <th className="px-4 py-2.5 font-medium">Filename</th>
                <th className="px-3 py-2.5 font-medium">Keywords</th>
                <th className="px-3 py-2.5 font-medium">Hidden Text</th>
                <th className="px-3 py-2.5 font-medium">Similarity</th>
                <th className="px-3 py-2.5 font-medium">% in Quotes</th>
                <th className="px-3 py-2.5 font-medium">Revisions</th>
                <th className="px-3 py-2.5 font-medium">Editing Time</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => {
                const rowKey = row.filename;
                const selected = selectedRowKey === rowKey;
                return (
                <tr
                  key={rowKey}
                  className={cn(
                    "border-b border-[#ededed] transition-colors duration-100 hover:bg-[#f1f3f4]",
                    selected && "bg-[#e8f0fe]",
                  )}
                  onClick={() => setSelectedRowKey((prev) => (prev === rowKey ? null : rowKey))}
                >
                  <td className="max-w-[14rem] truncate px-4 py-2.5 align-middle text-[#111827]">
                    <span className="inline-flex min-w-0 items-center">
                      <DocumentIcon />
                      <span className="truncate">{row.filename}</span>
                    </span>
                  </td>
                  <td className="px-3 py-2.5 align-middle tabular-nums">
                    {row.keywords === null ? (
                      <span className="text-[#9ca3af]">-</span>
                    ) : (
                      <span className="font-medium text-[#2563eb]">{row.keywords}</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 align-middle">
                    {row.hiddenText ? (
                      <span className="font-medium text-[#2563eb]">Yes</span>
                    ) : (
                      <span className="text-[#6b7280]">No</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 align-middle">
                    <span className="inline-flex items-center gap-1.5 tabular-nums">
                      <span
                        className="inline-block h-[11px] w-[11px] shrink-0 rounded-[2px]"
                        style={{ backgroundColor: similaritySwatchColor(row.similarity) }}
                        aria-hidden
                      />
                      {row.similarity}%
                    </span>
                  </td>
                  <td className="px-3 py-2.5 align-middle tabular-nums">{row.quotesPct}%</td>
                  <td className="px-3 py-2.5 align-middle tabular-nums">{row.revisions}</td>
                  <td className="px-3 py-2.5 align-middle tabular-nums">{row.editingMinutes} min</td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
