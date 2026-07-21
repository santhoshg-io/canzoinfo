import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Send, CheckCircle2, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { sanitizeInput, sanitizeUrl, validateHoneypot, checkRateLimit } from "@/lib/security";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const interestOptions = [
  "Backend Development",
  "Frontend Development",
  "App Development",
  "Web Development",
  "Graphic Design",
  "UI / UX Design",
  "Manual Testing / Automation Testing",
  "Digital Marketing",
  "Reels / Short-form Content Creation",
  "PPT / Presentation Design",
  "Photography",
  "Social Media Management",
  "Content Writing",
  "Photo and Video Editing",
];

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .max(100, "Name must be under 100 characters")
    .regex(/^[a-zA-Z\s.]+$/, "Name can only contain letters, spaces and dots"),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit mobile number"),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address")
    .max(255, "Email is too long"),
  college: z.string().min(2, "College name is required").max(200, "College name is too long"),
  department: z.string().min(2, "Department / course is required").max(200, "Department name is too long"),
  yearOfStudy: z.enum(["1st Year", "2nd Year", "3rd Year", "4th Year"], {
    required_error: "Please select your year of study",
  }),
  interests: z.array(z.string()).min(1, "Select at least one area of interest"),
  otherInterest: z.string().max(100, "Too long").optional(),
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "Please rate your skill level",
  }),
  hasLaptop: z.enum(["Yes", "No"], {
    required_error: "Please select an option",
  }),
  resume: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Resume link is required")
    .refine((val) => Boolean(sanitizeUrl(val)), "Please enter a valid HTTP/HTTPS URL"),
  presentation: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Presentation link is required")
    .refine((val) => Boolean(sanitizeUrl(val)), "Please enter a valid HTTP/HTTPS URL"),
});

type FormValues = z.infer<typeof formSchema>;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const InternshipApplyPage = () => {
  const [honeypot, setHoneypot] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      college: "",
      department: "",
      yearOfStudy: undefined,
      interests: [],
      otherInterest: "",
      skillLevel: undefined,
      hasLaptop: undefined,
      resume: "",
      presentation: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (values: FormValues) => {
    if (!validateHoneypot(honeypot)) {
      return;
    }

    if (!checkRateLimit("internship_apply", 4000)) {
      setSubmitError("Too many submission attempts. Please wait a few seconds.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const safeResume = sanitizeUrl(values.resume);
    const safePresentation = sanitizeUrl(values.presentation);

    const payload = {
      _subject: `New Internship Application: ${sanitizeInput(values.name)} - ${sanitizeInput(values.college)}`,
      _captcha: "false",
      _template: "table",
      Name: sanitizeInput(values.name),
      Phone: sanitizeInput(values.phone),
      email: values.email.trim().toLowerCase(),
      College: sanitizeInput(values.college),
      Department: sanitizeInput(values.department),
      "Year of Study": sanitizeInput(values.yearOfStudy),
      Interests: values.interests.map(sanitizeInput).join(", "),
      ...(values.otherInterest ? { "Other Interest": sanitizeInput(values.otherInterest) } : {}),
      "Skill Level": sanitizeInput(values.skillLevel),
      "Has Laptop": sanitizeInput(values.hasLaptop),
      ...(safeResume ? { "Resume Link": safeResume } : {}),
      ...(safePresentation ? { "Presentation Link": safePresentation } : {})
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        setSubmitError(data.message || "Failed to send email via SMTP. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("Failed to connect to the email server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitted = form.formState.isSubmitSuccessful;

  return (
    <div className="min-h-screen">
      <section className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

        <div className="container max-w-3xl">
          <Link to="/internship" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Internship
          </Link>

          {/* Header */}
          <motion.div {...fadeUp} className="mb-10">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-4">
              CANZO Campus Talent & Interest Form
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold leading-tight tracking-tight mb-4">
              Apply for the <span className="text-gradient">Internship</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We believe every student has a unique talent. Through this form, we would like to understand your skills, interests, and the areas you would like to explore.
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
                Your application has been received successfully. We appreciate your interest in joining CANZO! Our team will review your skills and get in touch with you shortly. Keep up the great energy!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link to="/internship">
                  <Button variant="outline" className="rounded-full">
                    Back to Internship
                  </Button>
                </Link>
                <Button
                  onClick={() => form.reset(undefined, { keepIsSubmitSuccessful: false })}
                  className="rounded-full bg-accent text-accent-foreground hover:bg-amber-hover"
                >
                  Submit Another Response
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div {...fadeUp} className="p-6 sm:p-10 rounded-2xl bg-card border border-border shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="website_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  {/* Personal Details */}
                  <div className="space-y-5">
                    <h2 className="text-lg font-display font-semibold text-foreground">Personal Details</h2>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name <span className="text-destructive">*</span></FormLabel>
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

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="college"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>College Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="Your college name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department / Course Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Computer Science" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Year of Study */}
                  <FormField
                    control={form.control}
                    name="yearOfStudy"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Year of Study <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((year) => (
                              <FormItem key={year} className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={year} />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">{year}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Area of Interest */}
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem className="space-y-4">
                        <div>
                          <FormLabel>Area of Interest / Skills <span className="text-destructive">*</span></FormLabel>
                          <p className="text-xs text-muted-foreground mt-1">Select all the areas that match your skills or interests.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {interestOptions.map((option) => (
                            <FormField
                              key={option}
                              control={form.control}
                              name="interests"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-border p-3 hover:bg-accent/5 transition-colors">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        const current = field.value || [];
                                        return checked
                                          ? field.onChange([...current, option])
                                          : field.onChange(current.filter((item) => item !== option));
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal text-sm cursor-pointer leading-none mt-0.5">
                                    {option}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="otherInterest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Mention any other skill or interest" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Skill Level */}
                  <FormField
                    control={form.control}
                    name="skillLevel"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>How would you rate your skill level in your selected area? <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            {["Beginner", "Intermediate", "Advanced"].map((level) => (
                              <FormItem key={level} className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={level} />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">{level}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Laptop */}
                  <FormField
                    control={form.control}
                    name="hasLaptop"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Do you have a Laptop? <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex flex-wrap gap-4"
                          >
                            {["Yes", "No"].map((option) => (
                              <FormItem key={option} className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={option} />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">{option}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

export default InternshipApplyPage;
