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

        // If the card is taller than the screen, stick when its bottom reaches the screen's bottom.
        // If it's shorter, stick immediately at the top.
        if (height > windowHeight) {
          card.style.top = `${windowHeight - height}px`;
        } else {
          card.style.top = "0px";
        }
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
        // Start the effect when the bottom of the section comes up to 45% of the viewport (nextRect.top is the top of the next card)
        const threshold = windowHeight * 0.45;

        if (nextRect.top < threshold) {
          // Calculate progress from 1 (at threshold) to 0 (at 0 or below)
          const progress = Math.max(0, Math.min(1, nextRect.top / threshold));
          
          // Map progress to scale, brightness, and blur
          const newScale = 0.93 + (progress * 0.07); // Scales down to 0.93
          const brightness = 0.5 + (progress * 0.5); // Dims to 50% brightness
          const blur = (1 - progress) * 3; // Blurs up to 3px

          card.style.transform = `scale(${newScale})`;
          card.style.filter = `brightness(${brightness}) blur(${blur}px)`;
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
