import { useRef, useEffect } from "react";
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

  const scroll = (dir: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      left: container.scrollLeft + (dir === "left" ? -340 : 340),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isHovered = false;

    const handleMouseEnter = () => {
      isHovered = true;
    };
    const handleMouseLeave = () => {
      isHovered = false;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchstart", handleMouseEnter, { passive: true });
    container.addEventListener("touchend", handleMouseLeave, { passive: true });

    const speed = 0.8; // px per frame (adjust for scrolling speed)

    const step = () => {
      if (container) {
        if (!isHovered) {
          // Calculate the exact width of a single set of works based on the offset of the duplicated set
          const firstCardOfSecondSet = container.children[works.length] as HTMLElement;
          const firstCardOfFirstSet = container.children[0] as HTMLElement;
          if (firstCardOfSecondSet && firstCardOfFirstSet) {
            const setWidth = firstCardOfSecondSet.offsetLeft - firstCardOfFirstSet.offsetLeft;
            if (container.scrollLeft >= setWidth) {
              container.scrollLeft -= setWidth;
            } else {
              container.scrollLeft += speed;
            }
          } else {
            // Fallback scroll
            container.scrollLeft += speed;
          }
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("touchstart", handleMouseEnter);
        container.removeEventListener("touchend", handleMouseLeave);
      }
    };
  }, []);

  // Triple the works array so there's always enough content to scroll seamlessly
  const triplicatedWorks = [...works, ...works, ...works];

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
        >
          {triplicatedWorks.map((work, i) => (
            <motion.div
              key={`${work.slug}-${i}`}
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
