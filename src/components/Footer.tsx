import { Linkedin, Instagram, MapPin } from "lucide-react";
import canzoLogo from "@/assets/canzo-logo.png";

const socials = [
  { href: "https://www.linkedin.com/company/canzo-in/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://instagram.com/Canzo_in", label: "Instagram", Icon: Instagram },
];

const LOCATION_URL = "https://share.google/sfGdXfl9UDAdLFwUO";
const LOCATION_TEXT =
  "No.15, Kosal Nagar, KGK Rd, near St. Mark's Church, opp. to Annapoorna Hotel, Kuniyamuthur, Coimbatore, Tamil Nadu 641008";

const Footer = () => {
  return (
    <footer id="footer" className="py-[clamp(2.5rem,4vw,4rem)] section-dark border-t border-foreground/10">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-[var(--space-gap)] items-start">

          <div>
            <img src={canzoLogo} alt="Canzo" className="h-8 mb-4 brightness-0 invert opacity-80" />
            <p className="text-sm opacity-60 max-w-xs leading-relaxed">
              Canzo is a smart canteen ordering platform for colleges and educational institutions. Order food, skip queues, and enjoy campus life.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider opacity-60">Links</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#features" className="hover:text-accent transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-accent transition-colors">How It Works</a></li>
              <li><a href="#ecosystem" className="hover:text-accent transition-colors">Ecosystem</a></li>
              <li><a href="/internship" className="hover:text-accent transition-colors">Careers / Internship</a></li>
              <li><a href="https://canzo.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">canzo.in</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider opacity-60">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="mailto:info@canzo.in" className="hover:text-accent transition-colors">info@canzo.in</a></li>
              <li><a href="tel:+919150793749" className="hover:text-accent transition-colors">+91 9150793749</a></li>
              <li>
                <a
                  href={LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors inline-flex gap-2 items-start"
                >
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{LOCATION_TEXT}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider opacity-60">Social Links</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-foreground/10 hover:bg-accent hover:text-background flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="mt-5">
              <a
                href="https://play.google.com/store/apps/details?id=canzo.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-foreground/20 bg-foreground/5 hover:bg-foreground/10 transition-colors w-40"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path fill="#34A853" d="M3.6 20.5 14.2 12 3.6 3.5c-.4.3-.6.8-.6 1.4v14.2c0 .6.2 1.1.6 1.4z"/>
                  <path fill="#FBBC04" d="M17.3 15.1 14.2 12l3.1-3.1 3.7 2.1c1 .6 1 1.8 0 2.4l-3.7 2.7z"/>
                  <path fill="#EA4335" d="M3.6 20.5c.4.3.9.3 1.5 0L17.3 15.1 14.2 12 3.6 20.5z"/>
                  <path fill="#4285F4" d="M3.6 3.5 14.2 12l3.1-3.1L5.1 3.5c-.6-.3-1.1-.3-1.5 0z"/>
                </svg>
                <div className="leading-tight">
                  <div className="text-[9px] opacity-70">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-foreground/10 text-center text-xs opacity-40">
          © {new Date().getFullYear()} Canzo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
