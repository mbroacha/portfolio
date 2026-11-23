import { Component, type ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Catches a page that fails to render, most often a page chunk that failed to
 * load.
 *
 * Every page but the homepage is its own chunk (App.tsx). Two ordinary things
 * break that: a reader goes offline, or a tab opened before a deploy follows
 * a link to a chunk whose hashed name no longer exists. Without a boundary,
 * React unmounts the whole tree and the reader is left on a blank dark page
 * with no way to tell what happened.
 *
 * The stale-deploy case recovers on its own: Vite fires vite:preloadError when
 * a chunk will not load, and one reload fetches the new index and its new
 * chunk names. A session flag stops that from looping when the cause is the
 * network instead. Anything left over lands here, with the problem and the
 * way out.
 */

const RELOAD_FLAG = "chunk-reload";

if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", (event) => {
    try {
      if (sessionStorage.getItem(RELOAD_FLAG)) return;
      sessionStorage.setItem(RELOAD_FLAG, "1");
    } catch {
      return;
    }
    event.preventDefault();
    window.location.reload();
  });
  // A page that loaded clears the flag, so a later deploy can recover too.
  window.addEventListener("load", () => {
    try {
      sessionStorage.removeItem(RELOAD_FLAG);
    } catch {
      /* storage unavailable: nothing to clear */
    }
  });
}

const isChunkError = (error: unknown) =>
  error instanceof Error &&
  /dynamically imported module|Importing a module script failed|Failed to fetch|error loading dynamically/i.test(
    error.message,
  );

export class RouteErrorBoundary extends Component<{ children: ReactNode }, { error: unknown }> {
  state = { error: null as unknown };

  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const offline = typeof navigator !== "undefined" && navigator.onLine === false;
    const chunk = isChunkError(error);

    return (
      <main
        id="content"
        className="cv-prose mx-auto flex min-h-screen w-full max-w-[var(--measure-prose)] flex-col justify-center gap-5 bg-page p-8"
      >
        <h1 className="m-0 font-display text-[length:var(--font-size-title)] font-normal italic leading-[1.05] text-primary">
          This page didn&rsquo;t load.
        </h1>
        <p className="text-secondary">
          {offline
            ? "You look to be offline. The page will load once you are connected again."
            : chunk
              ? "Part of the site couldn’t be fetched, usually because it was updated while this tab was open. Reloading picks up the current version."
              : "Something went wrong while drawing it. Reloading usually fixes it."}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cursor-pointer border border-[color:var(--edge)] bg-transparent px-4 py-2 text-primary transition-colors hover:bg-[color:var(--surface-media)]"
          >
            Reload the page
          </button>
          {/* The homepage ships in the main bundle, so it loads even when a
              chunk will not. Leaving the path resets the boundary (SiteLayout). */}
          <Link to="/" className="py-2 underline underline-offset-4">
            Go to the work
          </Link>
        </div>
      </main>
    );
  }
}
