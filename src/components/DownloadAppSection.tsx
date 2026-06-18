import { motion } from "framer-motion";
import appScreen from "@/assets/work/web6.jpeg";
import appScreen2 from "@/assets/work/web5.png";

const PLAY_URL = "https://play.google.com/store/apps/details?id=canzo.in";
const QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=0&data=${encodeURIComponent(
  PLAY_URL
)}`;
const APP_SCREEN_URL = appScreen;



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

type PhoneVariant = "qr" | "screen";

const PhoneMockup = ({
  variant,
  className = "",
  imageSrc,
}: {
  variant: PhoneVariant;
  className?: string;
  imageSrc?: string;
}) => (
  <a
    href={PLAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Download Canzo from Google Play"
    className={`relative block w-[160px] sm:w-[210px] md:w-[215px] lg:w-[230px] aspect-[9/19] rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-[6px] sm:p-[8px] shadow-2xl transition-transform hover:scale-[1.02] ${className}`}
  >
    {/* Inner bezel */}
    <div className="relative w-full h-full rounded-[1.7rem] sm:rounded-[2.1rem] bg-white overflow-hidden">
      {/* Dynamic Island */}
      <div
        aria-hidden
        className="absolute top-2 left-1/2 -translate-x-1/2 h-[16px] w-[60px] sm:h-[22px] sm:w-[85px] rounded-full bg-black z-20 flex items-center justify-end pr-2"
      >
        <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-neutral-700 ring-[2px] ring-neutral-900" />
      </div>

      {variant === "qr" ? (
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
      ) : (
        <img
          src={imageSrc || APP_SCREEN_URL}
          alt="Canzo app preview"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  </a>
);

const DownloadAppSection = () => {
  return (
    <section
      id="download-app"
      className="flex items-center py-section bg-accent/10 md:bg-yellow-500/10"
    >
      <div className="container px-0 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden md:rounded-3xl md:bg-card md:border border-border md:px-[clamp(1.25rem,4vw,4rem)] md:py-[clamp(2.5rem,5vw,4rem)] w-full"
        >
          {/* Mobile: completely custom layout matching the reference image */}
          <div className="md:hidden flex flex-col w-full bg-accent/10">
            {/* Top Pink Gradient with overlapping phones */}
            <div className="w-full pt-12 pb-4 flex justify-center items-end h-[380px]">
              <div className="relative w-[280px] h-full">
                {/* Back Phone (Left, smaller) */}
                <div className="absolute left-2 bottom-[10px]">
                  <PhoneMockup variant="screen" imageSrc={appScreen2} className="scale-90 opacity-95 shadow-xl" />
                </div>
                {/* Front Phone (Right, larger) */}
                <div className="absolute right-6 bottom-[-10px] z-10">
                  <PhoneMockup variant="screen" className="shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]" />
                </div>
              </div>
            </div>

            {/* Bottom Content Container */}
            <div className="pt-12 pb-16 px-4 text-center flex flex-col items-center relative z-20">
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

          {/* Desktop: original layout */}
          <div className="hidden md:grid grid-cols-2 gap-[var(--space-gap)] items-center">
            <div>
              <h2 className="text-fluid-h1 font-display font-bold text-foreground tracking-tight">
                Download the app now!
              </h2>
              <p className="mt-4 text-fluid-body text-muted-foreground max-w-md">
                Experience seamless campus ordering only on the Canzo app.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PlayStoreBadge />
              </div>
            </div>
            <div className="relative flex justify-center items-center py-4">
              <PhoneMockup variant="qr" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadAppSection;