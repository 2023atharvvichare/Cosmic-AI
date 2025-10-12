export const Navigation = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-6 right-6 z-50 animate-fade-in">
      <ul className="flex gap-8 font-mono text-sm">
        <li>
          <button
            onClick={() => scrollToSection('features')}
            className="text-secondary hover:text-foreground transition-colors duration-300"
          >
            Features
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('insights')}
            className="text-secondary hover:text-foreground transition-colors duration-300"
          >
            Insights
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-secondary hover:text-foreground transition-colors duration-300"
          >
            Pricing
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-secondary hover:text-foreground transition-colors duration-300"
          >
            Contact
          </button>
        </li>
      </ul>
    </nav>
  );
};