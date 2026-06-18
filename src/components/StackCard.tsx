import React, { useEffect, useRef, ReactNode } from "react";

interface StackCardProps {
  children: ReactNode;
  zIndex: number;
  className?: string;
}

const StackCard: React.FC<StackCardProps> = ({ children, zIndex, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const updateStickyTop = () => {
      // If it's the combined card, we don't want to calculate sticky top because it uses relative positioning.
      if (card.classList.contains("stack-card-combined")) {
        card.style.top = "";
        return;
      }

      // Only apply dynamic sticky behavior on mobile
      if (window.innerWidth <= 767) {
        const height = card.offsetHeight;
        const windowHeight = window.innerHeight;

        // Stick such that the bottom of the card is exactly at 50% of the mobile screen height
        card.style.top = `${windowHeight * 0.5 - height}px`;
      } else {
        card.style.top = "";
      }
    };

    const handleScroll = () => {
      if (window.innerWidth > 767) {
        card.style.transform = "";
        card.style.filter = "";
        card.style.transformOrigin = "";
        card.style.willChange = "";
        return;
      }

      if (card.classList.contains("stack-card-combined")) {
        return;
      }

      const nextCard = card.nextElementSibling as HTMLElement;
      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // The animation starts when the next card's top reaches 50% of screen height (bottom of stuck card)
        // and completes when next card reaches the top of the screen (0px).
        const startScrollY = windowHeight * 0.5;
        const endScrollY = 0;

        if (nextRect.top < startScrollY) {
          // Calculate progress from 0 (at 50% screen height) to 1 (at top of screen)
          const totalDistance = startScrollY - endScrollY;
          const currentDistance = startScrollY - nextRect.top;
          const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
          
          // Map progress to scale and brightness (no blur)
          const newScale = 1 - (progress * 0.08); // Scales down from 1.0 to 0.92
          const brightness = 1 - (progress * 0.5); // Dims from 1.0 to 0.5 brightness

          card.style.transform = `scale(${newScale})`;
          card.style.filter = `brightness(${brightness})`;
          card.style.transformOrigin = "top center";
          card.style.willChange = "transform, filter";
        } else {
          card.style.transform = "";
          card.style.filter = "";
          card.style.transformOrigin = "";
          card.style.willChange = "";
        }
      }
    };

    updateStickyTop();
    handleScroll();

    const observer = new ResizeObserver(() => {
      updateStickyTop();
      handleScroll();
    });
    observer.observe(card);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`stack-card ${className}`}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
};

export default StackCard;
