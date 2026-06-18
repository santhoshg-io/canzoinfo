import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";

const ProblemSolution = () => {
  return (
    <section className="py-section section-dark">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-[clamp(2rem,4vw,3rem)] items-center"
        >
          {/* Problem */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/20 text-sm font-medium">
              <Clock className="w-4 h-4" />
              The Problem
            </div>
            <h2 className="text-fluid-h2 font-display font-bold">A Challenge Faced by <span className="text-accent">Every Student</span></h2>
            <p className="text-fluid-body opacity-80">
              Students spend 15–30 minutes waiting in canteen queues every day. That's hours lost every week — time that could be spent studying, socializing, or just relaxing.
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium">
              <Zap className="w-4 h-4" />
              The Solution
            </div>
            <h2 className="text-fluid-h2 font-display font-bold">
              Skip the line, <span className="text-accent">save your Time.</span>
            </h2>
            <p className="text-fluid-body opacity-80">
              With Canzo, students browse menus, place orders from their phone, and simply pick up when it's ready. No more waiting. No more chaos.
            </p>
          </div>
        </motion.div>
      </div>
    </section>

  );
};

export default ProblemSolution;
