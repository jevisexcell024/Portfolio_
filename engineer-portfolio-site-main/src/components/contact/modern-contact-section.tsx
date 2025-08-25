"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Calendar, 
  Download, 
  Send, 
  Check, 
  AlertCircle, 
  Upload, 
  Clock, 
  Star, 
  Github, 
  Linkedin, 
  Twitter,
  MessageSquare,
  Zap,
  Target,
  DollarSign,
  Timer,
  User,
  FileText,
  Globe,
  Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

interface FormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: number[];
  timeline: string;
  message: string;
  contactPreference: string;
  urgency: string;
}

interface ContactMethod {
  id: string;
  icon: any;
  label: string;
  value: string;
  action: string;
  color: string;
  hoverColor: string;
}

export const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: [10000],
    timeline: "",
    message: "",
    contactPreference: "email",
    urgency: "normal"
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [responseTime, setResponseTime] = useState("2-4 hours");

  const contactMethods: ContactMethod[] = [
    {
      id: "email",
      icon: Mail,
      label: "Email",
      value: "contact@johndoe.dev",
      action: "mailto:contact@johndoe.dev",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "from-blue-600 to-cyan-600"
    },
    {
      id: "location",
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      action: "https://maps.google.com",
      color: "from-green-500 to-emerald-500",
      hoverColor: "from-green-600 to-emerald-600"
    },
    {
      id: "phone",
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      color: "from-purple-500 to-violet-500",
      hoverColor: "from-purple-600 to-violet-600"
    },
    {
      id: "calendar",
      icon: Calendar,
      label: "Schedule Meeting",
      value: "Book a call",
      action: "https://calendly.com/johndoe",
      color: "from-orange-500 to-red-500",
      hoverColor: "from-orange-600 to-red-600"
    }
  ];

  const socialLinks = [
    { icon: Github, url: "https://github.com", color: "hover:text-white" },
    { icon: Linkedin, url: "https://linkedin.com", color: "hover:text-blue-400" },
    { icon: Twitter, url: "https://twitter.com", color: "hover:text-blue-300" }
  ];

  const projectTypes = [
    { id: "web", label: "Web Development", icon: Globe },
    { id: "mobile", label: "Mobile App", icon: Phone },
    { id: "api", label: "API Development", icon: Zap },
    { id: "consulting", label: "Consulting", icon: MessageSquare }
  ];

  const timelineOptions = [
    { id: "asap", label: "ASAP", icon: Zap },
    { id: "1month", label: "Within 1 month", icon: Calendar },
    { id: "3months", label: "Within 3 months", icon: Timer },
    { id: "flexible", label: "Flexible", icon: Coffee }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTime(prev => {
        const times = ["2-4 hours", "within 24 hours", "same day", "2-4 hours"];
        const currentIndex = times.indexOf(prev);
        return times[(currentIndex + 1) % times.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else {
          delete newErrors.name;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!emailRegex.test(value)) {
          newErrors.email = "Please enter a valid email";
        } else {
          delete newErrors.email;
        }
        break;
      case "message":
        if (!value.trim()) {
          newErrors.message = "Message is required";
        } else if (value.trim().length < 10) {
          newErrors.message = "Message must be at least 10 characters";
        } else {
          delete newErrors.message;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (key !== "budget" && key !== "company") {
        validateField(key, formData[key as keyof FormData]);
      }
    });

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadResume = () => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const steps = [
    { title: "Basic Info", fields: ["name", "email", "company"] },
    { title: "Project Details", fields: ["projectType", "budget", "timeline"] },
    { title: "Message & Preferences", fields: ["message", "contactPreference", "urgency"] }
  ];

  return (
    <section className="relative min-h-screen bg-background py-24 overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? I'm here to help you create exceptional digital experiences.
          </p>
          
          {/* Status indicators */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-success"
            >
              <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-medium">Available for new projects</span>
            </motion.div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Usually responds {responseTime}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Methods & Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Methods Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <motion.div
                    key={method.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="group cursor-pointer"
                  >
                    <Card className="h-full bg-card/50 backdrop-blur-lg border-border/50 hover:border-primary/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} group-hover:${method.hoverColor} flex items-center justify-center mb-4 transition-all duration-300`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">{method.label}</h3>
                        <p className="text-muted-foreground text-sm">{method.value}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Links */}
            <Card className="bg-card/50 backdrop-blur-lg border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Connect With Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-12 h-12 rounded-lg bg-accent flex items-center justify-center transition-colors duration-300 ${social.color}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Download Resume */}
            <Card className="bg-card/50 backdrop-blur-lg border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold mb-1">Download Resume</h3>
                    <p className="text-sm text-muted-foreground">Get my latest CV and portfolio</p>
                  </div>
                  <Button
                    onClick={handleDownloadResume}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
                {downloadProgress > 0 && (
                  <div className="space-y-2">
                    <Progress value={downloadProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{downloadProgress}% complete</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Proof */}
            <Card className="bg-card/50 backdrop-blur-lg border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 Client Rating</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Exceptional work quality and communication. Delivered exactly what we needed."
                </p>
                <p className="text-xs text-muted-foreground mt-2">- Sarah Johnson, Tech Startup CEO</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-card/50 backdrop-blur-lg border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Start Your Project</span>
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </div>
                </CardTitle>
                <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div>
                          <Input
                            placeholder="Your Name *"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className={`bg-input/50 ${errors.name ? "border-destructive" : ""}`}
                          />
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-destructive text-sm mt-1 flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {errors.name}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <Input
                            type="email"
                            placeholder="Your Email *"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className={`bg-input/50 ${errors.email ? "border-destructive" : ""}`}
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-destructive text-sm mt-1 flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {errors.email}
                            </motion.p>
                          )}
                        </div>

                        <Input
                          placeholder="Company (Optional)"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="bg-input/50"
                        />
                      </motion.div>
                    )}

                    {currentStep === 1 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="text-sm font-medium mb-3 block">Project Type</label>
                          <div className="grid grid-cols-2 gap-3">
                            {projectTypes.map((type) => {
                              const IconComponent = type.icon;
                              return (
                                <motion.button
                                  key={type.id}
                                  type="button"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleInputChange("projectType", type.id)}
                                  className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                                    formData.projectType === type.id
                                      ? "border-primary bg-primary/10"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <IconComponent className="w-5 h-5 mb-2" />
                                  <p className="text-sm font-medium">{type.label}</p>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-3 block">
                            Budget Range: ${formData.budget[0].toLocaleString()}+
                          </label>
                          <Slider
                            value={formData.budget}
                            onValueChange={(value) => handleInputChange("budget", value)}
                            max={100000}
                            min={1000}
                            step={1000}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>$1K</span>
                            <span>$100K+</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-3 block">Timeline</label>
                          <div className="grid grid-cols-2 gap-3">
                            {timelineOptions.map((option) => {
                              const IconComponent = option.icon;
                              return (
                                <motion.button
                                  key={option.id}
                                  type="button"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleInputChange("timeline", option.id)}
                                  className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                                    formData.timeline === option.id
                                      ? "border-primary bg-primary/10"
                                      : "border-border hover:border-primary/50"
                                  }`}
                                >
                                  <IconComponent className="w-4 h-4 mb-1" />
                                  <p className="text-xs font-medium">{option.label}</p>
                                </motion.button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <Textarea
                            placeholder="Tell me about your project *"
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            className={`bg-input/50 min-h-32 ${errors.message ? "border-destructive" : ""}`}
                          />
                          {errors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-destructive text-sm mt-1 flex items-center gap-1"
                            >
                              <AlertCircle className="w-4 h-4" />
                              {errors.message}
                            </motion.p>
                          )}
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-3 block">Preferred Contact Method</label>
                          <div className="flex gap-3">
                            {["email", "phone", "meeting"].map((method) => (
                              <motion.button
                                key={method}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleInputChange("contactPreference", method)}
                                className={`px-4 py-2 rounded-lg border text-sm transition-all duration-300 ${
                                  formData.contactPreference === method
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                {method.charAt(0).toUpperCase() + method.slice(1)}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-3 block">Project Urgency</label>
                          <div className="flex gap-3">
                            {["low", "normal", "high", "urgent"].map((level) => (
                              <motion.button
                                key={level}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleInputChange("urgency", level)}
                                className={`px-4 py-2 rounded-lg border text-sm transition-all duration-300 ${
                                  formData.urgency === level
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                    >
                      Previous
                    </Button>

                    {currentStep < steps.length - 1 ? (
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    )}
                  </div>

                  {/* Success/Error Messages */}
                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2 text-success bg-success/10 p-4 rounded-lg"
                      >
                        <Check className="w-5 h-5" />
                        <span>Message sent successfully! I'll get back to you soon.</span>
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2 text-destructive bg-destructive/10 p-4 rounded-lg"
                      >
                        <AlertCircle className="w-5 h-5" />
                        <span>Something went wrong. Please try again.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4">
          {/* Quick Email */}
          <motion.a
            href="mailto:contact@johndoe.dev"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Mail className="w-6 h-6 text-white" />
          </motion.a>

          {/* Quick Call */}
          <motion.a
            href="tel:+15551234567"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Phone className="w-6 h-6 text-white" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};