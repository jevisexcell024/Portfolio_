"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Github, Linkedin, Download } from "lucide-react";

const ComprehensiveContactForm = () => {
  return (
    <section className="relative mx-2.5 mt-2.5 rounded-t-2xl rounded-b-[36px] bg-background py-32 lg:mx-4">
      <div className="container max-w-2xl">
        <h1 className="text-center text-4xl font-semibold tracking-tight lg:text-5xl font-display">
          Let's Build Something Together
        </h1>
        <p className="mt-4 text-center leading-snug font-medium text-muted-foreground lg:mx-auto">
          I'm always excited to collaborate on innovative projects and explore new opportunities. 
          Whether you have a project in mind or just want to connect, I'd love to hear from you.
        </p>
        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          <div>
            <h2 className="font-semibold font-display flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email
            </h2>
            <div className="mt-3">
              <a
                href="mailto:john.smith@email.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                john.smith@email.com
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-semibold font-display flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Location
            </h2>
            <p className="mt-3 text-muted-foreground">
              San Francisco, CA
            </p>
          </div>
          <div>
            <h2 className="font-semibold font-display">Connect</h2>
            <div className="mt-3 flex gap-4">
              <a
                href="https://linkedin.com/in/johnsmith"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/johnsmith"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <DashedLine className="my-12" />
        {/* Project Inquiry Form */}
        <div className="mx-auto">
          <h2 className="text-lg font-semibold font-display">Project Inquiries</h2>
          <form className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="your.email@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label>Project Type</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">Select project type</option>
                <option value="web-application">Web Application</option>
                <option value="mobile-app">Mobile App</option>
                <option value="consultation">Consultation</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                placeholder="Tell me about your project ideas, requirements, or any questions you have."
                className="min-h-[120px] resize-none"
              />
            </div>
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
              <Button size="lg" type="submit" className="">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

interface DashedLineProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DashedLine = ({
  orientation = "horizontal",
  className,
}: DashedLineProps) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "relative text-muted-foreground",
        isHorizontal ? "h-px w-full" : "h-full w-px",
        className
      )}
    >
      <div
        className={cn(
          isHorizontal
            ? [
                "h-px w-full",
                "bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)]",
                "[mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]",
              ]
            : [
                "h-full w-px",
                "bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_8px)]",
                "[mask-image:linear-gradient(180deg,transparent,black_25%,black_75%,transparent)]",
              ]
        )}
      />
    </div>
  );
};

export { ComprehensiveContactForm };