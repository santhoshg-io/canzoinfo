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
  name: z.string().min(2, "Name is required").max(100, "Name must be under 100 characters"),
  phone: z.string().min(10, "Enter a valid phone number").max(15, "Phone number is too long"),
  email: z.string().email("Enter a valid email address").max(255, "Email is too long"),
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
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Resume is required")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "File must be under 10 MB")
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type), "Only PDF or DOC files are allowed"),
  presentation: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const InternshipApplyPage = () => {
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
      resume: undefined,
      presentation: undefined,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitError("");

    const formData = new FormData();
    // FormSubmit.co special fields
    formData.append("_subject", `New Internship Application: ${values.name} - ${values.college}`);
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    formData.append("Name", values.name);
    formData.append("Phone", values.phone);
    formData.append("Email", values.email);
    formData.append("College", values.college);
    formData.append("Department", values.department);
    formData.append("Year of Study", values.yearOfStudy);
    formData.append("Interests", values.interests.join(", "));
    if (values.otherInterest) formData.append("Other Interest", values.otherInterest);
    formData.append("Skill Level", values.skillLevel);
    formData.append("Has Laptop", values.hasLaptop);

    if (values.resume && values.resume[0]) {
      formData.append("Resume", values.resume[0]);
    }
    if (values.presentation && values.presentation[0]) {
      formData.append("Presentation", values.presentation[0]);
    }

    try {
      // FormSubmit requires the /ajax/ endpoint when using fetch/React
      const response = await fetch("https://formsubmit.co/ajax/tamiltamilboss090@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        // Success handled by react-hook-form's isSubmitSuccessful
      } else {
        const data = await response.json().catch(() => ({}));
        setSubmitError(data.message || "Something went wrong. Please try again.");
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitted = form.formState.isSubmitSuccessful;

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-20 relative overflow-hidden">
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
              <h2 className="text-2xl font-display font-bold mb-2">Application Received!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for applying. We will review your details and reach out via email or phone soon.
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
                              <Input type="tel" placeholder="+91 98765 43210" {...field} />
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

                  {/* Resume Upload */}
                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field: { onChange, value, ref, ...rest } }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Upload your Resume (PDF / DOC format) <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-3">
                            <Label
                              htmlFor="resume-upload"
                              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-border bg-background hover:bg-accent/5 cursor-pointer transition-colors"
                            >
                              <FileText className="w-5 h-5 text-accent" />
                              <span className="text-sm text-foreground">
                                {value && value.length === 1 ? value[0].name : "Choose a file"}
                              </span>
                            </Label>
                            <Input
                              id="resume-upload"
                              type="file"
                              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              ref={ref}
                              onChange={(e) => onChange(e.target.files)}
                              {...rest}
                              className="hidden"
                            />
                            <p className="text-xs text-muted-foreground">Upload 1 supported file. Max 10 MB.</p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Presentation Upload */}
                  <FormField
                    control={form.control}
                    name="presentation"
                    render={({ field: { onChange, value, ref, ...rest } }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Presentation About Yourself (Optional)</FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-3">
                            <Label
                              htmlFor="presentation-upload"
                              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-border bg-background hover:bg-accent/5 cursor-pointer transition-colors"
                            >
                              <FileText className="w-5 h-5 text-accent" />
                              <span className="text-sm text-foreground">
                                {value && value.length === 1 ? value[0].name : "Choose a file"}
                              </span>
                            </Label>
                            <Input
                              id="presentation-upload"
                              type="file"
                              accept=".pdf,.doc,.docx,.ppt,.pptx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                              ref={ref}
                              onChange={(e) => onChange(e.target.files)}
                              {...rest}
                              className="hidden"
                            />
                            <p className="text-xs text-muted-foreground">Upload 1 supported file (PDF, DOC, PPT). Max 10 MB.</p>
                          </div>
                        </FormControl>
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
