// Phase 2 placeholder — full sections will be assembled in Phase 3 & 4
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Phase 3: Hero Bento Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center pt-16"
      >
        <div className="text-center space-y-4">
          <p className="text-muted-foreground text-sm font-mono tracking-widest uppercase">
            Phase 2 Complete
          </p>
          <h1 className="text-5xl font-bold gradient-text">
            Cursor is Live 🎇
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Move your mouse around to see the 3D glitter cursor in action.
            Hero bento section coming in Phase 3.
          </p>
        </div>
      </section>

      {/* Placeholder sections for nav testing */}
      <section id="experience" className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-mono">Experience section — Phase 3</p>
      </section>
      <section id="work" className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-mono">Work carousel — Phase 3</p>
      </section>
      <section id="github" className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-mono">GitHub heatmap — Phase 4</p>
      </section>
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-mono">Contact form — Phase 4</p>
      </section>
    </div>
  );
}
