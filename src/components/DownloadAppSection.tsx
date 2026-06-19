import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import appScreen from "@/assets/work/web6.jpeg";
import appScreen2 from "@/assets/work/web5.png";
import appScreen3 from "@/assets/work/web7.png";

const PLAY_URL = "https://play.google.com/store/apps/details?id=canzo.in";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=${encodeURIComponent(
  PLAY_URL
)}`;

const PlayStoreBadge = () => (
  <a
    href={PLAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Get Canzo on Google Play"
    className="inline-flex items-center justify-center w-[145px] sm:w-[160px] h-[48px] sm:h-[52px] bg-black text-white rounded-xl hover:opacity-90 transition-opacity shrink-0"
  >
    <svg viewBox="0 0 24 24" className="w-7 h-7 mr-2" aria-hidden="true">
      <path fill="#34A853" d="M3.6 20.5c.3.5.9.7 1.5.4l10-5.8-2.7-2.7L3.6 20.5z" />
      <path fill="#FBBC04" d="M20.4 11.1l-3.6-2.1-3 2.9 3 2.9 3.6-2.1c.9-.5.9-1.8 0-2.3z" />
      <path fill="#4285F4" d="M3.6 3.5C3.5 3.7 3.4 4 3.4 4.3v15.4c0 .3.1.6.2.8l9.6-9.5L3.6 3.5z" />
      <path fill="#EA4335" d="M5.1 3.1c-.6-.3-1.2-.1-1.5.4l8.8 8.8 2.7-2.7-10-6.5z" />
    </svg>
    <div className="flex flex-col text-left justify-center">
      <span className="text-[10px] leading-none mb-1 uppercase tracking-wide">Get it on</span>
      <span className="text-[15px] font-semibold leading-none">Google Play</span>
    </div>
  </a>
);

/* ── Reusable side phone mockup ───────────────────────────────── */
const SidePhone = ({ imageSrc }: { imageSrc: string }) => (
  <a
    href={PLAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download Canzo from Google Play"
    className="relative block aspect-[9/19] rounded-[2.2rem] bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-[6px] shadow-2xl"
    style={{ width: 152 }}
  >
    {/* Specular highlight */}
    <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none z-30" />
    <div className="relative w-full h-full rounded-[1.9rem] bg-white overflow-hidden">
      <div
        aria-hidden
        className="absolute top-2 left-1/2 -translate-x-1/2 h-[15px] w-[58px] rounded-full bg-black z-20 flex items-center justify-end pr-2"
      >
        <span className="h-[3px] w-[3px] rounded-full bg-neutral-700 ring-[2px] ring-neutral-900" />
      </div>
      <img
        src={imageSrc}
        alt="Canzo app preview"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  </a>
);

/* ── Center (dominant) phone mockup ──────────────────────────── */
const CenterPhone = ({ imageSrc }: { imageSrc: string }) => (
  <a
    href={PLAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download Canzo from Google Play"
    className="relative block aspect-[9/19] rounded-[2.5rem] bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-[7px]"
    style={{ width: 182 }}
  >
    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none z-30" />
    <div className="relative w-full h-full rounded-[2.2rem] bg-white overflow-hidden">
      <div
        aria-hidden
        className="absolute top-2 left-1/2 -translate-x-1/2 h-[18px] w-[70px] rounded-full bg-black z-20 flex items-center justify-end pr-2"
      >
        <span className="h-1 w-1 rounded-full bg-neutral-700 ring-[2px] ring-neutral-900" />
      </div>
      <img
        src={imageSrc}
        alt="Canzo app preview"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  </a>
);

/* ── QR mockup for desktop ────────────────────────────────────── */
const QRPhone = () => (
  <a
    href={PLAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download Canzo from Google Play"
    className="relative block w-[160px] sm:w-[210px] md:w-[215px] lg:w-[230px] aspect-[9/19] rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-[6px] sm:p-[8px] shadow-2xl transition-transform hover:scale-[1.02]"
  >
    <div className="relative w-full h-full rounded-[1.7rem] sm:rounded-[2.1rem] bg-white overflow-hidden">
      <div
        aria-hidden
        className="absolute top-2 left-1/2 -translate-x-1/2 h-[16px] w-[60px] sm:h-[22px] sm:w-[85px] rounded-full bg-black z-20 flex items-center justify-end pr-2"
      >
        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-neutral-700 ring-[2px] ring-neutral-900" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-8 pb-4">
        <p className="text-center text-[11px] sm:text-[13px] font-semibold text-neutral-800 leading-snug">
          Scan to Download
        </p>
        <div className="mt-3 rounded-xl border-2 border-accent/70 p-2 bg-white">
          <img
            src={QR_URL}
            alt="Scan to download Canzo on Google Play"
            className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] block"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </a>
);

/* ── 3-Phone animated showcase (mobile only) ──────────────────── */
const MobilePhoneShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const spring = {
    type: "spring" as const,
    stiffness: 52,
    damping: 17,
    mass: 1.1,
  };

  return (
    <div
      ref={ref}
      className="relative flex items-end justify-center w-full overflow-visible"
      style={{ height: 380 }}
    >
      {/* LEFT PHONE — starts behind center, slides left */}
      <motion.div
        initial={{ x: 0, y: 0, opacity: 0.45, scale: 0.80, rotate: 0 }}
        animate={
          inView
            ? { x: -100, y: -15, opacity: 1, scale: 0.90, rotate: 0 }
            : { x: 0, y: 0, opacity: 0.45, scale: 0.80, rotate: 0 }
        }
        transition={{ ...spring, delay: 0.06 }}
        className="absolute bottom-0"
        style={{
          zIndex: 1,
          transformOrigin: "bottom center",
          filter: "drop-shadow(-10px 18px 36px rgba(0,0,0,0.40))",
        }}
      >
        <SidePhone imageSrc={appScreen3} />
      </motion.div>

      {/* RIGHT PHONE — starts behind center, slides right */}
      <motion.div
        initial={{ x: 0, y: 0, opacity: 0.45, scale: 0.80, rotate: 0 }}
        animate={
          inView
            ? { x: 100, y: -15, opacity: 1, scale: 0.90, rotate: 0 }
            : { x: 0, y: 0, opacity: 0.45, scale: 0.80, rotate: 0 }
        }
        transition={{ ...spring, delay: 0.06 }}
        className="absolute bottom-0"
        style={{
          zIndex: 1,
          transformOrigin: "bottom center",
          filter: "drop-shadow(10px 18px 36px rgba(0,0,0,0.40))",
        }}
      >
        <SidePhone imageSrc={appScreen2} />
      </motion.div>

      {/* CENTER PHONE — always in front, fades/scales in */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.88, opacity: 0 }}
        transition={{ ...spring, delay: 0 }}
        className="absolute bottom-0"
        style={{
          zIndex: 10,
          transformOrigin: "bottom center",
          filter:
            "drop-shadow(0 28px 52px rgba(0,0,0,0.55)) drop-shadow(0 6px 14px rgba(0,0,0,0.28))",
        }}
      >
        <CenterPhone imageSrc={appScreen} />
      </motion.div>
    </div>
  );
};

/* ── Main Section ─────────────────────────────────────────────── */
const DownloadAppSection = () => {
  return (
    <section
      id="download-app"
      className="flex items-center py-section bg-accent/10"
    >
      <div className="container px-0 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-visible md:overflow-hidden md:px-[clamp(1.25rem,4vw,4rem)] md:py-[clamp(2.5rem,5vw,4rem)] w-full"
        >
          {/* ── MOBILE LAYOUT ── */}
          <div className="md:hidden flex flex-col w-full">
            {/* 3-phone showcase */}
            <div className="w-full pt-14 pb-0 overflow-visible">
              <MobilePhoneShowcase />
            </div>

            {/* Text + CTA */}
            <div className="pt-10 pb-16 px-6 text-center flex flex-col items-center relative z-20">
              <h2 className="text-4xl font-display font-bold text-black tracking-tight mb-4">
                Download the app now!
              </h2>
              <p className="text-muted-foreground text-[16px] max-w-[280px] leading-[1.4] mb-8">
                Experience seamless food ordering<br />with the Canzo app
              </p>
              <div className="flex flex-row justify-center gap-3 w-full">
                <PlayStoreBadge />
              </div>
            </div>
          </div>

          {/* ── DESKTOP LAYOUT — Zomato-style half-phone ── */}
          <div className="hidden md:block">
            <div
              className="relative rounded-[2.5rem] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(var(--accent) / 0.18) 0%, hsl(var(--accent) / 0.08) 100%)",
                minHeight: 440,
              }}
            >
              {/* Left: Text + Badge */}
              <div className="relative z-10 flex flex-col justify-center h-full py-20 pl-20 pr-8 max-w-[55%]">
                <h2 className="text-5xl lg:text-6xl font-display font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Download the app now!
                </h2>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-md leading-relaxed mb-10">
                  Experience seamless campus ordering<br />only on the Canzo app.
                </p>
                <div className="flex flex-wrap gap-4">
                  <PlayStoreBadge />
                </div>
              </div>

              {/* Right: Half-phone mockup with QR */}
              <motion.div
                initial={{ y: 120, opacity: 0.5 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: "spring", stiffness: 50, damping: 18, delay: 0.15 }}
                className="absolute right-[8%] lg:right-[12%] top-[40px]"
                style={{ width: 290, zIndex: 5 }}
              >
                <div
                  className="relative w-full aspect-[9/19] rounded-[2.8rem] bg-gradient-to-b from-neutral-600 via-neutral-800 to-black p-[8px]"
                  style={{
                    boxShadow: "-20px 20px 60px rgba(0,0,0,0.25), 0 8px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  {/* Specular highlight */}
                  <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none z-30" />

                  {/* Screen */}
                  <div className="relative w-full h-full rounded-[2.4rem] bg-white overflow-hidden">
                    {/* Notch */}
                    <div
                      aria-hidden
                      className="absolute top-3 left-1/2 -translate-x-1/2 h-[22px] w-[85px] rounded-full bg-black z-20 flex items-center justify-end pr-2.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-700 ring-[2px] ring-neutral-900" />
                    </div>

                    {/* QR content (positioned starting from top so it's not cut off by the parent card overflow) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-start px-6 pt-20">
                      <p className="text-center text-[15px] font-semibold text-neutral-700 leading-snug mb-5">
                        Scan the QR code to<br />download the app
                      </p>
                      <div className="rounded-2xl border-2 border-accent/50 p-3 bg-white shadow-md">
                        <img
                          src={QR_URL}
                          alt="Scan to download Canzo on Google Play"
                          className="w-[130px] h-[130px] block"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadAppSection;