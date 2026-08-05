import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Award, Briefcase, BookOpen, Users, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const highlights = [
  { icon: Briefcase, title: "Real-World Experience", desc: "Work on live projects that impact thousands of students across campuses." },
  { icon: BookOpen, title: "Learn by Doing", desc: "Gain hands-on skills in marketing, operations, tech, and business development." },
  { icon: Award, title: "Certificate of Completion", desc: "Receive an official Canzo internship certificate upon successful completion." },
  { icon: Users, title: "Network & Grow", desc: "Connect with a community of driven students and industry professionals." },
  { icon: Rocket, title: "Launch Your Career", desc: "Stand out in placements with real startup experience on your resume." },
];

const faqs = [
  { q: "Is this a paid internship?", a: "This is an unpaid internship focused on learning and growth. You will receive an official certificate upon completion." },
  { q: "How long is the internship?", a: "The duration varies by role, typically ranging from 1 to 3 months." },
  { q: "Who can apply?", a: "Any college student looking to gain real-world experience is welcome to apply." },
  { q: "What roles are available?", a: "We offer roles in marketing, campus operations, content creation, business development, and more." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};



const InternshipPage = () => (
  <div className="min-h-screen">
    <section className="pt-20 pb-20 relative overflow-hidden">
      <div className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

      <div className="container">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Hero */}
        <motion.div {...fadeUp} className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-4">
            🚀 Internship Program
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
            Build your career<br />
            <span className="text-gradient">with Canzo.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join Canzo's internship program to build practical skills, work on real startup initiatives, and gain meaningful hands-on experience. This is a non-paid internship and every successful intern receives a completion certificate.
          </p>
        </motion.div>

        {/* Key Info Banner */}
        <motion.div {...fadeUp} className="p-6 sm:p-8 rounded-2xl bg-accent/10 border border-accent/20 mb-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Award className="w-10 h-10 text-accent shrink-0" />
          <div>
            <h3 className="font-display font-semibold text-foreground text-lg">Non-Paid Internship with Certificate</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This is a non-paid, learning-focused internship designed to help students build skills, gain exposure, and earn an official Canzo certificate upon successful completion.
            </p>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-display font-bold mb-10">
          Why <span className="text-gradient">intern at Canzo?</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {highlights.map((h, i) => (
            <motion.div key={h.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
              <h.icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">{h.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* College Showcase Banner */}
        <motion.div 
          {...fadeUp}
          className="mb-20 overflow-hidden rounded-2xl border border-border bg-card shadow-lg hover:shadow-2xl hover:border-accent/30 transition-all duration-300 group"
        >
          <Link to="/internship/showcase/easa" className="block relative overflow-hidden aspect-[16/9] sm:aspect-[21/9] lg:aspect-[3/1]">
            <img 
              src="https://res.cloudinary.com/odxzrb9z/image/upload/v1785907129/WhatsApp_Image_2026-08-04_at_10.48.10_AM_tkykhi.jpg" 
              alt="EASA College of Engineering & Technology Internship Showcase" 
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/25 opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end gap-3 text-white">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold tracking-wide uppercase mb-2 shadow-md">
                  🎓 College Partner Showcase
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold drop-shadow-md text-white">
                  EASA College of Engineering & Technology
                </h3>
                <p className="text-xs sm:text-sm text-white/85 max-w-xl drop-shadow-sm font-medium mt-1">
                  Explore the projects, achievements, and journey of EASA students during their Full Stack internship.
                </p>
              </div>
              <div className="mt-2 self-start">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm group-hover:bg-accent group-hover:text-accent-foreground transition-all shadow-lg">
                  Explore Showcase
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>



        {/* FAQs */}
        <motion.div {...fadeUp} className="max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl font-display font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-5 rounded-2xl bg-card border border-border">
                <h4 className="font-semibold text-foreground text-sm mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>

    {/* Floating CTA Bar */}
    <div className="fixed bottom-0 inset-x-0 z-40 pointer-events-none pb-4 sm:pb-5 px-4">
      <div className="max-w-lg mx-auto pointer-events-auto">
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/60 shadow-2xl shadow-black/20">
          <Link to="/internship/apply" className="flex-1">
            <Button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-accent-foreground font-semibold text-sm hover:bg-amber-hover transition-all glow-amber h-auto">
              Apply Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Link to="/internship/verify" className="flex-1">
            <Button variant="outline" className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-accent/30 hover:border-accent text-foreground hover:bg-accent/5 font-semibold text-sm transition-all h-auto">
              Verify Certificate
              <Award className="w-3.5 h-3.5 text-accent" />
            </Button>
          </Link>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default InternshipPage;

