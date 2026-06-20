import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import canzoLogo from "@/assets/logohero.png";
import heroVideo from "@/assets/hero1.webm";
import cardStudents from "@/assets/cardstudent.png";
import cardCanteen from "@/assets/cardcanteen.png";
import cardInternship from "@/assets/intership.png";

import StackCard from "./StackCard";

const ctaAnim = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2, type: "spring" as const, stiffness: 220, damping: 18 },
  },
};

const categories = [
  {
    title: "STUDENTS",
    subtitle: "Order & Discover",
    desc: "Browse menus, place orders instantly, skip the queue.",
    path: "/student",
    image: cardStudents,
  },
  {
    title: "COLLEGES & CANTEENS",
    subtitle: "Partner & Grow",
    desc: "Go live on Canzo, manage orders, and boost revenue.",
    path: "/colleges-canteens",
    image: cardCanteen,
  },
  {
    title: "INTERNSHIP PROGRAM",
    subtitle: "Learn & Earn Certificates",
    desc: "Gain real-world experience and get certified with Canzo.",
    path: "/internship",
    image: cardInternship,
  },
];

// Phase state machine:
// "intro"   → 0–2s: logo visible, video hidden (initial splash)
// "playing" → video playing, logo hidden
// "outro"   → video ended: logo visible for 3s, then loop back to playing
type Phase = "intro" | "playing" | "outro";

const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  
  const [time, setTime] = useState(new Date());
  const [phase, setPhase] = useState<Phase>("intro");
  const videoRef = useRef<HTMLVideoElement>(null);

  const showLogo = phase === "intro" || phase === "outro";
  const showVideo = phase === "playing";

  // Live clock tick
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // INTRO → PLAYING: after 2 seconds, start video
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("playing");
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []); // runs once on mount

  // OUTRO → PLAYING: after 3 seconds of outro, replay video
  useEffect(() => {
    if (phase === "outro") {
      const timer = setTimeout(() => {
        setPhase("playing");
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Video ends → switch to outro
  const handleVideoEnded = () => {
    setPhase("outro");
  };

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = ((hours % 12) + minutes / 60) * 30;
  const minuteDegrees = (minutes + seconds / 60) * 6;
  const secondDegrees = seconds * 6;
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(12px)"]);

  return (
    <>
      {/* Premium 100dvh Hero */}
      <StackCard zIndex={0}>
        <section 
          ref={ref} 
          className="relative w-full h-[100dvh] overflow-hidden flex items-center justify-center transition-colors duration-1000" 
          style={{ backgroundColor: showVideo ? "#000000" : "hsl(var(--primary) / 0.05)" }}
        >
          {/* Parallax Background */}
          <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
            <video 
              ref={videoRef}
              src={heroVideo} 
              autoPlay 
              muted 
              playsInline
              onEnded={handleVideoEnded}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${showVideo ? "opacity-70" : "opacity-0"}`}
            />
          </motion.div>

          {/* Hero Content */}
          <motion.div style={{ opacity: contentOpacity, scale: contentScale, filter: blur }} className="absolute inset-y-0 left-0 right-0 z-10 container mx-auto px-4 pointer-events-none">
            
            {/* Logo and Tagline Centered at 45% */}
            <div className="absolute top-[45%] left-0 right-0 -translate-y-1/2 flex flex-col items-center text-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative mb-3 pointer-events-auto w-full"
                style={{ 
                  maxWidth: "min(90vw, min(700px, calc(25vh * 2.8)))", 
                  aspectRatio: "1778/634" 
                }}
              >
                <img 
                  src={canzoLogo} 
                  alt="Canzo Logo" 
                  className="w-full h-full object-contain" 
                />
                
                {/* Real-time Clock overlay */}
                <div 
                  className="absolute"
                  style={{
                    left: "87.50%",
                    top: "53.16%",
                    width: "15.43%",
                    height: "42.72%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                    <line x1={50} y1={50} x2={50 + 25 * Math.sin((hourDegrees * Math.PI) / 180)} y2={50 - 25 * Math.cos((hourDegrees * Math.PI) / 180)} stroke="#2d3748" strokeWidth={5} strokeLinecap="round" />
                    <line x1={50} y1={50} x2={50 + 35 * Math.sin((minuteDegrees * Math.PI) / 180)} y2={50 - 35 * Math.cos((minuteDegrees * Math.PI) / 180)} stroke="#2d3748" strokeWidth={3.5} strokeLinecap="round" />
                    <line x1={50} y1={50} x2={50 + 38 * Math.sin((secondDegrees * Math.PI) / 180)} y2={50 - 38 * Math.cos((secondDegrees * Math.PI) / 180)} stroke="#e8a838" strokeWidth={1.5} strokeLinecap="round" />
                    <circle cx={50} cy={50} r={7.5} fill="#2d3748" />
                  </svg>
                </div>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : 30 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="font-display font-bold tracking-tight mb-2 leading-tight pointer-events-auto"
                style={{ fontSize: "clamp(1.75rem, min(6vw, 7vh), 4.5rem)" }}
              >
                <span 
                  className={`transition-colors duration-1000 ${showVideo ? "text-slate-200" : "text-[#1e293b]"}`}
                  style={{ textShadow: showVideo ? "0 4px 12px rgba(0,0,0,0.6)" : "none" }}
                >
                  Because Time{" "}
                </span>
                <span 
                  className={`bg-clip-text text-transparent bg-gradient-to-r transition-all duration-1000 ${
                    showVideo 
                      ? "from-slate-200 to-[#fbbf24]" 
                      : "from-[#1e293b] to-[#ca8a04]"
                  }`}
                  style={{ 
                    textShadow: showVideo 
                      ? "0 4px 12px rgba(0,0,0,0.6), 0 0 20px rgba(251,191,36,0.3)" 
                      : "none",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Matters
                </span>
              </motion.h1>

              {/* In-flow Buttons when video is ended: ensures they never overlay tagline text on any screen size */}
              {!showVideo && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="flex flex-nowrap gap-2 sm:gap-4 justify-center pointer-events-auto px-4 mt-6 sm:mt-8"
                >
                  <button onClick={() => { window.open('https://canzo.in', '_blank'); }} className="inline-flex items-center gap-1.5 sm:gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-amber-hover transition-colors shadow-lg text-sm sm:text-base whitespace-nowrap">
                    Order Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={() => { window.scrollTo(0,0); navigate('/colleges-canteens'); }} 
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full backdrop-blur-md border font-semibold transition-all duration-300 shadow-lg bg-black/5 text-black border-black/10 hover:bg-black/15 text-sm sm:text-base whitespace-nowrap"
                  >
                    Partner with Us
                  </button>
                </motion.div>
              )}
            </div>

            {/* Absolute Buttons ONLY while video is playing: automatically depends on screen size */}
            {showVideo && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.3 }
                }}
                className="absolute left-0 right-0 flex flex-nowrap gap-2 sm:gap-4 justify-center pointer-events-auto px-4 bottom-[8vh] sm:bottom-[12vh] md:bottom-[15vh] lg:bottom-[18vh]"
              >
                <button onClick={() => { window.open('https://canzo.in', '_blank'); }} className="inline-flex items-center gap-1.5 sm:gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-accent text-accent-foreground font-semibold hover:bg-amber-hover transition-colors shadow-lg text-sm sm:text-base whitespace-nowrap">Order Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" /></button>
                <button 
                  onClick={() => { window.scrollTo(0,0); navigate('/colleges-canteens'); }} 
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full backdrop-blur-md border font-semibold transition-all duration-1000 shadow-lg bg-white/10 text-white border-white/20 hover:bg-white/20 text-sm sm:text-base whitespace-nowrap"
                >
                  Partner with Us
                </button>
              </motion.div>
            )}
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-colors duration-1000 ${showVideo ? "text-white/50" : "text-black/50"}`}
          >
            <ArrowRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </section>
      </StackCard>

      {/* What is Canzo Section */}
      <StackCard zIndex={1}>
        <section className="relative flex flex-col overflow-hidden bg-background">
          <div className="relative bg-accent pt-16 pb-[120px]">
          <div className="absolute top-0 right-0 w-[min(40vw,400px)] aspect-square rounded-full bg-foreground/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[min(30vw,300px)] aspect-square rounded-full bg-foreground/5 blur-[100px] pointer-events-none" />

          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-display font-display font-bold leading-tight tracking-tight text-accent-foreground"
              >
                What is Canzo?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="mt-5 text-fluid-body text-accent-foreground/80 max-w-2xl mx-auto"
              >
                Canzo is a smart campus food pre-ordering platform that digitizes college canteens and enhances the student dining experience. By enabling students to order in advance, Canzo reduces waiting time, improves operational efficiency, and helps create a smarter campus ecosystem.
              </motion.p>
            </div>
          </div>
        </div>

        <div className="relative -mt-[80px] pb-[clamp(3rem,5vw,6rem)]">
          <div className="container z-20 relative">
            <motion.div
              initial={ctaAnim.initial}
              whileInView={ctaAnim.animate}
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-gap)]"
            >
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.title}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(cat.path);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl bg-card border border-border shadow-xl text-left cursor-pointer"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground mt-1 uppercase tracking-wide">
                      {cat.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground mt-3">
                      {cat.desc}
                    </p>
                    <span className="inline-flex items-center justify-center gap-2 mt-5 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-semibold text-sm group-hover:bg-amber-hover transition-colors w-fit">
                      Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
        </section>
      </StackCard>
    </>
  );
};

export default HeroSection;
