import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Briefcase, ChevronDown, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const jobs = [
  {
    id: "fullstack",
    title: "Full Stack Developer",
    type: "Full-Time",
    location: "Remote / Hybrid",
    description: "We are looking for an experienced Full Stack Developer to help build and scale Canzo's core platform, integrating seamlessly between front-end interfaces and back-end logic.",
    requirements: [
      "3+ years of experience in full stack web development.",
      "Proficiency in React, Node.js, and modern TypeScript.",
      "Experience with PostgreSQL or MongoDB databases.",
      "Familiarity with RESTful APIs and GraphQL."
    ]
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    type: "Full-Time",
    location: "Remote",
    description: "Join our team to build highly responsive, performant, and beautiful user interfaces that students and canteen partners will love using every day.",
    requirements: [
      "Strong proficiency in React, TypeScript, and modern CSS/Tailwind.",
      "Experience building responsive and accessible web applications.",
      "Familiarity with state management libraries like Redux or Zustand.",
      "Passion for creating smooth animations (Framer Motion is a plus)."
    ]
  },
  {
    id: "backend",
    title: "Backend Developer",
    type: "Full-Time",
    location: "Hybrid",
    description: "Design and implement scalable APIs and robust backend services that power Canzo's high-traffic ordering system and partner dashboards.",
    requirements: [
      "Solid experience with Node.js, Express, or similar backend frameworks.",
      "Deep understanding of database design and performance optimization.",
      "Experience with AWS, Docker, and CI/CD pipelines.",
      "Focus on writing clean, secure, and testable code."
    ]
  },
  {
    id: "uiux",
    title: "UI/UX Designer",
    type: "Full-Time",
    location: "Remote",
    description: "Shape the future of campus dining by designing intuitive, engaging, and premium user experiences across the Canzo ecosystem.",
    requirements: [
      "A strong portfolio showcasing user-centered design solutions.",
      "Proficiency in Figma, prototyping, and wireframing.",
      "Experience conducting user research and usability testing.",
      "Excellent visual design skills and understanding of typography."
    ]
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

        <div className="container relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          {/* Hero */}
          <motion.div {...fadeUp} className="max-w-2xl mx-auto mb-16 text-center">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-4">
              💼 Join Our Team
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
              Shape the future of<br />
              <span className="text-gradient">campus dining.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Canzo, we're building the ultimate campus food platform. We're looking for passionate, driven individuals to join us in revolutionizing how students and canteens connect.
            </p>
          </motion.div>

          {/* Open Roles Section */}
          <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-display font-bold mb-8 text-center">
            Current <span className="text-gradient">Openings</span>
          </motion.h2>

          <div className="max-w-4xl mx-auto flex flex-col gap-4 mb-20">
            {jobs.map((job, i) => {
              const isSelected = selectedJob === job.id;
              
              return (
                <motion.div 
                  key={job.id} 
                  {...fadeUp} 
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`border transition-all duration-300 rounded-2xl overflow-hidden ${isSelected ? 'bg-card border-accent/40 shadow-md' : 'bg-card border-border hover:border-accent/30'}`}
                >
                  <div 
                    className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    onClick={() => setSelectedJob(isSelected ? null : job.id)}
                  >
                    <div>
                      <h3 className="text-xl font-display font-semibold text-foreground">{job.title}</h3>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Briefcase className="w-4 h-4"/> {job.type}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button 
                        variant={isSelected ? "default" : "outline"}
                        className={`rounded-full transition-colors ${isSelected ? 'bg-accent text-accent-foreground hover:bg-amber-hover' : ''}`}
                      >
                        {isSelected ? "Hide Details" : "View Details"}
                        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border-t border-border overflow-hidden"
                      >
                        <div className="p-6 sm:p-8 bg-black/20">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <h4 className="font-semibold text-foreground mb-2">Role Description</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                              {job.description}
                            </p>

                            <h4 className="font-semibold text-foreground mb-3">Requirements</h4>
                            <ul className="space-y-2 mb-8">
                              {job.requirements.map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                  <span className="leading-relaxed">{req}</span>
                                </li>
                              ))}
                            </ul>

                            <Button
                              onClick={() => {
                                window.scrollTo(0, 0);
                                navigate(`/careers/apply?role=${encodeURIComponent(job.title)}`);
                              }}
                              className="inline-flex items-center gap-2.5 px-8 py-5 rounded-full bg-accent text-accent-foreground font-semibold text-base hover:bg-amber-hover transition-all glow-amber"
                            >
                              Apply for this role
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CareersPage;
