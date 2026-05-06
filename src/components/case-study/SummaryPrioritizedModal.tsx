import "@fontsource/lexend-deca/latin-400.css";
import "@fontsource/lexend-deca/latin-600.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { cn } from "../../lib/cn";

type TabKey = "summary" | "review";

const issueTiles = [
  {
    id: "authors",
    title: "Author names",
    detail: "4 different author names have been used across papers.",
  },
  {
    id: "editing",
    title: "Last modified by names",
    detail: "3 different last modified by names have been used across papers.",
  },
] as const;

export function SummaryPrioritizedModal() {
  const [activeTab, setActiveTab] = useState<TabKey>("summary");
  const [activeIssue, setActiveIssue] = useState<string | null>(null);

  return (
    <div
      className="overflow-hidden rounded-[20px] bg-white ring-1 ring-black/[0.06] shadow-[0_6px_18px_-10px_rgba(60,64,67,0.18)] transition-shadow duration-200 hover:shadow-[0_10px_28px_-8px_rgba(60,64,67,0.22)]"
      style={{ fontFamily: '"Lexend Deca", system-ui, sans-serif' }}
    >
      <div className="relative min-h-[360px] bg-[#f7f7f7]">
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center">
          <div className="mb-0 flex items-start gap-1">
            <div className="w-[440px] rounded-t-[6px] bg-white px-4 pb-4 pt-5 shadow-[0_10px_24px_-16px_rgba(0,0,0,0.45)]">
              <h3 className="text-center text-[28px] font-normal leading-none tracking-[-0.01em] text-black">Summary</h3>
              <p className="mt-1.5 text-center text-[12px] leading-tight text-black">
                Top issues that may indicate contract cheating.
              </p>

              <div className="mt-4 space-y-2.5">
                {activeTab === "summary" ? (
                  issueTiles.map((tile) => {
                    const selected = activeIssue === tile.id;
                    return (
                      <button
                        key={tile.id}
                        type="button"
                        onClick={() => setActiveIssue((prev) => (prev === tile.id ? null : tile.id))}
                        className={cn(
                          "block w-full rounded-[4px] border border-[#efefef] bg-white px-4 py-3 text-left shadow-[0_1px_8px_-6px_rgba(0,0,0,0.28)] transition-all",
                          selected
                            ? "ring-1 ring-[#d0d7de] bg-[#f1f3f4]"
                            : "hover:-translate-y-[1px] hover:bg-[#f1f3f4] hover:shadow-[0_6px_12px_-10px_rgba(0,0,0,0.35)]",
                        )}
                      >
                        <div className="flex items-start">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 text-[20px] font-normal leading-[1] tracking-[-0.01em] text-black">
                              <FontAwesomeIcon icon={faFlag} className="h-[14px] w-[14px] text-[#ff5d4d]" />
                              <span>{tile.title}</span>
                            </div>
                            <div className="mt-1 text-[12px] leading-snug text-[#595959]">{tile.detail}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="rounded-[4px] border border-[#efefef] bg-white px-3 py-3 shadow-[0_1px_8px_-6px_rgba(0,0,0,0.28)]">
                    <div className="flex items-center gap-2.5">
                      <FontAwesomeIcon icon={faMagnifyingGlass} className="h-[20px] w-[20px] text-[#ff5d4d]" />
                      <p className="text-[12px] leading-snug text-[#595959]">
                        Review mode helps inspect supporting signals before finalizing a decision.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="self-start flex flex-col justify-start gap-1" role="menu" aria-label="Summary modal menu">
              {(
                [
                  { key: "summary", label: "Summary", icon: "flag" },
                  { key: "review", label: "Review", icon: "search" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  role="menuitemradio"
                  aria-checked={activeTab === tab.key}
                  className={cn(
                    "flex h-[112px] w-[104px] flex-col items-center justify-center gap-1.5 rounded-[4px] bg-white px-2 transition-colors",
                    activeTab === tab.key
                      ? "bg-[#f1f3f4] text-[#ff5d4d] ring-1 ring-[#d0d7de] shadow-[0_4px_10px_-10px_rgba(0,0,0,0.45)]"
                      : "text-[#242424] shadow-[0_4px_10px_-10px_rgba(0,0,0,0.45)] hover:bg-[#f1f3f4] hover:text-[#ff5d4d]",
                  )}
                >
                  <FontAwesomeIcon
                    icon={tab.icon === "flag" ? faFlag : faMagnifyingGlass}
                    className="h-6 w-6"
                  />
                  <span className="w-full px-1 text-center text-[16px] font-semibold leading-tight tracking-[-0.01em]">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
