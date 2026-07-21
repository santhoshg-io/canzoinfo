
import canzoLogo from "@/assets/canzo-logo.webp";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const NavClockHands = () => {
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
      <circle cx={cx} cy={cy} r={30} fill="#E1E0DE" />
      <line x1={cx} y1={cy} x2={cx + 16 * Math.sin((hourAngle * Math.PI) / 180)} y2={cy - 16 * Math.cos((hourAngle * Math.PI) / 180)} stroke="#2d3748" strokeWidth={5} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + 24 * Math.sin((minuteAngle * Math.PI) / 180)} y2={cy - 24 * Math.cos((minuteAngle * Math.PI) / 180)} stroke="#2d3748" strokeWidth={3.5} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + 28 * Math.sin((secondAngle * Math.PI) / 180)} y2={cy - 28 * Math.cos((secondAngle * Math.PI) / 180)} stroke="#e8a838" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={3} fill="#2d3748" />
    </svg>
  );
};

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Demo", href: "#screenshots" },
  { label: "Careers", href: "/careers" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "#footer" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const h = scrolled ? 48 : 64;
    // Defer CSS custom property write to avoid forced style recalculation
    const id = requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--navbar-height", `${h}px`);
    });
    return () => cancelAnimationFrame(id);
  }, [scrolled]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("mailto:")) {
      window.location.href = href;
      setMobileOpen(false);
      return;
    }

    if (href.startsWith("/")) {
      navigate(href);
      setMobileOpen(false);
      return;
    }

    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      const id = href.replace("#", "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? "bg-background/90 border-b border-border shadow-md"
          : "bg-background/80 border-b border-transparent"
      }`}
    >
      <div className={`container flex items-center justify-between transition-all duration-300 ${scrolled ? "h-12" : "h-16"}`}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center gap-2 relative">
          <div className="relative inline-block">
            <img src={canzoLogo} alt="Canzo" className="h-8" />
            <div
              className="absolute pointer-events-none"
              style={{
                right: '0.5%',
                top: '18%',
                width: '21%',
                height: '72%',
              }}
            >
              <NavClockHands />
            </div>
          </div>
        </a>
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="hover:text-foreground transition-colors cursor-pointer">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://canzo.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-[342px]:inline-block px-5 py-2 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:bg-amber-hover transition-colors"
          >
            Get Started
          </a>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-300 ${
          mobileOpen ? "grid-rows-[1fr] opacity-100 border-t border-border py-4" : "grid-rows-[0fr] opacity-0 py-0"
        } bg-background/95 backdrop-blur-md`}
      >
        <div className="overflow-hidden">
          <div className="container flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
