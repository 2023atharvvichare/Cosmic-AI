import { useEffect, useRef, useState } from 'react';

export const useScrollFade = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const isScrollingRef = useRef(false);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Disable standard scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    // Get all sections
    sectionsRef.current = Array.from(document.querySelectorAll('section'));
    
    // Show first section
    if (sectionsRef.current[0]) {
      sectionsRef.current[0].classList.add('visible');
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrollingRef.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSection + direction;

      if (nextSection >= 0 && nextSection < sectionsRef.current.length) {
        isScrollingRef.current = true;

        // Fade out current section
        sectionsRef.current[currentSection].classList.add('fade-out');
        sectionsRef.current[currentSection].classList.remove('visible');

        setTimeout(() => {
          // Fade in next section
          sectionsRef.current[nextSection].classList.remove('fade-out');
          sectionsRef.current[nextSection].classList.add('visible');
          setCurrentSection(nextSection);

          setTimeout(() => {
            isScrollingRef.current = false;
          }, 800);
        }, 600);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, [currentSection]);
};
