import { Jackalope } from "../brand/Jackalope";
import { Button } from "../brand/Button";
import { BodyLead } from "../primitives/Typography";

export const SiteFooter = () => (
  <footer
    id="about"
    className="grid gap-12 border-t border-hedge bg-footer-gradient px-6 py-[72px] sm:px-10 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-gutter"
    role="contentinfo"
  >
    <div className="flex flex-col gap-5">
      <h2 className="type-title--section max-w-[16ch]">
        Not another app designer
        <br />
        <span className="type-accent-turn">who likes coffee and tacos.</span>
      </h2>
      <BodyLead className="max-w-[46ch]">
        Wyoming-raised, dirt-tested. I do my best work embedded with the people who use the product — wherever
        that is.
      </BodyLead>
      <p className="type-mono text-caption">44.4280° N, 110.5885° W → YOUR ROADMAP</p>
    </div>

    <div className="flex flex-col items-start justify-between gap-6 lg:items-end">
      <Jackalope size={120} label="Morgan Broacha jackalope mark" />
      <div className="flex flex-col items-start gap-2.5 lg:items-end">
        <Button href="mailto:hello@morganbroacha.com" variant="primary" className="!px-6 !py-[15px]">
          hello@morganbroacha.com
        </Button>
        <p className="type-mono text-caption">LinkedIn · Resume · Field Notes</p>
      </div>
    </div>

    <p className="type-mono col-span-full border-t border-hedge pt-8 text-caption lg:col-span-2">
      © Morgan Broacha 2018–2026 · Hand (and vibe) coded in Cursor and GitHub
    </p>
  </footer>
);
