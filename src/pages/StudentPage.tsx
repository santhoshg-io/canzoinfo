import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Users, Clock, ShoppingBag, CreditCard, Bell, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const stats = [
  { label: "Active Students", value: "600+", icon: Users, note: undefined },
  { label: "Avg. Wait Reduced", value: "60%", icon: Clock, note: undefined },
  { label: "Orders / Day", value: "100+", icon: ShoppingBag, note: undefined },
  { label: "Satisfaction Rate", value: "4.8★", icon: Star, note: undefined },
];


const features = [
  { icon: ShoppingBag, title: "Browse & Order", desc: "Explore menus from all canteens on campus and place orders in seconds — no more standing in queues." },
  { icon: Clock, title: "Real-Time Tracking", desc: "Know exactly when your food is being prepared and when it's ready for pickup with live status updates." },
  { icon: CreditCard, title: "Flexible Payments", desc: "Pay online via UPI, cards, or wallets — or choose to pay at pickup. Your choice, always." },
  { icon: Bell, title: "Smart Notifications", desc: "Get notified about deals, new menu items, and when your order is ready. Never miss out." },
  { icon: Star, title: "Rate & Review", desc: "Share your experience and help canteens improve. Your feedback shapes the campus food scene." },
  { icon: Users, title: "Group Orders", desc: "Ordering with friends? Combine orders from the same canteen and pick up together." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const StudentPage = () => (
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
            🎓 For Students
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
            What is Canzo<br />
            <span className="text-gradient">for students?</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Canzo is designed to simplify campus dining by enabling students to pre-order meals from their college canteen. By reducing wait times and eliminating long queues, Canzo helps students make the most of their valuable break time. Whether it's attending classes, connecting with friends, or participating in campus activities, students can focus on what matters most while enjoying a faster and more convenient dining experience.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-2xl bg-card border border-border text-center">
              <s.icon className="w-6 h-6 text-accent mx-auto mb-3" />
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                <AnimatedCounter value={s.value} />
              </div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              {s.note && (
                <div className="text-[10px] text-accent mt-1">{s.note}</div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-display font-bold mb-10">
          What you <span className="text-gradient">get</span>
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

        {/* CTA */}
        <motion.div {...fadeUp} className="text-center">
          <a
            href="https://canzo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-accent text-accent-foreground font-semibold text-base hover:bg-amber-hover transition-all glow-amber"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default StudentPage;
