/**
 * Where Sysgit sits in a customer's stack.
 *
 * Supports the "one less tool beats one task done perfectly" insight. The
 * argument is a subtraction, and a subtraction needs two states to be visible,
 * so this is a before/after pair rather than a single picture.
 *
 * Honesty constraints, per ARTIFACT_PLAN.md section 5:
 *   - This is a diagram, captioned as a diagram. It is not a capture.
 *   - It is a representative toolchain, not any one customer's. The caption
 *     says so.
 *   - No counts, percentages, or figures appear anywhere. The only quantity
 *     the reader gets is the number of boxes drawn, which is a property of the
 *     drawing rather than a claim about a customer.
 *
 * Every tool named here is sourced from the Sysgit corpus: the incumbents
 * (Cameo, JAMA, DOORS), the small-team substitute (a cheap diagramming tool),
 * and the shipped Git integrations (GitHub, GitLab, Gitea, Forgejo).
 */

/** Layers Sysgit does not touch. Identical on both sides, and that is the point. */
const ADJACENT = [
  { layer: "Geometry", tools: "SolidWorks, CATIA, NX" },
  { layer: "Simulation", tools: "Simulink, Ansys" },
  { layer: "Lifecycle", tools: "Teamcenter, Windchill" },
  { layer: "Verification", tools: "Jira, Polarion" },
];

/** The contested band, before. Four purchases, three seams between them. */
const BAND_BEFORE = [
  { layer: "Requirements", tools: "JAMA, DOORS" },
  { layer: "System model", tools: "Cameo" },
  { layer: "Diagrams", tools: "A general-purpose canvas" },
  { layer: "Version control", tools: "File shares, email, review meetings" },
];

const Eyebrow = ({ children }: { children: string }) => (
  <div className="cv-meta mb-3 uppercase text-bone" style={{ letterSpacing: "var(--tracking-label)" }}>
    {children}
  </div>
);

/** A layer that is the same on both sides. Held back so the band reads first. */
const AdjacentRows = () => (
  <div className="flex flex-col">
    {ADJACENT.map((row) => (
      <div key={row.layer} className="flex items-baseline justify-between gap-4 py-1.5">
        <span className="cv-meta text-lichen">{row.layer}</span>
        <span className="cv-meta text-right text-lichen">{row.tools}</span>
      </div>
    ))}
  </div>
);

/** One purchased tool inside the contested band. */
const BandBox = ({ layer, tools, grow }: { layer: string; tools: string; grow?: boolean }) => (
  <div
    className={grow ? "flex flex-1 flex-col justify-center border border-bone px-3 py-2.5" : "border border-bone px-3 py-2.5"}
    style={{ backgroundColor: "var(--ink-800)" }}
  >
    <div className="cv-meta text-bone">{layer}</div>
    <div className="cv-meta text-sage">{tools}</div>
  </div>
);

/** The cost of a seam, stated without a number. */
const Seam = () => (
  <div className="flex items-center gap-2 py-1.5" aria-hidden="true">
    <div className="h-px flex-1 border-t border-dashed border-hedge" />
    <span className="cv-meta text-lichen">integration</span>
    <div className="h-px flex-1 border-t border-dashed border-hedge" />
  </div>
);

const Column = ({ title, children, note }: { title: string; children: React.ReactNode; note: string }) => (
  <div className="flex flex-1 flex-col">
    <Eyebrow>{title}</Eyebrow>
    <div className="flex flex-1 flex-col gap-4 border border-hedge p-4" style={{ backgroundColor: "var(--ink-900)" }}>
      <AdjacentRows />
      <div className="border-t border-hedge" />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
    <p className="cv-meta mt-3 text-lichen">{note}</p>
  </div>
);

export const CustomerStackDiagram = () => (
  <figure className="mb-6 flex flex-col gap-4" style={{ backgroundColor: "var(--surface-media)", padding: "1rem" }}>
    <div className="flex flex-col gap-8 sm:flex-row sm:gap-6">
      <Column
        title="A hardware program's stack"
        note="Every seam is an integration to maintain and a set of seats to justify at renewal."
      >
        {BAND_BEFORE.map((row, i) => (
          <div key={row.layer} className="contents">
            <BandBox layer={row.layer} tools={row.tools} />
            {i < BAND_BEFORE.length - 1 ? <Seam /> : null}
          </div>
        ))}
      </Column>

      <Column
        title="The same stack with Sysgit"
        note="The neighbors are untouched. The band in the middle stops being four purchases."
      >
        <BandBox
          layer="Sysgit"
          tools="Requirements, system model, diagrams and version control in one workflow"
          grow
        />
        <div className="flex items-center gap-2 py-1.5" aria-hidden="true">
          <div className="h-px flex-1 border-t border-hedge" />
        </div>
        <div className="border border-dashed border-hedge px-3 py-2.5">
          <div className="cv-meta text-sage">The Git provider they already run</div>
          <div className="cv-meta text-lichen">GitHub, GitLab, Gitea, Forgejo</div>
        </div>
      </Column>
    </div>

    <figcaption className="cv-meta max-w-prose" style={{ color: "var(--text-on-media)" }}>
      Where the tool sits in a customer&rsquo;s stack. Diagram, not a screenshot. A representative toolchain rather
      than any one customer&rsquo;s.
    </figcaption>
  </figure>
);
