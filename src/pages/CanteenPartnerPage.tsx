import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Store, Receipt, BarChart3, Package, Megaphone, Clock, CheckCircle2, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "@/components/Footer";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
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

const stats = [
  { label: "Partner Vendors", value: "50+", icon: Store },
  { label: "Orders Processed", value: "2M+", icon: Receipt },
  { label: "Revenue Growth", value: "35%", icon: BarChart3 },
  { label: "Avg. Prep Optimization", value: "40%", icon: Clock },
];

const features = [
  { icon: Receipt, title: "Digital Orders & Billing", desc: "Receive orders digitally with automatic billing and invoicing — no manual entry needed." },
  { icon: Package, title: "Inventory Management", desc: "Track stock levels in real time. Get alerts when items run low and auto-update your menu." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Understand your best sellers, peak hours, and revenue trends with detailed analytics." },
  { icon: Clock, title: "Faster Turnaround", desc: "Streamlined order flow means faster preparation and happier customers." },
  { icon: Megaphone, title: "Promotions & Deals", desc: "Run targeted promotions to boost sales during off-peak hours or launch new menu items." },
  { icon: Store, title: "Multi-Outlet Support", desc: "Manage multiple outlets from a single dashboard. Perfect for canteen chains on campus." },
];

const formSchema = z.object({
  ownerName: z.string().min(2, "Owner name is required").max(100),
  canteenName: z.string().min(2, "Canteen name is required").max(200),
  phone: z.string().regex(/^\d{10}$/, "Enter a valid mobile number"),
  email: z.string().email("Enter a valid email address").max(255),
  collegeName: z.string().min(2, "College / Institution name is required").max(200),
  city: z.string().min(2, "City is required").max(100),
  outletCount: z.string().min(1, "Please select number of outlets"),
  dailyOrders: z.string().min(1, "Please select daily order volume"),
  presentation: z.string().url("Please enter a valid URL").min(1, "Presentation link is required"),
});

type FormValues = z.infer<typeof formSchema>;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const CanteenPartnerPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerName: "",
      canteenName: "",
      phone: "",
      email: "",
      collegeName: "",
      city: "",
      outletCount: "",
      dailyOrders: "",
      presentation: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    setIsSubmitSuccess(false);

    const payload = {
      _subject: `New Partner Application: ${values.canteenName} - ${values.ownerName}`,
      _captcha: "false",
      _template: "table",
      Name: values.ownerName,
      Phone: values.phone,
      email: values.email, // lowercase email for FormSubmit Reply-To
      "Canteen Name": values.canteenName,
      "College Name": values.collegeName,
      City: values.city,
      Outlets: values.outletCount,
      "Daily Orders": values.dailyOrders,
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
        } else {
          setIsSubmitSuccess(true);
        }
      } else {
        const data = await response.json().catch(() => ({}));
        setSubmitError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting partner application:", error);
      setSubmitError("Failed to connect to the server. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitted = isSubmitSuccess || form.formState.isSubmitSuccessful;

  return (
    <div className="min-h-screen">
      <section className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute top-10 -right-20 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

        <div className="container">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <motion.div {...fadeUp} className="max-w-2xl mb-16">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-4">
              🏪 For Canteen Partners
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight mb-6">
              Grow your canteen<br />
              <span className="text-gradient">business digitally.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Manage orders, inventory, and billing from one dashboard. Reach more students and increase your revenue with Canzo.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {stats.map((s) => (
              <div key={s.label} className="p-6 rounded-2xl bg-card border border-border text-center">
                <s.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                  <AnimatedCounter value={s.value} />
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl font-display font-bold mb-10">
            Tools to <span className="text-gradient">scale</span>
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {features.map((f, i) => (
              <motion.div key={f.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors">
                <f.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Partner Application Form */}
          <motion.div {...fadeUp} className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold tracking-wide uppercase border border-accent/20 mb-4">
                Become a Partner
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">
                Ready to <span className="text-gradient">join Canzo?</span>
              </h2>
              <p className="text-muted-foreground text-base">
                Fill in your details below and our team will reach out within 24 hours.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 sm:p-12 rounded-2xl bg-accent/10 border border-accent/20 text-center"
              >
                <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" />
                <h2 className="text-2xl font-display font-bold mb-2">Thank you, {form.getValues("ownerName")}!</h2>
                <p className="text-muted-foreground mb-6">
                  Your application for {form.getValues("canteenName")} has been received successfully! We appreciate your interest in partnering with Canzo. Our team will review your details and reach out to you within 24 hours. Have a great day!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/">
                    <Button variant="outline" className="rounded-full">
                      Back to Home
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
              <div className="p-6 sm:p-10 rounded-2xl bg-card border border-border shadow-sm">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Owner & Canteen Details */}
                    <div className="space-y-5">
                      <h3 className="text-lg font-display font-semibold text-foreground">Canteen Details</h3>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="ownerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Owner / Manager Name <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="canteenName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Canteen / Restaurant Name <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <Input placeholder="Your canteen name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
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
                    </div>

                    {/* Location Details */}
                    <div className="space-y-5">
                      <h3 className="text-lg font-display font-semibold text-foreground">Location Details</h3>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="collegeName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>College / Institution Name <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Anna University" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Chennai" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Business Details */}
                    <div className="space-y-5">
                      <h3 className="text-lg font-display font-semibold text-foreground">Business Details</h3>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="outletCount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Outlets <span className="text-destructive">*</span></FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select number of outlets" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1 Outlet</SelectItem>
                                  <SelectItem value="2-3">2–3 Outlets</SelectItem>
                                  <SelectItem value="4-10">4–10 Outlets</SelectItem>
                                  <SelectItem value="10+">10+ Outlets</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="dailyOrders"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Approx. Daily Orders <span className="text-destructive">*</span></FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select daily volume" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Less than 50">Less than 50</SelectItem>
                                  <SelectItem value="50-150">50–150 orders</SelectItem>
                                  <SelectItem value="150-300">150–300 orders</SelectItem>
                                  <SelectItem value="300+">300+ orders</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

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
                      {isSubmitting ? "Submitting Application..." : "Become a Partner"}
                      {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CanteenPartnerPage;
