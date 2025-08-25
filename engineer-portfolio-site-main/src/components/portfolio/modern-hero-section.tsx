"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink,
  Code2,
  Database,
  Globe,
  Smartphone,
  Zap,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const taglines = [
    "Crafting exceptional digital experiences",
    "Building scalable web applications",
    "Turning ideas into reality with code",
    "Full-stack developer & problem solver"
  ];

  const techStack = [
    { name: "Frontend", icon: Globe, color: "#0070f3" },
    { name: "Backend", icon: Database, color: "#7c3aed" },
    { name: "Mobile", icon: Smartphone, color: "#10b981" },
    { name: "DevOps", icon: Cpu, color: "#f59e0b" },
    { name: "API", icon: Zap, color: "#ef4444" },
    { name: "Code", icon: Code2, color: "#8b5cf6" }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const currentText = taglines[currentTagline];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTagline((prev) => (prev + 1) % taglines.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTagline, taglines]);

  const FloatingShape = ({ delay = 0, duration = 20, size = 100, className = "" }) => (
    <motion.div
      className={`absolute rounded-full opacity-10 ${className}`}
      style={{
        width: size,
        height: size,
        background: "linear-gradient(45deg, #0070f3, #7c3aed)",
      }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        rotate: [0, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );

  const Particle = ({ index }: { index: number }) => (
    <motion.div
      className="absolute w-1 h-1 bg-primary rounded-full opacity-30"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [-50, 50],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: index * 0.1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-surface to-background">
      {/* Cursor Trail */}
      <motion.div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          background: "radial-gradient(circle, #0070f3, transparent)",
        }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(0,112,243,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,112,243,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Floating Shapes */}
        <FloatingShape delay={0} duration={25} size={120} className="top-20 left-20" />
        <FloatingShape delay={5} duration={30} size={80} className="top-40 right-32" />
        <FloatingShape delay={10} duration={35} size={100} className="bottom-40 left-40" />
        <FloatingShape delay={15} duration={28} size={60} className="bottom-20 right-20" />

        {/* Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} index={i} />
        ))}

        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-2"
          >
            <p className="text-muted-foreground font-mono text-sm">Hello, I'm</p>
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              John Smith
            </h1>
          </motion.div>

          {/* Job Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl lg:text-3xl font-semibold text-foreground"
          >
            Full-Stack Software Engineer
          </motion.h2>

          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="h-8"
          >
            <p className="text-lg text-muted-foreground font-mono">
              {displayText}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="group">
              View Projects
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="group">
              <Download className="mr-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
              Download Resume
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex gap-4"
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "#", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-surface/50 backdrop-blur-sm border border-border hover:border-primary transition-colors group"
                aria-label={label}
              >
                <Icon className="w-5 h-5 group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Interactive Elements */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          {/* Avatar/Profile Area */}
          <motion.div
            className="relative w-80 h-80 mx-auto mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/20 via-secondary/20 to-primary/20 blur-3xl" />
            <div className="relative w-full h-full rounded-3xl bg-surface/50 backdrop-blur-sm border border-border overflow-hidden">
              <div className="absolute inset-4 rounded-2xl bg-gradient-to-tr from-primary/30 to-secondary/30 flex items-center justify-center">
                <Code2 className="w-20 h-20 text-foreground" />
              </div>
              {/* Floating decorative elements */}
              <motion.div
                className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-secondary"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Tech Stack Cards */}
          <div className="grid grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: `0 10px 25px ${tech.color}20`
                }}
                className="p-4 rounded-xl bg-surface/30 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div 
                    className="p-2 rounded-lg group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${tech.color}20` }}
                  >
                    <tech.icon 
                      className="w-6 h-6 transition-colors duration-300" 
                      style={{ color: tech.color }}
                    />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Action Elements */}
          <motion.div
            className="absolute -top-8 -right-8 p-3 rounded-full bg-primary/20 backdrop-blur-sm"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap className="w-6 h-6 text-primary" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4 p-2 rounded-full bg-secondary/20 backdrop-blur-sm"
            animate={{ 
              x: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Database className="w-5 h-5 text-secondary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};