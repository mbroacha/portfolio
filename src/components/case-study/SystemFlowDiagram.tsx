interface FlowStep {
  id: string;
  text: string;
}

interface SystemFlowDiagramProps {
  steps: FlowStep[];
}

export const SystemFlowDiagram = ({ steps }: SystemFlowDiagramProps) => {
  const flowLabel = steps.map((s) => s.text).join(", then ");

  return (
    <div className="overflow-x-auto rounded-md border border-line">
      <ol
        className="m-0 flex min-w-min list-none flex-row items-stretch divide-x divide-line p-0"
        aria-label={`System flow: ${flowLabel}`}
      >
        {steps.map((step) => (
          <li
            key={step.id}
            className="flex min-w-[6.75rem] flex-1 flex-col justify-center px-2.5 py-2.5 sm:min-w-[7.25rem] sm:px-3 sm:py-3"
          >
            <span className="text-left text-[0.8125rem] font-medium leading-snug text-ink sm:text-sm">{step.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};
