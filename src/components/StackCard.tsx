import React, { useEffect, useRef, ReactNode } from "react";

interface StackCardProps {
  children: ReactNode;
  zIndex: number;
  className?: string;
}

interface CardInstance {
  card: HTMLDivElement;
  getHeight: () => number;
  updateStickyTop: (height: number, windowHeight: number, isMobile: boolean) => void;
  updateScroll: (nextCardRect: DOMRect | null, windowHeight: number) => void;
  getNextCard: () => HTMLElement | null;
}

// Global coordinator for stack card scrolling and resizing to prevent forced reflows (layout thrashing)
const activeCards = new Set<CardInstance>();
let globalScrollRaf: number | null = null;
let listenersRegistered = false;

const runGlobalUpdate = () => {
  const windowHeight = window.innerHeight;
  const isMobile = window.innerWidth <= 767;

  // 1. Read phase: get rects of next elements first (batched)
  const updates: Array<{
    instance: CardInstance;
    nextRect: DOMRect | null;
  }> = [];

  for (const instance of activeCards) {
    if (isMobile && !instance.card.classList.contains("stack-card-combined")) {
      const nextCard = instance.getNextCard();
      updates.push({
        instance,
        nextRect: nextCard ? nextCard.getBoundingClientRect() : null,
      });
    } else {
      updates.push({
        instance,
        nextRect: null,
      });
    }
  }

  // 2. Write phase: update styles (batched)
  for (const { instance, nextRect } of updates) {
    instance.updateScroll(nextRect, windowHeight);
  }
};

const triggerGlobalUpdate = () => {
  if (globalScrollRaf !== null) {
    cancelAnimationFrame(globalScrollRaf);
  }
  globalScrollRaf = requestAnimationFrame(() => {
    runGlobalUpdate();
    globalScrollRaf = null;
  });
};

const globalResizeHandler = () => {
  const windowHeight = window.innerHeight;
  const isMobile = window.innerWidth <= 767;

  // 1. Read phase: get heights of all cards
  const heights = new Map<CardInstance, number>();
  for (const instance of activeCards) {
    heights.set(instance, instance.getHeight());
  }

  // 2. Write phase: update styles
  for (const instance of activeCards) {
    const height = heights.get(instance) || 0;
    instance.updateStickyTop(height, windowHeight, isMobile);
  }

  triggerGlobalUpdate();
};

const registerCardInstance = (instance: CardInstance) => {
  activeCards.add(instance);
  if (!listenersRegistered) {
    window.addEventListener("scroll", triggerGlobalUpdate, { passive: true });
    window.addEventListener("resize", globalResizeHandler, { passive: true });
    listenersRegistered = true;
  }
};

const unregisterCardInstance = (instance: CardInstance) => {
  activeCards.delete(instance);
  if (activeCards.size === 0 && listenersRegistered) {
    window.removeEventListener("scroll", triggerGlobalUpdate);
    window.removeEventListener("resize", globalResizeHandler);
    listenersRegistered = false;
    if (globalScrollRaf !== null) {
      cancelAnimationFrame(globalScrollRaf);
      globalScrollRaf = null;
    }
  }
};

const StackCard: React.FC<StackCardProps> = ({ children, zIndex, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const getHeight = () => {
      return card.offsetHeight;
    };

    const updateStickyTop = (height: number, windowHeight: number, isMobile: boolean) => {
      if (card.classList.contains("stack-card-combined")) {
        card.style.top = "";
        return;
      }

      if (isMobile) {
        card.style.top = `${windowHeight * 0.5 - height}px`;
      } else {
        card.style.top = "";
      }
    };

    const getNextCard = () => card.nextElementSibling as HTMLElement;

    const updateScroll = (nextRect: DOMRect | null, windowHeight: number) => {
      if (window.innerWidth > 767) {
        card.style.transform = "";
        card.style.filter = "";
        card.style.transformOrigin = "";
        card.style.willChange = "";
        card.style.borderTopColor = "";
        card.style.boxShadow = "";
        return;
      }

      if (card.classList.contains("stack-card-combined")) {
        return;
      }

      if (nextRect) {
        const startScrollY = windowHeight * 0.5;
        const endScrollY = 0;

        if (nextRect.top < startScrollY) {
          const totalDistance = startScrollY - endScrollY;
          const currentDistance = startScrollY - nextRect.top;
          const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
          
          const newScale = 1 - (progress * 0.08);
          const brightness = 1 - (progress * 0.5);
          const rotateX = progress * 3.5;
          const translateY = progress * 12;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) scale(${newScale}) translateY(${translateY}px)`;
          card.style.filter = `brightness(${brightness})`;
          card.style.transformOrigin = "top center";
          card.style.willChange = "transform, filter";

          card.style.borderTopColor = `rgba(245, 158, 11, ${progress * 0.6})`;
          card.style.boxShadow = `0 -12px 32px -12px rgba(0, 0, 0, 0.4), 0 -4px 16px -2px rgba(245, 158, 11, ${progress * 0.3})`;
        } else {
          card.style.transform = "";
          card.style.filter = "";
          card.style.transformOrigin = "";
          card.style.willChange = "";
          card.style.borderTopColor = "";
          card.style.boxShadow = "";
        }
      } else {
        card.style.transform = "";
        card.style.filter = "";
        card.style.transformOrigin = "";
        card.style.willChange = "";
        card.style.borderTopColor = "";
        card.style.boxShadow = "";
      }
    };

    const instance: CardInstance = {
      card,
      getHeight,
      updateStickyTop,
      updateScroll,
      getNextCard,
    };

    registerCardInstance(instance);

    const observer = new ResizeObserver(() => {
      globalResizeHandler();
    });
    observer.observe(card);

    return () => {
      unregisterCardInstance(instance);
      observer.disconnect();
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
