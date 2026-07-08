import { Link } from "react-router-dom";
import { Jackalope } from "../brand/Jackalope";
import { BodyText } from "../primitives/Typography";

interface TeamMember {
  name: string;
  role: string;
}

interface CaseStudyFooterProps {
  projectName: string;
  team: TeamMember[];
  nextCaseStudy?: { label: string; to: string };
}

export const CaseStudyFooter = ({ projectName, team, nextCaseStudy }: CaseStudyFooterProps) => (
  <footer className="grid gap-12 border-t border-hedge bg-footer-gradient px-6 py-16 sm:px-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-gutter lg:py-16">
    <div className="grid min-h-[220px] place-items-center rounded-lg bg-glow">
      <div className="flex items-center gap-4">
        <Jackalope size={44} variant="moss" />
        <span className="font-display text-4xl font-medium tracking-wide text-moss">{projectName}</span>
      </div>
    </div>

    <div className="flex flex-col gap-4">
      <span className="type-mono">Team</span>
      <div className="flex flex-col gap-2">
        {team.map((member) => (
          <BodyText key={member.name} className="text-sm">
            {member.name} — {member.role}
          </BodyText>
        ))}
      </div>
      {nextCaseStudy ? (
        <Link to={nextCaseStudy.to} className="type-mono type-mono--glow mt-2 no-underline hover:text-bone">
          {nextCaseStudy.label} →
        </Link>
      ) : null}
    </div>
  </footer>
);
