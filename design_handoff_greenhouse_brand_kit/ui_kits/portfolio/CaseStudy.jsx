function Section({ n, title, alt, children }) {
  return (
    <div style={{ padding: '80px 64px', borderBottom: '1px solid var(--hedge)', background: alt ? 'var(--fern)' : 'var(--moss)' }}>
      <div style={{ textAlign: 'center', marginBottom: 44 }}>
        <div style={{ font: '600 11px/1 var(--font-mono)', letterSpacing: '0.2em', color: 'var(--ember)', marginBottom: 14 }}>{n}</div>
        <div style={{ font: '500 44px/1.1 var(--font-display)', color: 'var(--bone)' }}>{title}</div>
      </div>
      {children}
    </div>
  );
}

function CaseStudy({ onBack }) {
  const { Jackalope, Lockup, Button, Eyebrow, Stat, PlaceholderMedia } = window.Greenhouse;
  return (
    <div style={{ background: 'var(--moss)', fontFamily: 'var(--font-body)' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 64px', borderBottom: '1px solid var(--hedge)' }}>
        <Lockup src="../../assets/jackalope.png" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <Button variant="text" onClick={onBack}>← All work</Button>
          <Button style={{ padding: '10px 18px' }}>Contact</Button>
        </div>
      </nav>

      <header style={{ padding: '88px 64px 56px', textAlign: 'center', background: 'var(--gradient-hero)' }}>
        <Eyebrow style={{ marginBottom: 22, justifyContent: 'center', display: 'flex' }}>CASE 01 · AEROSPACE · SHIPPED 2025</Eyebrow>
        <div style={{ font: '500 84px/1 var(--font-display)', letterSpacing: '0.04em', color: 'var(--bone)' }}>BEACON</div>
        <div style={{ marginTop: 20, font: '400 18px/1.6 var(--font-body)', color: 'var(--sage)', maxWidth: '54ch', margin: '20px auto 0' }}>
          Product strategy and design for launch-day decision-making software.
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, padding: '48px 64px 56px', borderBottom: '1px solid var(--hedge)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Eyebrow color="var(--lichen)" style={{ fontWeight: 600 }}>MY ROLE</Eyebrow>
          <div style={{ font: '400 15px/1.65 var(--font-body)', color: 'var(--sage)' }}>
            Defined product strategy by conducting on-site research and evaluation across the operations team. Led design from early concepts through cross-functional delivery.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <Stat value="60%" caption="[ stat caption ]" />
          <Stat value="$15.3 million" caption="[ stat caption ]" />
        </div>
      </div>

      <div style={{ padding: '56px 64px', borderBottom: '1px solid var(--hedge)' }}>
        <PlaceholderMedia height={480} radius="var(--radius-lg)" label="[ hero product shot — dark dashboard render ]" />
      </div>

      <Section n="01" title="Problem">
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ font: '400 16px/1.7 var(--font-body)', color: 'var(--sage)' }}>
            The operations team relied on fragmented legacy tooling and tribal knowledge to make time-critical calls. [ problem narrative ]
          </div>
          <div style={{ borderLeft: '2px solid var(--glow)', paddingLeft: 20, font: 'italic 400 17px/1.55 var(--font-display)', color: 'var(--glow)' }}>
            "Field observation that reframed the problem goes here."
          </div>
        </div>
      </Section>

      <Section n="02" title="Concepts" alt>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, maxWidth: 1100, margin: '0 auto' }}>
          <PlaceholderMedia dark height={360} label="[ early concept explorations ]" />
          <div style={{ font: '400 15px/1.7 var(--font-body)', color: 'var(--sage)' }}>Early concepts tested how much density operators could absorb at a glance.</div>
        </div>
      </Section>

      <Section n="03" title="Pivot">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ background: 'var(--fern)', border: '1px solid var(--hedge)', borderRadius: 6, padding: 32 }}>
            <Eyebrow style={{ marginBottom: 12 }}>INSIGHT</Eyebrow>
            <div style={{ font: '400 15px/1.65 var(--font-body)', color: 'var(--sage)' }}>What research revealed that changed the direction.</div>
          </div>
          <div style={{ background: 'var(--fern)', border: '1px solid var(--hedge)', borderRadius: 6, padding: 32 }}>
            <Eyebrow color="var(--glow)" style={{ marginBottom: 12 }}>OPPORTUNITY</Eyebrow>
            <div style={{ font: '400 15px/1.65 var(--font-body)', color: 'var(--sage)' }}>Where that insight opened a bigger product bet.</div>
          </div>
        </div>
      </Section>

      <Section n="04" title="Product strategy" alt>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, maxWidth: 1100, margin: '0 auto 44px' }}>
          <div style={{ font: '600 12px/1.4 var(--font-mono)', letterSpacing: '0.12em', color: 'var(--glow)' }}>1. DIFFERENTIATE THE EXPERIENCE</div>
          <PlaceholderMedia dark height={340} label="[ screening summary dashboard ]" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, maxWidth: 1100, margin: '0 auto' }}>
          <PlaceholderMedia dark height={340} label="[ live mission timeline view ]" />
          <div style={{ font: '600 12px/1.4 var(--font-mono)', letterSpacing: '0.12em', color: 'var(--glow)' }}>2. BUILD TRUST BY BEING THE SOURCE</div>
        </div>
      </Section>

      <Section n="05" title="Lessons learned">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 760, margin: '0 auto' }}>
          <div>
            <div style={{ font: '600 12px/1.4 var(--font-mono)', letterSpacing: '0.12em', color: 'var(--glow)', marginBottom: 10 }}>1. EARN THE ROOM BEFORE THE ROADMAP</div>
            <div style={{ font: '400 15px/1.7 var(--font-body)', color: 'var(--sage)' }}>[ lesson copy ]</div>
          </div>
          <div>
            <div style={{ font: '600 12px/1.4 var(--font-mono)', letterSpacing: '0.12em', color: 'var(--glow)', marginBottom: 10 }}>2. MAKE THE INVISIBLE WORK VISIBLE</div>
            <div style={{ font: '400 15px/1.7 var(--font-body)', color: 'var(--sage)' }}>[ lesson copy ]</div>
          </div>
        </div>
      </Section>

      <footer style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, padding: 64, background: 'var(--gradient-hero)', alignItems: 'center' }}>
        <div style={{ background: 'var(--glow)', borderRadius: 8, height: 200, display: 'grid', placeItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Jackalope size={40} color="var(--moss)" src="../../assets/jackalope.png" />
            <div style={{ font: '500 32px/1 var(--font-display)', letterSpacing: '0.04em', color: 'var(--moss)' }}>BEACON</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Eyebrow color="var(--lichen)" style={{ fontWeight: 600 }}>TEAM</Eyebrow>
          <div style={{ font: '400 14px/1.5 var(--font-body)', color: 'var(--sage)' }}>Morgan Broacha — Product Designer</div>
          <Button variant="text">Next case study →</Button>
        </div>
      </footer>
    </div>
  );
}
window.CaseStudy = CaseStudy;
