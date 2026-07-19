import { motion } from "framer-motion";
import { ArrowLeft, School, Building2, Shield, TrendingUp, LayoutDashboard, Users, CheckCircle, Clock, Send, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const liveColleges = [
  "Hindusthan College of Arts and Science",
];

const upcomingColleges = [
  "Coimbatore",
  "Chennai",
  "Madurai",
  "Salem",
  "Tiruchirappalli",
  "Erode",
  "Tirunelveli",
];

const collegeFeatures = [
  { icon: Building2, title: "Digitize All Canteens", desc: "Bring every food outlet on campus onto one platform with one unified rollout." },
  { icon: TrendingUp, title: "Reduce Overcrowding", desc: "Spread demand across time slots and improve movement during peak meal hours." },
  { icon: LayoutDashboard, title: "Centralized Dashboard", desc: "Oversee vendors, orders, revenue, and student activity from a single place." },
  { icon: Users, title: "Student Insights", desc: "Understand ordering patterns, food preferences, and engagement across your campus." },
  { icon: Shield, title: "Hygiene & Compliance", desc: "Maintain quality standards across canteens with better visibility and control." },
  { icon: School, title: "White-Label Option", desc: "Extend the platform under your college identity for a more seamless campus experience." },
];

const canteenFeatures = [
  { icon: TrendingUp, title: "Crowd Control", desc: "Manage rush-hour demand better and keep pickup lines moving smoothly." },
  { icon: LayoutDashboard, title: "Billing System", desc: "Track orders, payments, and daily sales in one simple canteen workflow." },
  { icon: School, title: "Inventory Management", desc: "Stay on top of stock levels and avoid running out of popular menu items." },
  { icon: Users, title: "Order Management", desc: "View, prepare, and fulfill incoming orders efficiently during peak service hours." },
  { icon: Shield, title: "Better Operations", desc: "Run your canteen with fewer manual steps and smoother day-to-day coordination." },
  { icon: Building2, title: "Campus Reach", desc: "Serve more students through a digital ordering flow built for college canteens." },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CollegesCanteensPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", institution: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const payload = {
      _subject: `New Partnership Request: ${formData.institution} - ${formData.name}`,
      _captcha: "false",
      _template: "table",
      Name: formData.name,
      "Institution / Canteen": formData.institution,
      Phone: formData.phone,
      email: formData.email,
      ...(formData.message ? { Message: formData.message } : {})
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/tamiltamilboss090@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data.success === "false" || data.success === false) {
          toast({ variant: "destructive", title: "Submission Failed", description: data.message || "FormSubmit rejected the submission." });
        } else {
          setIsSubmitSuccess(true);
        }
      } else {
        const data = await response.json().catch(() => ({}));
        toast({ variant: "destructive", title: "Submission Failed", description: data.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to connect to the server. Please check your internet connection." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
              🏫 Colleges & Canteens
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
              Transform your campus<br />
              <span className="text-gradient">food ecosystem.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Canzo helps colleges and canteens run a smarter campus food system with centralized ordering, better crowd management, and a smoother experience for students and operators.
            </p>
          </motion.div>

          {/* Live & Upcoming Colleges */}
          <motion.div {...fadeUp} className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-8">
              Campus <span className="text-gradient">Status</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <h3 className="font-display font-semibold text-lg text-foreground">Live Colleges</h3>
                </div>
                <ul className="space-y-3">
                  {liveColleges.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-5">
                  <Clock className="w-5 h-5 text-accent" />
                  <h3 className="font-display font-semibold text-lg text-foreground">Upcoming Districts</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Expanding into 7 major districts across Tamil Nadu.</p>
                <ul className="space-y-3">
                  {upcomingColleges.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div {...fadeUp} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              Why colleges <span className="text-gradient">choose Canzo</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {collegeFeatures.map((f, i) => (
              <motion.div key={f.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
                <f.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              Why canteens <span className="text-gradient">choose Canzo</span>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {canteenFeatures.map((f, i) => (
              <motion.div key={f.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
                <f.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Partner Form */}
          <motion.div {...fadeUp} id="partner-form" className="max-w-xl mx-auto">
            {isSubmitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-12 rounded-2xl bg-accent/10 border border-accent/20 text-center"
              >
                <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-display font-bold mb-2">Thank you, {formData.name}!</h2>
                <p className="text-muted-foreground mb-6">
                  Your partnership request for {formData.institution} has been submitted successfully! We are excited to collaborate with you. Our team will review your details and reach out to you within 24 hours. Have a wonderful day!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/">
                    <Button variant="outline" className="rounded-full">
                      Back to Home
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      setFormData({ name: "", institution: "", phone: "", email: "", message: "" });
                      setIsSubmitSuccess(false);
                    }}
                    className="rounded-full bg-accent text-accent-foreground hover:bg-amber-hover"
                  >
                    Submit Another Request
                  </Button>
                </div>
              </motion.div>
            ) : (
            <div className="p-8 sm:p-10 rounded-2xl bg-card border border-border">
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">Become a Partner</h2>
              <p className="text-sm text-muted-foreground mb-8">Interested in bringing Canzo to your campus or canteen? Share your details and our team will reach out.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Your Name</label>
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Institution / Canteen Name</label>
                  <input
                    required
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    placeholder="XYZ University"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      placeholder="you@college.edu"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Message (optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                    placeholder="Tell us about your campus..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:bg-amber-hover transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Partnership Request"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CollegesCanteensPage;
