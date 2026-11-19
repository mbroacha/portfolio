/**
 * TEMPORARY. Side-by-side review of the three Beacon hero directions.
 *
 * Delete this file and its route in App.tsx once a direction is chosen.
 * Each hero sits in the same 75% content column at the same p-8 padding as a
 * real case study page, so what you see here is what it looks like in place.
 */
import { CvPage } from "../components/cv/CvPage";
import { SectionHeading, Rule } from "../components/cv/CvPrimitives";
import { BeaconHeroA } from "../components/case-study/BeaconHeroA";
import { BeaconHeroB } from "../components/case-study/BeaconHeroB";
import { BeaconHeroC } from "../components/case-study/BeaconHeroC";

const Option = ({ letter, title, claim, children }: { letter: string; title: string; claim: string; children: React.ReactNode }) => (
  <section className="mb-16">
    <SectionHeading>{`${letter}. ${title}`}</SectionHeading>
    <Rule className="mb-6" />
    <p className="mb-6 max-w-prose">{claim}</p>
    {children}
    <button
      type="button"
      className="cv-meta mt-2 border border-hedge px-3 py-2 text-bone"
      onClick={() => window.location.reload()}
    >
      Replay
    </button>
  </section>
);

export const BeaconHeroes = () => (
  <CvPage
    sidebar={
      <div className="flex flex-col gap-4">
        <div className="text-bone">Beacon hero options</div>
        <div>Three directions, animated. Reload the page or hit Replay to see a pass again.</div>
        <div>
          Orange is Beacon's own <span className="font-mono">#F1592B</span>, set as the fallback on{" "}
          <span className="font-mono">--beacon-orange</span>.
        </div>
        <div>
          B has been through the type and plain-language passes and is set in Montserrat and Inter. A and C have not:
          they are still in the site face and still use raw CDM field names.
        </div>
      </div>
    }
  >
    <Option
      letter="A"
      title="Reciprocal disclosure field"
      claim="Nobody was required to share. Sharing spread because it was visible and returned in kind. Nine assets never share, and the frame says so."
    >
      <BeaconHeroA />
    </Option>
    <Option
      letter="B"
      title="Conjunction geometry"
      claim="The signature form, and the lede: somebody has to move. Beacon proposes the maneuver and never executes it."
    >
      <BeaconHeroB />
    </Option>
    <Option
      letter="C"
      title="The conjunction message made legible"
      claim="The research method as the picture. The wall stays on the page at low contrast, because the raw data stays one click away."
    >
      <BeaconHeroC />
    </Option>
  </CvPage>
);
