import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import canzoLogo from "@/assets/canzo-logo.webp";

/* Animated clock hands rendered inside a 100x100 viewBox */
const ClockHands = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondAngle = (seconds / 60) * 360;
  const minuteAngle = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourAngle = (hours / 12) * 360 + (minutes / 60) * 30;

  const cx = 50, cy = 50;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
      {/* Cover static hands from the PNG — match the light interior of the O */}
      <circle cx={cx} cy={cy} r={30} fill="#E1E0DE" />
      {/* Hour hand */}
      <line
        x1={cx} y1={cy}
        x2={cx + 16 * Math.sin((hourAngle * Math.PI) / 180)}
        y2={cy - 16 * Math.cos((hourAngle * Math.PI) / 180)}
        stroke="#2d3748" strokeWidth={5} strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1={cx} y1={cy}
        x2={cx + 24 * Math.sin((minuteAngle * Math.PI) / 180)}
        y2={cy - 24 * Math.cos((minuteAngle * Math.PI) / 180)}
        stroke="#2d3748" strokeWidth={3.5} strokeLinecap="round"
      />
      {/* Second hand */}
      <line
        x1={cx} y1={cy}
        x2={cx + 28 * Math.sin((secondAngle * Math.PI) / 180)}
        y2={cy - 28 * Math.cos((secondAngle * Math.PI) / 180)}
        stroke="#e8a838" strokeWidth={1.5} strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx={cx} cy={cy} r={3} fill="#2d3748" />
    </svg>
  );
};

const BrandStrip = () => {
  return (
    <section className="relative py-section overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(60vw,500px)] aspect-square rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      <div className="container flex flex-col items-center gap-6 relative z-10">

        {/* Logo with animated clock overlay on the O */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="relative inline-block"
        >
          {/* Original logo - large display */}
          <img
            src={canzoLogo}
            alt="Canzo"
            className="h-[clamp(5rem,10vw,11rem)] w-auto"
          />

          {/* 
            Animated clock hands overlay on the O (stopwatch at far right).
            The O/stopwatch occupies ~22% of logo width, positioned at far right.
            Vertically it's centered with slight offset for the crown on top.
          */}
          <div
            className="absolute pointer-events-none"
            style={{
              right: '0.5%',
              top: '18%',
              width: '21%',
              height: '72%',
            }}
          >
            <ClockHands />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-display text-fluid-h3 font-medium text-muted-foreground tracking-wide text-center"
        >
          Because time matters
        </motion.p>
      </div>
    </section>
  );
};

export default BrandStrip;
