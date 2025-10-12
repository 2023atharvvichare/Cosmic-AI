const IntroSection = () => {
  return (
    <section className="py-16 text-foreground">
      <div className="sticky top-20">
        <div className="flex flex-col gap-10 p-4 text-center">
          <div className="text-center">
            <span className="px-12 py-2 border-2 border-secondary rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-semibold glow-cyan">
              𖤓 INTRODUCING COSMIC FLOW
            </span>
          </div>
          <div className="tracking-tight p-1 leading-tight md:px-40">
            <span className="text-4xl lg:text-6xl">Your data analytics deserves better. </span>
            <span className="text-4xl lg:text-6xl text-muted-foreground">
              You're racing to extract insights from complex data, but traditional analytics tools slow you down with unnecessary complexity and steep learning curves.
            </span>
            <br />
            <span className="text-5xl lg:text-7xl text-gradient-cyan font-semibold">
              That's why we built Cosmic Flow.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export { IntroSection };
