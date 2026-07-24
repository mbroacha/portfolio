function Landing({ onOpenCase }) {
  const { Lockup, Jackalope, Button, Eyebrow, CaseCard } = window.Greenhouse;
  const cases = [
    { eyebrow: 'Aerospace · Case 01', title: 'Mission ops software for launch-day decision-making', description: 'Designed with engineers on console, not from a conference room.', mediaLabel: '[ launch-ops product shot ]' },
    { eyebrow: 'Healthcare · Case 02', title: 'Clinical tooling shaped by ER-floor research', description: 'Field studies in trauma centers, translated into calm software.', mediaLabel: '[ clinical dashboard shot ]' },
    { eyebrow: 'Research · Case 03', title: 'Field research methods for places without Wi-Fi', description: 'From Yellowstone transects to classrooms running on donated hardware.', mediaLabel: '[ research artifact shot ]' },
  ];
  const proof = ['RESEARCH IN LEVEL-1 ER TRAUMA CENTERS', 'YELLOWSTONE FIELD STUDIES', 'ONSITE AT ROCKET LAUNCHES', 'EMBEDDED IN UNDERFUNDED SCHOOLS'];

  return (
    <div style={{ background: 'var(--moss)', fontFamily: 'var(--font-body)' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 64px', borderBottom: '1px solid var(--hedge)' }}>
        <Lockup src="../../assets/jackalope.png" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <Eyebrow color="var(--sage)" style={{ fontWeight: 500 }}>WORK</Eyebrow>
          <Eyebrow color="var(--sage)" style={{ fontWeight: 500 }}>FIELD NOTES</Eyebrow>
          <Eyebrow color="var(--sage)" style={{ fontWeight: 500 }}>ABOUT</Eyebrow>
          <Button variant="primary" style={{ padding: '10px 18px' }}>Contact</Button>
        </div>
      </nav>

      <header style={{ padding: '96px 64px 88px', background: 'var(--gradient-hero)', borderBottom: '1px solid var(--hedge)' }}>
        <Eyebrow color="var(--lichen)" style={{ marginBottom: 28 }}>PRODUCT DESIGNER — HARD-TECH &amp; FIELD-CRITICAL SOFTWARE</Eyebrow>
        <div style={{ font: '500 76px/1.08 var(--font-display)', letterSpacing: '-0.015em', color: 'var(--bone)', maxWidth: '19ch' }}>
          I design systems that grow <span style={{ fontStyle: 'italic', color: 'var(--glow)' }}>in hard places.</span>
        </div>
        <div style={{ marginTop: 32, font: '400 20px/1.6 var(--font-display)', color: 'var(--sage)', maxWidth: '52ch' }}>
          B2B SaaS for aerospace, healthcare, and research teams — grounded in fieldwork from ER floors and Yellowstone backcountry to the launchpad.
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 14 }}>
          <Button>See the work</Button>
          <Button variant="secondary">Field notes →</Button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--hedge)' }}>
        {proof.map((p, i) => (
          <div key={p} style={{ padding: '22px 32px', borderRight: i < 3 ? '1px solid var(--hedge)' : 'none' }}>
            <Eyebrow color="var(--lichen)" style={{ fontWeight: 500, lineHeight: 1.5 }}>{p}</Eyebrow>
          </div>
        ))}
      </div>

      <section style={{ padding: '72px 64px', borderBottom: '1px solid var(--hedge)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 36 }}>
          <div style={{ font: '500 40px/1.1 var(--font-display)', color: 'var(--bone)' }}>Selected work</div>
          <Button variant="text">All case studies</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {cases.map((c) => (
            <CaseCard key={c.title} {...c} onClick={onOpenCase} style={{ cursor: 'pointer' }} />
          ))}
        </div>
      </section>

      <footer style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, padding: '72px 64px 64px', background: 'var(--gradient-hero)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ font: '500 36px/1.15 var(--font-display)', color: 'var(--bone)' }}>
            Not another app designer<br /><span style={{ fontStyle: 'italic', color: 'var(--glow)' }}>who likes coffee and tacos.</span>
          </div>
          <div style={{ font: '400 16px/1.6 var(--font-display)', color: 'var(--sage)', maxWidth: '46ch' }}>
            Wyoming-raised, dirt-tested. I do my best work embedded with the people who use the product — wherever that is.
          </div>
          <Eyebrow color="var(--lichen)">44.4280° N, 110.5885° W → YOUR ROADMAP</Eyebrow>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24 }}>
          <Jackalope size={120} color="var(--glow)" src="../../assets/jackalope.png" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <Button>hello@morganbroacha.com</Button>
            <Eyebrow color="var(--lichen)">LINKEDIN · RESUME · FIELD NOTES</Eyebrow>
          </div>
        </div>
      </footer>
    </div>
  );
}
window.Landing = Landing;
