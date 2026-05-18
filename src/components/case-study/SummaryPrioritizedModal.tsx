import "@fontsource/lexend-deca/latin-400.css";
import "@fontsource/lexend-deca/latin-600.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faFlag, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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

const reviewComments = [
  {
    id: "belie",
    author: "Morgan Broacha",
    time: "Today 1:40 PM",
    body: 'Has never used the word "belie" correctly.',
  },
  {
    id: "passive",
    author: "Morgan Broacha",
    time: "Sep 28, 2020 3:15 PM",
    body: "A lot of passive voice.",
  },
] as const;

const reviewDocumentTitle = "Old_Man_and_the_Sea.docx";

export function SummaryPrioritizedModal() {
  const [activeTab, setActiveTab] = useState<TabKey>("summary");
  const [activeIssue, setActiveIssue] = useState<string | null>(null);

  return (
    <div
      className="summary-prioritized-modal overflow-hidden rounded-[20px] bg-white ring-1 ring-black/[0.06] shadow-[0_6px_18px_-10px_rgba(60,64,67,0.18)] transition-shadow duration-200 hover:shadow-[0_10px_28px_-8px_rgba(60,64,67,0.22)]"
    >
      <div className="relative min-h-[360px] bg-[#f7f7f7]">
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center">
          <div className="mb-0 flex items-start gap-1">
            <div className="w-[440px] rounded-t-[6px] bg-white px-4 pb-4 pt-5 shadow-[0_10px_24px_-16px_rgba(0,0,0,0.45)]">
              {activeTab === "summary" ? (
                <>
                  <h3 className="text-center text-[28px] font-normal leading-none text-black">
                    Summary
                  </h3>
                  <p className="mt-1.5 text-center text-[12px] leading-tight text-black">
                    Top issues that may indicate contract cheating.
                  </p>
                </>
              ) : (
                <h3 className="truncate text-center text-[22px] font-normal leading-tight text-black">
                  {reviewDocumentTitle}
                </h3>
              )}

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
                            <div className="flex items-center gap-2 text-[20px] font-normal leading-[1] text-black">
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
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">
                      Comments
                    </p>
                    <div className="space-y-2">
                      {reviewComments.map((comment) => (
                        <div
                          key={comment.id}
                          className="rounded-[4px] border border-[#efefef] bg-white px-3 py-2.5 shadow-[0_1px_8px_-6px_rgba(0,0,0,0.28)]"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-[13px] font-semibold leading-tight text-black">{comment.author}</p>
                              <p className="mt-0.5 text-[11px] leading-tight text-[#8a8a8a]">{comment.time}</p>
                            </div>
                            <button
                              type="button"
                              aria-label="Comment options"
                              className="shrink-0 rounded p-1 text-[#8a8a8a] transition-colors hover:bg-[#f1f3f4] hover:text-[#595959]"
                            >
                              <FontAwesomeIcon icon={faEllipsisVertical} className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="mt-2 text-[12px] leading-snug text-[#242424]">{comment.body}</p>
                        </div>
                      ))}
                    </div>
                    <label className="block">
                      <span className="sr-only">New comment</span>
                      <input
                        type="text"
                        readOnly
                        placeholder="New Comment..."
                        className="w-full rounded-[4px] border border-[#efefef] bg-white px-3 py-2.5 text-[12px] text-[#242424] shadow-[0_1px_8px_-6px_rgba(0,0,0,0.28)] placeholder:text-[#8a8a8a] focus:outline-none focus:ring-1 focus:ring-[#d0d7de]"
                      />
                    </label>
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
                  <span className="w-full px-1 text-center text-[16px] font-semibold leading-tight">
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
