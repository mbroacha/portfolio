/**
 * Resolve a file in public/ against Vite's base.
 *
 * The site is served at the domain root today, so this is a no-op, but routing
 * every public path through here keeps a non-root base (e.g. "/portfolio/")
 * working if it ever comes back.
 */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, "");
