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

    const observer = new ResizeObserver(() => {
      const card = cardRef.current;
      if (!card) return;

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
    });

    observer.observe(cardRef.current);

    return () => observer.disconnect();
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
