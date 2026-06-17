import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StickyCTA = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="sticky-cta"
        >
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-sm text-foreground leading-tight truncate">
              Ready to try Canzo?
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              Smart campus food, in seconds.
            </p>
          </div>
          <a
            href="https://play.google.com/store/apps/details?id=canzo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-12 px-5 rounded-full bg-accent text-accent-foreground font-semibold text-sm shadow-md hover:bg-amber-hover transition-colors whitespace-nowrap"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;