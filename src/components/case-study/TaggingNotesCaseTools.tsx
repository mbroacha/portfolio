import "@fontsource/lexend-deca/latin-400.css";
import "@fontsource/lexend-deca/latin-600.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/roboto/latin-500.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faDiamond,
  faEllipsisVertical,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { cn } from "../../lib/cn";
import { SubmissionsReportTable } from "./SubmissionsReportTable";

const DOCUMENT_TITLE = "Old_Man_and_the_Sea.docx";

const LABEL_COLORS = [
  "#e53935",
  "#fb8c00",
  "#fdd835",
  "#c0ca33",
  "#a5d6a7",
  "#81d4fa",
  "#1e88e5",
  "#8e24aa",
  "#d81b60",
  "#f48fb1",
  "#e0e0e0",
  "#757575",
] as const;

const COMMENT = {
  author: "Morgan Broacha",
  time: "Today 1:40 PM",
  body: "This writing style is very similar to the paper from last semester, but it was turned in 3 days late. Student doesn't usually turn work in late.",
} as const;

function ModalCloseButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-[#5f6368] transition-colors hover:bg-[#f1f3f4] hover:text-[#202124]"
    >
      <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
    </button>
  );
}

function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div className="tagging-notes-modal-header flex items-start justify-between gap-3 border-b border-[#e8eaed] px-4 py-3">
      <h3 className="min-w-0 truncate text-[15px] leading-tight text-[#202124]">{title}</h3>
      <ModalCloseButton onClick={onClose} label="Close" />
    </div>
  );
}

function LabelsModal({
  open,
  onClose,
  selectedColor,
  onSelectColor,
  activeLabel,
  onSelectLabel,
}: {
  open: boolean;
  onClose: () => void;
  selectedColor: string | null;
  onSelectColor: (color: string) => void;
  activeLabel: "suspicious" | "dismiss" | null;
  onSelectLabel: (label: "suspicious" | "dismiss") => void;
}) {
  if (!open) return null;

  return (
    <div
      className="w-[min(100%,300px)] rounded-[8px] border border-[#dadce0] bg-white shadow-[0_12px_28px_-8px_rgba(60,64,67,0.35)]"
      style={{ fontFamily: '"Roboto", system-ui, sans-serif' }}
    >
      <ModalHeader title={DOCUMENT_TITLE} onClose={onClose} />
      <div className="px-4 pb-4 pt-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-[#80868b]">Labels</p>
        <input
          type="text"
          readOnly
          placeholder="Enter label..."
          className="mt-2 w-full rounded-[4px] border border-[#dadce0] bg-white px-3 py-2 text-[13px] text-[#3c4043] placeholder:text-[#80868b] focus:outline-none focus:ring-1 focus:ring-[#1a73e8]/40"
        />
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={() => onSelectLabel("suspicious")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-[4px] border px-2.5 py-1 text-[13px] font-medium text-[#c5221f] transition-colors",
              activeLabel === "suspicious"
                ? "border-[#f28b82] bg-[#fce8e6] ring-1 ring-[#f28b82]/60"
                : "border-transparent bg-[#fce8e6] hover:border-[#f28b82]/40",
            )}
          >
            <FontAwesomeIcon icon={faDiamond} className="h-3 w-3" aria-hidden />
            Suspicious
          </button>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectLabel("dismiss")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-[4px] border px-2.5 py-1 text-[13px] font-medium text-[#5f6368] transition-colors",
                activeLabel === "dismiss"
                  ? "border-[#dadce0] bg-[#f1f3f4] ring-1 ring-[#dadce0]"
                  : "border-transparent bg-[#f1f3f4] hover:border-[#dadce0]",
              )}
            >
              <FontAwesomeIcon icon={faCircleMinus} className="h-3 w-3" aria-hidden />
              Dismiss
            </button>
            <span className="text-[11px] text-[#80868b]">Note: this will hide the paper</span>
          </div>
        </div>
        <button
          type="button"
          className="mt-3 text-[13px] font-medium text-[#1a73e8] transition-colors hover:text-[#174ea6]"
        >
          Create New
        </button>
        <div className="mt-4 grid grid-cols-6 gap-2.5">
          {LABEL_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Label color ${color}`}
              onClick={() => onSelectColor(color)}
              className={cn(
                "mx-auto h-6 w-6 rounded-full border-2 transition-transform hover:scale-110",
                selectedColor === color ? "scale-110 border-[#202124]" : "border-transparent",
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div
      className="w-[min(100%,320px)] rounded-[8px] border border-[#dadce0] bg-white shadow-[0_16px_36px_-10px_rgba(60,64,67,0.4)]"
      style={{ fontFamily: '"Roboto", system-ui, sans-serif' }}
    >
      <ModalHeader title={DOCUMENT_TITLE} onClose={onClose} />
      <div className="px-4 pb-4 pt-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-[#80868b]">Comments</p>
        <div className="mt-3 rounded-[4px] border border-[#e8eaed] bg-white px-3 py-2.5 shadow-[0_1px_4px_-2px_rgba(60,64,67,0.2)]">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[13px] font-medium leading-tight text-[#202124]">{COMMENT.author}</p>
              <p className="mt-0.5 text-[11px] leading-tight text-[#80868b]">{COMMENT.time}</p>
            </div>
            <button
              type="button"
              aria-label="Comment options"
              className="shrink-0 rounded p-1 text-[#80868b] transition-colors hover:bg-[#f1f3f4] hover:text-[#5f6368]"
            >
              <FontAwesomeIcon icon={faEllipsisVertical} className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-2 text-[13px] leading-snug text-[#3c4043]">{COMMENT.body}</p>
        </div>
        <label className="mt-3 block">
          <span className="sr-only">New comment</span>
          <input
            type="text"
            readOnly
            placeholder="New Comment..."
            className="w-full rounded-[4px] border border-[#dadce0] bg-white px-3 py-2 text-[13px] text-[#3c4043] placeholder:text-[#80868b] focus:outline-none focus:ring-1 focus:ring-[#1a73e8]/40"
          />
        </label>
      </div>
    </div>
  );
}

export function TaggingNotesCaseTools() {
  const [labelsOpen, setLabelsOpen] = useState(true);
  const [commentsOpen, setCommentsOpen] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(LABEL_COLORS[0]);
  const [activeLabel, setActiveLabel] = useState<"suspicious" | "dismiss" | null>("suspicious");

  return (
    <div className="tagging-notes-case-tools relative overflow-hidden rounded-[20px]">
      <SubmissionsReportTable initialSelectedFilename="Old Man and the Sea.docx" />

      <div className="pointer-events-none absolute inset-0 bg-[#f8f9fa]/55" aria-hidden />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-4 pb-5 pt-24 sm:px-6">
        <div className="pointer-events-auto flex w-full max-w-[720px] items-end justify-between gap-4 sm:gap-8">
          <div className={cn("relative shrink-0 transition-opacity duration-200", !labelsOpen && "opacity-0")}>
            <LabelsModal
              open={labelsOpen}
              onClose={() => setLabelsOpen(false)}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              activeLabel={activeLabel}
              onSelectLabel={setActiveLabel}
            />
          </div>
          <div className={cn("relative shrink-0 transition-opacity duration-200", !commentsOpen && "opacity-0")}>
            <CommentsModal open={commentsOpen} onClose={() => setCommentsOpen(false)} />
          </div>
        </div>
      </div>

      {(!labelsOpen || !commentsOpen) && (
        <div className="pointer-events-auto absolute bottom-3 right-4 flex gap-2 text-[12px]">
          {!labelsOpen ? (
            <button
              type="button"
              onClick={() => setLabelsOpen(true)}
              className="rounded-[4px] bg-white px-2.5 py-1 font-medium text-[#1a73e8] shadow-sm ring-1 ring-[#dadce0] hover:bg-[#f8f9fa]"
            >
              Show labels
            </button>
          ) : null}
          {!commentsOpen ? (
            <button
              type="button"
              onClick={() => setCommentsOpen(true)}
              className="rounded-[4px] bg-white px-2.5 py-1 font-medium text-[#1a73e8] shadow-sm ring-1 ring-[#dadce0] hover:bg-[#f8f9fa]"
            >
              Show comments
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
