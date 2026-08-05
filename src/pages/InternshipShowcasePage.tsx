import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Cpu, 
  Award, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ExternalLink, 
  ShieldCheck,
  Compass,
  Trophy,
  Layers,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { showcaseData } from "@/data/showcaseData";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

const InternshipShowcasePage = () => {
  const { collegeId } = useParams<{ collegeId: string }>();
  const college = showcaseData[collegeId || ""];

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!college) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <GraduationCap className="w-16 h-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">Showcase Not Found</h1>
          <p className="text-muted-foreground mb-6 max-w-md">
            The internship showcase for this institution is currently being prepared. Check back soon!
          </p>
          <Link to="/internship">
            <Button className="bg-accent text-accent-foreground hover:bg-amber-hover font-semibold">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Internships
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle lightbox navigation
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + college.gallery.length) % college.gallery.length);
    }
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % college.gallery.length);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 sm:pb-16 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-amber-500/10 blur-[90px] pointer-events-none" />

        <div className="container relative z-10">
          <Link 
            to="/internship" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Internship Program
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl text-left"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              🎓 Institution Showcase
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight mb-4 text-foreground leading-tight drop-shadow-sm">
              {college.collegeName}
            </h1>
            <p className="text-accent text-lg sm:text-xl md:text-2xl font-display font-semibold mb-4 leading-relaxed">
              {college.internshipTitle}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
              {college.shortDescription}
            </p>
          </motion.div>

          {/* Banner image displayed below the text content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
          >
            <img 
              src={college.coverImage} 
              alt={college.collegeName} 
              className="w-full object-cover aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3/1]"
            />
          </motion.div>
        </div>
      </section>

      {/* Internship Overview Section */}
      <section className="py-16 sm:py-20 border-t border-border relative">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            
            {/* Left side: Main text and objectives */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div {...fadeUp}>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
                  {college.overview.skillsTitle ? (
                    <span>
                      {college.overview.skillsTitle.split('&')[0]}
                      {college.overview.skillsTitle.includes('&') && (
                        <>
                          & <span className="text-gradient">{college.overview.skillsTitle.split('&')[1]}</span>
                        </>
                      )}
                    </span>
                  ) : (
                    <>
                      Program <span className="text-gradient">Overview</span>
                    </>
                  )}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {college.overview.description}
                </p>
              </motion.div>

              <motion.div {...fadeUp} className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
                <h3 className="text-lg sm:text-xl font-display font-bold text-foreground mb-5 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-accent" /> {college.overview.skillsSubtitle || "Objectives"}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {college.overview.objectives.map((obj, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right side: Meta Specs */}
            <div className="space-y-6">
              <motion.div {...fadeUp} className="p-6 rounded-2xl bg-card border border-border space-y-5">
                <div className="border-b border-border/50 pb-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Duration</span>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Calendar className="w-4 h-4 text-accent shrink-0" />
                    <span className="font-semibold text-foreground text-sm">{college.overview.duration}</span>
                  </div>
                </div>

                <div className="border-b border-border/50 pb-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Skills Acquired</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {college.overview.skillsLearned.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-lg bg-accent/10 border border-accent/20 text-accent-foreground text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Outcomes</span>
                  <ul className="space-y-2 mt-2 text-xs text-muted-foreground">
                    {college.overview.outcomes.map((outcome, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Top Performers Section */}
      <section className="py-16 sm:py-20 bg-muted/30 border-t border-border">
        <div className="container">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/15 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-3">
              🏆 Top Talent
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground">
              Top <span className="text-gradient">Performers</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3">
              Recognizing outstanding contribution, dedication, and excellence during the internship cohort.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {college.topPerformers.map((performer, idx) => {
              // Extracting name to match certificate database IDs
              const matches = performer.name.toLowerCase();
              let certId = "";
              if (matches.includes("santhosh")) certId = "cz-ip-fpd-011";
              else if (matches.includes("prabu")) certId = "cz-ip-fpd-012";
              else if (matches.includes("ganesh")) certId = "cz-ip-fpd-013";
              else if (matches.includes("kayalvizhi")) certId = "cz-ip-fpd-014";

              return (
                <motion.div 
                  key={performer.name}
                  variants={fadeUp}
                  className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div>
                    {/* Achievement Poster Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative shrink-0 border-b border-border">
                      <img 
                        src={performer.photoUrl} 
                        alt={`${performer.name} Achievement Poster`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-6 flex flex-col items-center text-center">
                      {performer.award && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-300 text-[11px] font-bold tracking-wider uppercase mb-2 shadow-sm transition-all duration-300">
                          <Trophy className="w-3 h-3 shrink-0 text-amber-600 dark:text-amber-400" />
                          {performer.award}
                        </span>
                      )}

                      <h3 className="font-display font-bold text-foreground text-lg">{performer.name}</h3>
                      <span className="text-xs text-muted-foreground font-medium mt-0.5">{performer.role}</span>
                      
                      {performer.recognition && (
                        <p className="text-xs text-muted-foreground leading-relaxed mt-4 bg-muted/50 p-3 rounded-xl border border-border/40 w-full min-h-[56px] italic">
                          "{performer.recognition}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    {certId ? (
                      <Link 
                        to={`/internship/verify?cert=${certId}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 transition-colors text-xs font-semibold"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verify Certificate
                      </Link>
                    ) : (
                      <div className="w-full py-2 border border-border/50 text-muted-foreground text-center rounded-xl text-xs font-medium cursor-not-allowed">
                        Certificate Verified
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Projects Built During Internship Section */}
      <section className="py-16 sm:py-20 border-t border-border">
        <div className="container">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/15 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-3">
              <Cpu className="w-3.5 h-3.5" /> Applied Engineering
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground">
              Projects <span className="text-gradient">Built</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3">
              Working applications built by students using clean architectures and cloud distributions.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {college.projects.map((project, idx) => (
              <motion.div 
                key={project.name} 
                {...fadeUp}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                  <div>
                    <h3 className="font-display font-bold text-foreground text-xl mb-2 group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground border border-border/40">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Gallery Section */}
      <section className="py-16 sm:py-20 bg-muted/30 border-t border-border">
        <div className="container">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/15 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider mb-3">
              📷 Cohort Memories
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground">
              Event & <span className="text-gradient">Certificate Gallery</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3">
              Highlights from certificate handovers, group interactions, and campus activities.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {college.gallery.map((item, index) => (
              <motion.div 
                key={index} 
                {...fadeUp}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-border bg-card cursor-pointer hover:border-accent/40 shadow-sm transition-all"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={item.url} 
                  alt={item.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                


              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Highlights Section */}
      {college.highlights && (
        <section className="py-16 sm:py-20 border-t border-border">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
              
              {/* Journey Timeline */}
              <div className="space-y-8">
                <motion.div {...fadeUp}>
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">Timeline Journey</span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-1 mb-2">
                    Internship <span className="text-gradient">Journey</span>
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Step-by-step framework student interns complete to build full stack engineering capacities.
                  </p>
                </motion.div>

                <div className="relative border-l-2 border-border pl-6 ml-3 space-y-8">
                  {college.highlights.journey.map((step, idx) => (
                    <motion.div 
                      key={step.step} 
                      {...fadeUp}
                      className="relative"
                    >
                      {/* Circle Node */}
                      <div className="absolute -left-[35px] top-1 w-6 h-6 rounded-full bg-background border-2 border-accent flex items-center justify-center text-[10px] font-bold text-accent shadow-sm">
                        {step.step}
                      </div>

                      <h3 className="font-display font-bold text-foreground text-base sm:text-lg mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Milestones & Success stories */}
              <div className="space-y-12">
                <div className="space-y-8">
                  <motion.div {...fadeUp}>
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">Key Achievements</span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-1 mb-2">
                      Milestones & <span className="text-gradient">Impact</span>
                    </h2>
                  </motion.div>

                  <div className="space-y-4">
                    {college.highlights.milestones.map((m, i) => (
                      <motion.div 
                        key={i} 
                        {...fadeUp}
                        className="p-4 rounded-xl bg-card border border-border flex gap-4 items-start"
                      >
                        <div className="px-2 py-1 rounded bg-accent/10 border border-accent/20 text-accent text-[10px] font-mono font-bold shrink-0 mt-0.5">
                          {m.date}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-sm">{m.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {college.highlights.successStories.length > 0 && (
                  <div className="space-y-6 pt-4 border-t border-border/60">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">Success Stories</span>
                    {college.highlights.successStories.map((story, i) => (
                      <motion.div 
                        key={i} 
                        {...fadeUp}
                        className="p-6 rounded-2xl bg-accent/5 border border-accent/10 relative"
                      >
                        <span className="absolute top-4 right-6 text-6xl text-accent/20 font-serif leading-none select-none">“</span>
                        <p className="text-sm text-muted-foreground leading-relaxed relative z-10 italic">
                          "{story.quote}"
                        </p>
                        
                        <div className="flex items-center gap-3 mt-4 relative z-10">
                          {story.photoUrl && (
                            <img 
                              src={story.photoUrl} 
                              alt={story.studentName} 
                              className="w-9 h-9 rounded-full object-cover border border-accent/30"
                            />
                          )}
                          <div>
                            <h4 className="font-bold text-foreground text-xs">{story.studentName}</h4>
                            <span className="text-[10px] text-muted-foreground">EASA Student Intern</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-between p-4"
            onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-white/80 p-2 sm:p-4 z-10">
              <span className="text-xs font-mono">
                {lightboxIndex + 1} / {college.gallery.length}
              </span>
              <button 
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 transition-colors border border-white/10"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Main Image content area */}
            <div className="flex-1 w-full flex items-center justify-center relative max-h-[80vh] px-2 sm:px-12">
              <button 
                onClick={showPrevImage}
                className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/15 transition-colors border border-white/10 text-white z-10"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <motion.img 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={college.gallery[lightboxIndex].url} 
                alt={college.gallery[lightboxIndex].caption} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()} // stop click bubbling to close it
              />

              <button 
                onClick={showNextImage}
                className="absolute right-2 sm:right-4 p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/15 transition-colors border border-white/10 text-white z-10"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Bottom Caption Area */}
            <div className="w-full max-w-2xl text-center p-4 sm:p-6 text-white z-10">

              <p className="text-base text-white/90">
                {college.gallery[lightboxIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default InternshipShowcasePage;
