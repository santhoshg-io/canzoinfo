import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertCircle, Search, ShieldCheck, Award, Calendar, School, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { certificates } from "@/data/certificates";
import Footer from "@/components/Footer";
import { sanitizeInput, sanitizeSqlString } from "@/lib/security";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
};

const CertificateVerifyPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const certParam = searchParams.get("cert") || "";
  
  const [certId, setCertId] = useState(certParam);
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (certParam) {
      setCertId(certParam);
      handleVerify(certParam);
    }
  }, [certParam]);

  const handleVerify = (rawId: string) => {
    const sanitizedRaw = sanitizeSqlString(sanitizeInput(rawId));
    const cleanId = sanitizedRaw.trim().toLowerCase();
    
    if (!cleanId) {
      setError("Please enter a valid certificate number.");
      setResult(null);
      setSearched(false);
      return;
    }

    // Find certificate (case insensitive match, ignoring hyphens)
    const normalizedInput = cleanId.replace(/-/g, "");
    const foundCertKey = Object.keys(certificates).find(
      (key) => key.toLowerCase().replace(/-/g, "") === normalizedInput
    );

    if (foundCertKey) {
      setResult(certificates[foundCertKey]);
      setError("");
    } else {
      setResult(null);
      setError(`No certificate found with ID "${sanitizedRaw}". Please double-check the number.`);
    }
    setSearched(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(certId ? { cert: certId } : {});
    handleVerify(certId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <section className="pt-20 pb-20 relative overflow-hidden flex-1">
        {/* Glow Effects */}
        <div className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

        <div className="container max-w-3xl">
          <Link
            to="/internship"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Internship Program
          </Link>

          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Verification Center
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold leading-tight tracking-tight mb-3">
              Verify Internship <span className="text-gradient">Certificate</span>
            </h1>
            <p className="text-muted-foreground">
              Enter the certificate ID to instantly verify the authenticity of a student's internship and view their completion credentials.
            </p>
          </div>

          {/* Search Form */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-lg backdrop-blur-sm mb-8">
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="e.g. cz-ip-fpd-011"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  className="pl-11 h-12 bg-background/50 border-border focus:border-accent focus:ring-accent rounded-xl text-base"
                />
              </div>
              <Button
                type="submit"
                className="h-12 px-8 rounded-xl bg-accent text-accent-foreground hover:bg-amber-hover transition-colors font-semibold shadow-md glow-amber"
              >
                Verify Now
              </Button>
            </form>

          </div>

          {/* Verification Results */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                {...fadeUp}
                className="p-5 rounded-2xl bg-destructive/10 border border-destructive/20 flex gap-3.5 items-start"
              >
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-destructive text-sm">Verification Failed</h4>
                  <p className="text-sm text-muted-foreground mt-1">{error}</p>
                </div>
              </motion.div>
            )}

            {searched && result && (
              <motion.div
                key="result"
                {...fadeUp}
                className="rounded-2xl border border-accent/20 bg-card overflow-hidden shadow-2xl relative"
              >
                {/* Certificate Background Accent */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-accent via-amber-500 to-accent" />

                {/* Status Bar */}
                <div className="p-4 bg-accent/5 border-b border-border flex items-center justify-between flex-wrap gap-2 px-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-semibold text-foreground">Verified Canzo Certificate</span>
                  </div>
                  <span className="text-xs font-mono bg-accent/20 text-accent-foreground px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                    {result.status}
                  </span>
                </div>

                <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                  {/* Photo Section */}
                  {result.photoUrl && (
                    <div className="shrink-0 relative">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-accent/30 shadow-md bg-muted">
                        <img
                          src={result.photoUrl}
                          alt={result.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Details Section */}
                  <div className="flex-1 space-y-5 text-center md:text-left">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Student Intern</span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-0.5">{result.name}</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-left">
                      <div className="flex gap-3 items-start p-3 rounded-xl bg-muted/30 border border-border/50">
                        <School className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">College</div>
                          <div className="font-semibold text-foreground mt-0.5">{result.college}</div>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start p-3 rounded-xl bg-muted/30 border border-border/50">
                        <Briefcase className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Internship Role</div>
                          <div className="font-semibold text-foreground mt-0.5">{result.role}</div>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start p-3 rounded-xl bg-muted/30 border border-border/50">
                        <Calendar className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Duration</div>
                          <div className="font-semibold text-foreground mt-0.5">{result.duration} ({result.startDate} - {result.endDate})</div>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start p-3 rounded-xl bg-muted/30 border border-border/50">
                        <Award className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs text-muted-foreground font-medium">Certificate ID & Issue Date</div>
                          <div className="font-semibold text-foreground mt-0.5 font-mono text-xs">{result.id.toUpperCase()} (Issued: {result.issueDate})</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CertificateVerifyPage;
