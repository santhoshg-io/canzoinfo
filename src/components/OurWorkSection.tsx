import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { works } from "@/data/works";

const gradients = [
  "from-amber-600/80 to-orange-900/90",
  "from-blue-600/80 to-indigo-900/90",
  "from-emerald-600/80 to-teal-900/90",
  "from-rose-600/80 to-red-900/90",
  "from-violet-600/80 to-purple-900/90",
];

const OurWorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (dir: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      left: container.scrollLeft + (dir === "left" ? -340 : 340),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let animId: number;
    let maxScroll = 0;

    const measureScroll = () => {
      const container = containerRef.current;
      if (container) {
        maxScroll = container.scrollWidth - container.clientWidth;
      }
    };


    const container = containerRef.current;
    let observer: ResizeObserver | null = null;

    if (container) {
      observer = new ResizeObserver(() => {
        measureScroll();
      });
      observer.observe(container);
      container.addEventListener("load", measureScroll, { capture: true, passive: true });
    }

    const step = () => {
      const container = containerRef.current;
      if (container && !isPaused && maxScroll > 0) {
        if (container.scrollLeft >= maxScroll - 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 0.6;
        }
      }
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      if (observer) {
        observer.disconnect();
      }
      if (container) {
        container.removeEventListener("load", measureScroll, { capture: true });
      }
    };
  }, [isPaused]);

  return (
    <section id="our-work" className="py-section bg-[#f4f2eb]">
      <div className="container">
        <div className="flex items-end justify-between mb-[clamp(1.5rem,3vw,2.5rem)]">
          <div>
            <h2 className="text-fluid-h2 font-display font-bold">
              Our <span className="text-gradient">Work</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md text-fluid-body">
              See how Canzo is transforming campus food experiences.
            </p>
          </div>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2.5 rounded-full border border-border hover:border-accent/40 hover:bg-card transition-all"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2.5 rounded-full border border-border hover:border-accent/40 hover:bg-card transition-all"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {works.map((work, i) => (
            <motion.div
              key={work.slug}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex-shrink-0 w-[min(85vw,340px)] min-h-[260px] rounded-2xl overflow-hidden relative cursor-pointer group bg-muted"
            >
              <Link
                to={`/our-work/${work.slug}`}
                className="block absolute inset-0 z-10"
                aria-label={`Read story: ${work.title}`}
              />
              <img
                src={work.thumbnail}
                alt={work.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${gradients[i % gradients.length]} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white pointer-events-none">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-semibold uppercase tracking-wider">
                    {work.category}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg leading-snug mb-1.5">
                    {work.title}
                  </h3>
                  <p className="text-white/80 text-xs leading-relaxed line-clamp-2">
                    {work.subtitle}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/90">
                    Read story
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/20 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWorkSection;
