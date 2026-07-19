import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const jobRoles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Product Manager",
  "Marketing Specialist",
  "Sales Executive",
  "Other"
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required").max(100, "Name must be under 100 characters"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid mobile number"),
  email: z.string().email("Enter a valid email address").max(255, "Email is too long"),
  role: z.string().min(2, "Role is required"),
  experience: z.string().min(1, "Experience is required"),
  portfolio: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  resume: z.string().url("Please enter a valid URL").min(1, "Resume link is required"),
  presentation: z.string().url("Please enter a valid URL").min(1, "Presentation link is required"),
});

type FormValues = z.infer<typeof formSchema>;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CareersApplyPage = () => {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get("role");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      role: "",
      experience: "",
      portfolio: "",
      resume: "",
      presentation: "",
    },
  });

  useEffect(() => {
    if (roleParam) {
      form.setValue("role", roleParam);
    }
  }, [roleParam, form]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      _subject: `New Career Application: ${values.role} - ${values.name}`,
      _captcha: "false",
      _template: "table",
      Name: values.name,
      Phone: values.phone,
      email: values.email, // lowercase email for FormSubmit Reply-To
      Role: values.role,
      Experience: values.experience,
      ...(values.portfolio ? { Portfolio: values.portfolio } : {}),
      ...(values.resume ? { "Resume Link": values.resume } : {}),
      ...(values.presentation ? { "Presentation Link": values.presentation } : {})
    };

    try {
      // FormSubmit requires the /ajax/ endpoint when using fetch/React
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
          setSubmitError(data.message || "FormSubmit rejected the submission.");
        }
        // Success handled by react-hook-form's isSubmitSuccessful
      } else {
        const data = await response.json().catch(() => ({}));
        setSubmitError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("Failed to connect to the server. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitted = form.formState.isSubmitSuccessful;

  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 pt-20 pb-20 relative overflow-hidden">
        <div className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

        <div className="container max-w-3xl relative z-10">
          <Link to="/careers" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Careers
          </Link>

          {/* Header */}
          <motion.div {...fadeUp} className="mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-4">
              Join Canzo
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight mb-4">
              Apply for <span className="text-gradient">{roleParam ? roleParam : "a Role"}</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We're excited to see what you can bring to the table. Please fill out the form below and we'll get back to you soon.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 sm:p-12 rounded-2xl bg-accent/10 border border-accent/20 text-center"
            >
              <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">Thank you, {form.getValues("name")}!</h2>
              <p className="text-muted-foreground mb-6">
                Your application for the role of {form.getValues("role")} has been received successfully. We appreciate your interest in joining Canzo! Our hiring team will review your details and get in touch with you shortly. Keep up the great work!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/careers">
                  <Button variant="outline" className="rounded-full">
                    View Open Roles
                  </Button>
                </Link>
                <Button
                  onClick={() => form.reset(undefined, { keepIsSubmitSuccessful: false })}
                  className="rounded-full bg-accent text-accent-foreground hover:bg-amber-hover"
                >
                  Submit Another Application
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div {...fadeUp} className="p-6 sm:p-10 rounded-2xl bg-card border border-border shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Details */}
                  <div className="space-y-5">
                    <h2 className="text-lg font-display font-semibold text-foreground">Personal Details</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="9876543210" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email ID <span className="text-destructive">*</span></FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-5">
                    <h2 className="text-lg font-display font-semibold text-foreground">Professional Details</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Applying for <span className="text-destructive">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {jobRoles.map((role) => (
                                  <SelectItem key={role} value={role}>{role}</SelectItem>
                                ))}
                                {roleParam && !jobRoles.includes(roleParam) && (
                                  <SelectItem value={roleParam}>{roleParam}</SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Experience <span className="text-destructive">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select experience" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Fresher">Fresher (0 years)</SelectItem>
                                <SelectItem value="1-3 Years">1-3 Years</SelectItem>
                                <SelectItem value="3-5 Years">3-5 Years</SelectItem>
                                <SelectItem value="5+ Years">5+ Years</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="portfolio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Portfolio / LinkedIn URL (Optional)</FormLabel>
                          <FormControl>
                            <Input type="url" placeholder="https://linkedin.com/in/yourprofile" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Resume Link */}
                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Resume Link (Google Drive, Dropbox, etc.) <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="https://drive.google.com/..." {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">Please provide a public link to your resume.</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Presentation Link */}
                  <FormField
                    control={form.control}
                    name="presentation"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Presentation About Yourself Link <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input type="url" placeholder="https://drive.google.com/..." {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">Please provide a public link to your presentation (Google Slides, Canva, etc.).</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {submitError && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
                      {submitError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-accent text-accent-foreground font-semibold text-base hover:bg-amber-hover transition-all glow-amber h-12"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </form>
              </Form>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CareersApplyPage;
