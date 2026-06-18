import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import StackCard from "@/components/StackCard";

import ceoVikramImg from "@/assets/ceo-vikram.png";
import jintoImg from "@/assets/jinto.png";
import ajithImg from "@/assets/ajith.jpeg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const timelineEvents = [
  { date: "2022", title: "The Beginning of Canzo" },
  { date: "2023", title: "Building the Foundation" },
  { date: "2025", title: "Launching the Vision" },
  { date: "January 2026", title: "First Onboarding" },
  { date: "February 2026", title: "600+ Users Strong" },
  { date: "2026", title: "Expanding Business Horizons" },
  { date: "Future", title: "Driving Innovation Forward" },
];

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-background pb-0">
      {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-accent/5 pt-20 pb-16">
          <div className="absolute top-0 right-0 w-[50vw] aspect-square rounded-full bg-accent/10 blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[40vw] aspect-square rounded-full bg-foreground/5 blur-[120px] pointer-events-none" />
          
          <div className="container relative z-10 flex flex-col items-center text-center max-w-4xl px-4">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-6"
            >
              Company Overview
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-display font-display font-bold leading-tight tracking-tight mb-8"
            >
              Empowering Campus <br />
              <span className="text-gradient">Dining Experiences</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-fluid-h3 text-muted-foreground leading-relaxed mb-10 max-w-3xl"
            >
              Canzo is dedicated to revolutionizing how students, canteens, and colleges interact. By bridging the gap with modern technology, we aim to deliver a seamless, queue-free dining experience while empowering local partners to thrive.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a href="mailto:info@canzo.in">
                <Button className="inline-flex items-center gap-2.5 px-8 py-6 rounded-full bg-accent text-accent-foreground font-semibold text-lg hover:bg-amber-hover transition-all shadow-xl glow-amber">
                  <Mail className="w-5 h-5" /> Contact Us
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

      {/* Vikram Section */}
      <StackCard zIndex={2}>
        <section className="py-24 relative overflow-hidden bg-background">
          <div className="container max-w-6xl">
            <div className="text-center mb-20">
              <motion.h2 {...fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-4">
                Our <span className="text-gradient">Leadership</span>
              </motion.h2>
              <motion.p {...fadeUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the visionaries driving Canzo's innovation and operations.
              </motion.p>
            </div>

            <motion.div 
              {...fadeUp}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            >
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto rounded-full overflow-hidden relative flex items-center justify-center border-4 border-accent/20 bg-accent/5 shrink-0">
                <img src={ceoVikramImg} alt="Vikram - Founder & CEO" className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="w-full lg:w-7/12">
                <h3 className="text-3xl sm:text-4xl font-display font-bold mb-2">Vikram</h3>
                <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-6">Founder & CEO</p>
                
                <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Vikram is the Founder and Chief Executive Officer of Canzo. He holds a Master of Computer Applications (MCA) and possesses a strong foundation in technology, business planning, and market research. With a keen understanding of market trends and customer behavior, he leads the company's vision, strategic direction, and long-term growth initiatives.
                  </p>
                  <p>
                    His leadership focuses on identifying emerging opportunities, building innovative solutions, and creating sustainable business models that deliver value to both customers and stakeholders. Through a combination of technical expertise and market insight, he drives Canzo's mission of developing impactful digital products and services.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </StackCard>

      {/* Jinto Section */}
      <StackCard zIndex={3}>
        <section className="py-24 relative overflow-hidden bg-background">
          <div className="container max-w-6xl">
            <motion.div 
              {...fadeUp}
              className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20"
            >
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto rounded-full overflow-hidden relative flex items-center justify-center border-4 border-accent/20 bg-accent/5 shrink-0">
                <img src={jintoImg} alt="Jinto - Head of Digital Marketing & Growth" className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="w-full lg:w-7/12">
                <h3 className="text-3xl sm:text-4xl font-display font-bold mb-2">Jinto</h3>
                <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-6">Head of Digital Marketing & Growth</p>
                
                <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Jinto leads Digital Marketing and Growth initiatives at Canzo. With hands-on experience working in the digital marketing industry, he brings expertise in brand development, performance marketing, customer acquisition, and digital growth strategies.
                  </p>
                  <p>
                    His experience in managing marketing campaigns, audience engagement, and online brand positioning helps Canzo strengthen its digital presence and expand its reach. He is responsible for driving marketing innovation, growth planning, and customer engagement strategies that contribute to the company's overall success.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </StackCard>

      {/* Ajith Kumar Section */}
      <StackCard zIndex={4}>
        <section className="py-24 relative overflow-hidden bg-background">
          <div className="container max-w-6xl">
            <motion.div 
              {...fadeUp}
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
            >
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto rounded-full overflow-hidden relative flex items-center justify-center border-4 border-accent/20 bg-accent/5 shrink-0">
                <img src={ajithImg} alt="Ajith Kumar - Head of Operations" className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="w-full lg:w-7/12">
                <h3 className="text-3xl sm:text-4xl font-display font-bold mb-2">Ajith Kumar</h3>
                <p className="text-accent font-semibold tracking-wide uppercase text-sm mb-6">Head of Operations</p>
                
                <div className="space-y-5 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Ajith Kumar oversees Operations at Canzo, focusing on business strategy, operational excellence, team coordination, and organizational management. With strong expertise in market analysis, business planning, and process optimization, he plays a key role in transforming ideas into structured execution.
                  </p>
                  <p>
                    His responsibilities include streamlining operations, improving efficiency, supporting strategic decision-making, and ensuring the successful implementation of business initiatives. His operational leadership contributes significantly to the company's growth, scalability, and long-term sustainability.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </StackCard>

      {/* The Journey of Canzo */}
      <StackCard zIndex={5}>
        <section className="py-24 bg-accent/5">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <motion.h2 {...fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-4">
                The Journey of <span className="text-gradient">Canzo</span>
              </motion.h2>
              <motion.p {...fadeUp} className="text-lg text-muted-foreground">
                The process of turning an idea into something that can create a positive IMPACT in society.
              </motion.p>
            </div>

            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 -translate-x-1/2" />

              <div className="space-y-12">
                {timelineEvents.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="relative flex items-center md:justify-between w-full"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent border-[3px] border-background -translate-x-1/2 z-10 shadow-[0_0_0_4px_rgba(249,159,27,0.2)]" />
                      
                      {/* Content - Left side on desktop for even, right for odd. Right side on mobile for all. */}
                      <div className={`w-full md:w-[45%] pl-12 md:pl-0 flex ${isEven ? 'md:justify-end md:text-right' : 'md:justify-start md:text-left'} ${!isEven && 'md:ml-auto'}`}>
                        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative group">
                          {/* Connecting dashed line on desktop */}
                          <div className={`hidden md:block absolute top-1/2 w-8 border-t-2 border-dashed border-accent/40 -translate-y-1/2 ${isEven ? '-right-8' : '-left-8'}`} />
                          
                          <h4 className="text-xl font-bold text-accent mb-2">{item.date}</h4>
                          <p className="text-foreground font-medium">{item.title}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </StackCard>

      {/* Hiring Banner */}
      <StackCard zIndex={6}>
        <section className="py-16 md:py-20 relative overflow-hidden bg-background">
          <div className="container max-w-5xl">
            <motion.div 
              {...fadeUp}
              className="bg-accent rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden glow-amber"
            >
              {/* Decorative elements for the banner */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
              
              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-accent-foreground mb-2">
                  We're hiring. Come join our team!
                </h3>
                <p className="text-accent-foreground/80 text-lg">
                  Help us build the future of campus dining.
                </p>
              </div>
              
              <div className="relative z-10 shrink-0">
                <Link to="/careers">
                  <Button className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6 rounded-full font-bold shadow-lg transition-transform hover:scale-105">
                    Careers
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </StackCard>

      <StackCard zIndex={7} className="stack-card-combined">
        <Footer />
      </StackCard>
    </div>
  );
};

export default AboutUsPage;
