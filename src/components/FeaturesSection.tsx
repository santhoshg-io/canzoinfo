import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Clock, Search, ShoppingCart, Wifi, LayoutGrid } from "lucide-react";

const features = [
  { icon: MapPin, title: "Location-Based Canteens", desc: "Find canteens by your college campus location." },
  { icon: Clock, title: "Meal-Time Menus", desc: "Morning, lunch, or evening — menus update by time." },
  { icon: Search, title: "Real-Time Search", desc: "Search for your favourite dishes instantly." },
  { icon: ShoppingCart, title: "Cart & Instant Ordering", desc: "Add items, checkout, and place orders in seconds." },
  { icon: Wifi, title: "Open / Closed Status", desc: "Know which canteens are active right now." },
  { icon: LayoutGrid, title: "Category Browsing", desc: "Pizza, biryani, juices, mocktails — browse by category." },
];

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!isInView) {
      setActiveIndex(-1);
      return;
    }

    setActiveIndex(0);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 2200);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="features" className="py-section">
      <div className="container" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-[clamp(2rem,4vw,4rem)]"
        >
          <h2 className="text-fluid-h2 font-display font-bold">
            Everything you need to <span className="text-gradient">order smarter.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-fluid-body">
            Canzo packs powerful features into a simple, student-friendly interface.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[var(--space-gap)]">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              animate={
                activeIndex === i
                  ? { scale: 1.08, y: -12 }
                  : { scale: 1, y: 0 }
              }
              className={`p-6 rounded-2xl bg-card border transition-all duration-500 cursor-default ${
                activeIndex === i
                  ? "border-accent glow-amber shadow-lg"
                  : "border-border"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-500 ${
                activeIndex === i ? "bg-accent/25" : "bg-accent/15"
              }`}>
                <f.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
