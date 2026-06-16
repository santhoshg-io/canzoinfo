import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X, ChevronLeft } from "lucide-react";
import Footer from "@/components/Footer";
import { getWork, getAdjacent } from "@/data/works";

const WorkDetailPage = () => {
  const { slug = "" } = useParams();
  const work = getWork(slug);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (!work) return;
    const prevTitle = document.title;
    document.title = `${work.title} — CANZO`;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", work.metaDescription);
    return () => {
      document.title = prevTitle;
    };
  }, [work]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!work) return <Navigate to="/" replace />;
  const { prev, next } = getAdjacent(work.slug);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[70vh] min-h-[480px] w-full overflow-hidden"
      >
        <img src={work.hero} alt={work.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="container relative h-full flex flex-col justify-end pb-12 sm:pb-16">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl"
          >
            <Link
              to="/#our-work"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Our Work
            </Link>
            <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              {work.category}
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-bold leading-[1.05]">{work.title}</h1>
            <p className="mt-4 text-lg sm:text-xl text-muted-foreground max-w-2xl">{work.subtitle}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats */}
      <section className="container -mt-10 sm:-mt-12 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xl p-4 sm:p-6 shadow-xl"
        >
          {work.stats.map((s) => (
            <div key={s.label} className="text-center px-2">
              <div className="text-2xl sm:text-3xl font-display font-bold text-accent">{s.value}</div>
              <div className="text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Content */}
      <section className="container py-16 sm:py-20 max-w-3xl">
        <div className="space-y-7">
          {work.sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
            >
              {s.kind === "heading" && (
                <h2 className="text-2xl sm:text-3xl font-display font-bold mt-6">{s.text}</h2>
              )}
              {s.kind === "paragraph" && (
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">{s.text}</p>
              )}
              {s.kind === "list" && (
                <ul className="grid sm:grid-cols-2 gap-3">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/40 backdrop-blur-md p-4"
                    >
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-sm sm:text-base">{it}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.kind === "quote" && (
                <blockquote className="relative border-l-4 border-accent pl-6 py-4 my-6 text-xl sm:text-2xl font-display italic">
                  "{s.text}"
                </blockquote>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {work.gallery.length > 0 && (
        <section className="container pb-20">
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {work.gallery.map((src, i) => (
              <motion.button
                key={`${src}-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setLightbox(src)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 bg-muted"
              >
                <img
                  src={src}
                  alt={`${work.title} ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <section className="container pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to={`/our-work/${prev.slug}`}
            className="group rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-6 hover:border-accent/50 transition-all"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <ArrowLeft className="w-4 h-4" /> Previous
            </div>
            <div className="mt-2 font-display font-bold text-lg group-hover:text-accent transition-colors">
              {prev.title}
            </div>
          </Link>
          <Link
            to={`/our-work/${next.slug}`}
            className="group rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-6 hover:border-accent/50 transition-all sm:text-right"
          >
            <div className="flex sm:justify-end items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              Next <ArrowRight className="w-4 h-4" />
            </div>
            <div className="mt-2 font-display font-bold text-lg group-hover:text-accent transition-colors">
              {next.title}
            </div>
          </Link>
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/#our-work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border hover:border-accent/50 hover:bg-card/60 transition-all text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Our Work
          </Link>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-card/80 border border-border hover:bg-card"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={lightbox}
              alt="Preview"
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkDetailPage;
