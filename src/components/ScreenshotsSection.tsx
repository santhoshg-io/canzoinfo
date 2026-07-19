import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import web4 from "@/assets/work/web4.png";
import web5 from "@/assets/work/web5.png";
import web6 from "@/assets/work/web6.jpeg";

// Initial state must render as: Left = Canteens, Center = Sign In, Right = Cart.
const screenshots = [
  { src: web4, label: "Browse Canteens" },
  { src: web6, label: "Welcome & Sign In" },
  { src: web5, label: "Food Cart & Order" },
];

const loopedScreenshots = Array.from({ length: 7 }, (_, cycle) =>
  screenshots.map((s, index) => ({ ...s, key: `${cycle}-${index}` }))
).flat();

const ScreenshotsSection = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    const keepCarouselRunning = window.setInterval(() => {
      const swiper = swiperRef.current;
      if (!swiper || swiper.destroyed) return;

      if (swiper.autoplay && !swiper.autoplay.running) {
        swiper.autoplay.start();
      }

      if (swiper.isEnd && !swiper.params.loop) {
        swiper.slideTo(0, 800);
      }
    }, 1000);

    return () => window.clearInterval(keepCarouselRunning);
  }, []);

  return (
    <section id="screenshots" className="bg-background min-h-[100svh] flex flex-col justify-center py-section overflow-x-clip">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-[clamp(2rem,4vw,4rem)] px-section"
      >
        <h2 className="text-fluid-h2 font-display font-bold">
          See Canzo in <span className="text-gradient">action.</span>
        </h2>
        <p className="mt-3 text-fluid-small text-muted-foreground">
          A glimpse of the experience
        </p>
      </motion.div>


      <div className="coverflow-wrap">
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          initialSlide={10}
          loopAdditionalSlides={3}
          loopPreventsSliding={false}
          slidesPerView="auto"
          speed={1200}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            waitForTransition: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.autoplay.start();
          }}
          onAutoplayStop={(swiper) => swiper.autoplay.start()}
          onTouchEnd={(swiper) => swiper.autoplay.start()}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.2,
            scale: 0.85,
            slideShadows: false,
          }}

          className="canzo-coverflow"
        >
          {loopedScreenshots.map((s) => (
            <SwiperSlide key={s.key} className="coverflow-slide">
              <div className="coverflow-card">
                <img
                  src={s.src}
                  alt={s.label}
                  className="w-full h-auto block"
                  loading="eager"
                  decoding="sync"
                  draggable={false}
                  width="380"
                  height="823"
                />
              </div>
              <p className="mt-5 text-center text-sm font-medium text-muted-foreground">
                {s.label}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .coverflow-wrap {
          width: 100%;
          perspective: 1400px;
        }
        .canzo-coverflow {
          width: 100%;
          padding: 40px 0 70px;
          overflow: visible;
          transform-style: preserve-3d;
        }
        .canzo-coverflow .swiper-wrapper {
          align-items: center;
          transform-style: preserve-3d;
        }
        .coverflow-slide {
          width: clamp(260px, 32vw, 380px);
          opacity: 0.7;
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1), filter 900ms cubic-bezier(0.22, 1, 0.36, 1);
          transform-style: preserve-3d;
        }

        .coverflow-card {
          width: 100%;
          border-radius: 2rem;
          overflow: hidden;
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.25);
          transition: box-shadow 1100ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .coverflow-card img {
          display: block;
          width: 100%;
          height: auto;
        }
        @media (min-width: 1024px) {
          .coverflow-slide {
            width: clamp(240px, 22vw, 320px);
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .coverflow-slide {
            width: clamp(240px, 28vw, 340px);
          }
        }
        .canzo-coverflow .swiper-wrapper {
          align-items: center;
          transform-style: preserve-3d;
          transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        .canzo-coverflow .swiper-slide {
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
          transition: opacity 900ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .canzo-coverflow .swiper-slide-active,
        .canzo-coverflow .swiper-slide-prev,
        .canzo-coverflow .swiper-slide-next {
          visibility: visible;
          pointer-events: auto;
        }
        .canzo-coverflow .swiper-slide-prev,
        .canzo-coverflow .swiper-slide-next {
          filter: brightness(0.92);
          opacity: 0.65;
          z-index: 1;
        }
        .canzo-coverflow .swiper-slide-active {
          opacity: 1;
          z-index: 10;
          filter: none;
        }
        .canzo-coverflow .swiper-slide-active .coverflow-card {
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.45), 0 0 0 1px hsl(var(--border));
        }
      `}</style>

    </section>
  );
};

export default ScreenshotsSection;
