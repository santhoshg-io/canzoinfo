import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Parsing pattern: e.g., "600+", "50K+", "4.8★", "35%", "Rs. 200"
  // Group 1: optional non-numeric prefix
  // Group 2: numeric part (with optional decimal point)
  // Group 3: optional non-numeric suffix
  const regex = /^([^0-9.-]*)([0-9.]+)([^0-9.]*)$/;
  const match = value.match(regex);

  if (!match) {
    return <span>{value}</span>;
  }

  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];

  const targetValue = parseFloat(numStr);
  if (isNaN(targetValue)) {
    return <span>{value}</span>;
  }

  const isDecimal = numStr.includes(".");
  const decimals = isDecimal ? numStr.split(".")[1].length : 0;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 70,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(targetValue);
    }
  }, [isInView, motionValue, targetValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        const formattedValue = latest.toFixed(decimals);
        ref.current.textContent = `${prefix}${formattedValue}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix, decimals]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}
