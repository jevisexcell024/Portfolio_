"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Home, 
  User, 
  Code, 
  FolderOpen, 
  Mail, 
  Download, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Github,
  Linkedin,
  Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "#home" },
  { id: "about", label: "About", icon: User, href: "#about" },
  { id: "skills", label: "Skills", icon: Code, href: "#skills" },
  { id: "projects", label: "Projects", icon: FolderOpen, href: "#projects" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const navOpacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 0.95]);
  const navBlur = useTransform(scrollYProgress, [0, 0.1], [10, 20]);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);

    // Update active section based on scroll position
    const sections = navItems.map(item => document.getElementById(item.id.replace('#', '')));
    const currentSection = sections.find(section => {
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom >= 100;
    });

    if (currentSection) {
      setActiveSection(currentSection.id);
    }
  }, []);

  // Mouse move handler for magnetic effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const downloadResume = () => {
    // Simulate resume download
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    link.click();
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary z-50"
        style={{ scaleX: scrollYProgress }}
        initial={{ scaleX: 0 }}
        transformOrigin="0%"
      />

      {/* Main Navigation */}
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-2xl border border-border/50"
        style={{
          opacity: navOpacity,
          backdropFilter: `blur(${navBlur}px)`,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div 
          className="bg-background/80 backdrop-blur-xl rounded-2xl border border-border/30 shadow-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, 
              rgba(26, 26, 26, 0.9) 0%, 
              rgba(42, 42, 42, 0.8) 50%, 
              rgba(26, 26, 26, 0.9) 100%)`
          }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `conic-gradient(from ${mousePosition.x}deg, 
                #0070f3 0deg, 
                #7c3aed 120deg, 
                #0070f3 240deg, 
                #7c3aed 360deg)`,
              padding: '1px',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'xor',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <div className="relative flex items-center gap-1 p-2">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 px-3 py-2 cursor-pointer"
              onClick={() => scrollToSection("#home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Code className="w-4 h-4 text-white" />
              </motion.div>
              <span className="font-display font-semibold text-sm hidden sm:block">
                Portfolio
              </span>
            </motion.div>

            {/* Desktop Navigation Items */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;
                
                return (
                  <motion.button
                    key={item.id}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-muted-foreground hover:text-white'
                    }`}
                    onClick={() => scrollToSection(item.href)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Active background */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl border border-primary/30"
                          layoutId="activeTab"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Hover particles */}
                    <AnimatePresence>
                      {hoveredItem === item.id && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-primary rounded-full"
                              initial={{ 
                                opacity: 0, 
                                scale: 0,
                                x: Math.random() * 40 - 20,
                                y: Math.random() * 40 - 20
                              }}
                              animate={{ 
                                opacity: [0, 1, 0], 
                                scale: [0, 1, 0],
                                x: Math.random() * 80 - 40,
                                y: Math.random() * 80 - 40
                              }}
                              exit={{ opacity: 0, scale: 0 }}
                              transition={{ 
                                duration: 2,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 1
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>

                    <div className="relative flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-2">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-xl hover:bg-accent/50 transition-colors"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isDarkTheme ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Moon className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Sun className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Resume Button */}
              <Button
                onClick={downloadResume}
                size="sm"
                className="hidden sm:flex bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-accent/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-20 right-4 left-4 bg-background/95 backdrop-blur-xl rounded-2xl border border-border/30 shadow-2xl z-30 md:hidden overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="p-6">
                {/* Mobile Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    
                    return (
                      <motion.button
                        key={item.id}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-white' 
                            : 'hover:bg-accent/50 text-muted-foreground hover:text-white'
                        }`}
                        onClick={() => scrollToSection(item.href)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile Actions */}
                <div className="mt-6 pt-6 border-t border-border/30 space-y-4">
                  <Button
                    onClick={downloadResume}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white border-0"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>

                  {/* Social Links */}
                  <div className="flex justify-center gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-xl hover:bg-accent/50 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon className="w-5 h-5 text-muted-foreground hover:text-white transition-colors" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};