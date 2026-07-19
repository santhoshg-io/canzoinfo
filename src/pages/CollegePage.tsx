import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, School, Building2, Shield, TrendingUp, LayoutDashboard, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { label: "Colleges Onboarded", value: "15+", icon: School },
  { label: "Students Served", value: "50K+", icon: Users },
  { label: "Canteens Digitized", value: "80+", icon: Building2 },
  { label: "Crowd Reduction", value: "45%", icon: TrendingUp },
];

const features = [
  { icon: Building2, title: "Digitize All Canteens", desc: "Bring every food outlet on campus onto one platform. One rollout, all vendors covered." },
  { icon: Shield, title: "Hygiene & Compliance", desc: "Monitor food quality and hygiene standards across all vendors with automated compliance checks." },
  { icon: TrendingUp, title: "Reduce Overcrowding", desc: "Stagger orders and spread demand across time slots to reduce peak-hour congestion by up to 45%." },
  { icon: LayoutDashboard, title: "Centralized Dashboard", desc: "A single admin dashboard to oversee all vendors, orders, revenue, and student feedback." },
  { icon: Users, title: "Student Insights", desc: "Understand food preferences, spending patterns, and satisfaction levels across your campus." },
  { icon: School, title: "White-Label Option", desc: "Brand the platform with your college's identity. A seamless extension of your campus experience." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CollegePage = () => (
  <div className="min-h-screen">
    <section className="pt-20 pb-20 relative overflow-hidden">
      <div className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

      <div className="container">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <motion.div {...fadeUp} className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-4">
            🏫 For Colleges
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
            Transform your campus<br />
            <span className="text-gradient">food ecosystem.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Digitize all canteens, monitor hygiene compliance, reduce overcrowding, and gain insights into student food preferences — all from one dashboard.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-2xl bg-card border border-border text-center">
              <s.icon className="w-6 h-6 text-accent mx-auto mb-3" />
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                <AnimatedCounter value={s.value} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-display font-bold mb-10">
          Why colleges <span className="text-gradient">choose Canzo</span>
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div key={f.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
              <f.icon className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="text-center">
          <a href="https://canzo.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-base hover:bg-amber-hover transition-all glow-amber">
            Get Canzo for Your Campus
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default CollegePage;
