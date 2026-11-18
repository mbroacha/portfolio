/**
 * Resolve a file in public/ against Vite's base.
 *
 * A bare "/case-studies/x.png" only works when the site is served at the domain
 * root. On the staging URL the base is "/portfolio/", so every public path has
 * to go through here or it 404s.
 */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, "");
