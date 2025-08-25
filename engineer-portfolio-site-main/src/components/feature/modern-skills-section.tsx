"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { 
  Code2, 
  Database, 
  Cloud, 
  Smartphone, 
  Zap, 
  Star,
  Layers,
  Globe,
  Server,
  GitBranch,
  Monitor,
  Cpu
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  level: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: React.ComponentType<any>;
  skills: Skill[];
  gradient: string;
  size: "large" | "medium" | "small";
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: Monitor,
    gradient: "from-blue-500/20 to-cyan-500/20",
    size: "large",
    skills: [
      { name: "React", level: 95, icon: Code2, color: "#61DAFB" },
      { name: "TypeScript", level: 90, icon: Code2, color: "#3178C6" },
      { name: "Next.js", level: 88, icon: Globe, color: "#000000" },
      { name: "Tailwind CSS", level: 92, icon: Layers, color: "#06B6D4" },
      { name: "Vue.js", level: 75, icon: Code2, color: "#4FC08D" },
    ]
  },
  {
    title: "Backend Development",
    icon: Server,
    gradient: "from-green-500/20 to-emerald-500/20",
    size: "medium",
    skills: [
      { name: "Node.js", level: 88, icon: Server, color: "#339933" },
      { name: "Python", level: 82, icon: Code2, color: "#3776AB" },
      { name: "PostgreSQL", level: 85, icon: Database, color: "#336791" },
      { name: "MongoDB", level: 78, icon: Database, color: "#47A248" },
      { name: "Express", level: 90, icon: Zap, color: "#000000" },
    ]
  },
  {
    title: "DevOps & Tools",
    icon: Cloud,
    gradient: "from-purple-500/20 to-violet-500/20",
    size: "medium",
    skills: [
      { name: "Docker", level: 82, icon: Layers, color: "#2496ED" },
      { name: "AWS", level: 75, icon: Cloud, color: "#FF9900" },
      { name: "Git", level: 95, icon: GitBranch, color: "#F05032" },
      { name: "CI/CD", level: 80, icon: Cpu, color: "#326CE5" },
      { name: "Kubernetes", level: 70, icon: Layers, color: "#326CE5" },
    ]
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    gradient: "from-orange-500/20 to-red-500/20",
    size: "small",
    skills: [
      { name: "React Native", level: 85, icon: Smartphone, color: "#61DAFB" },
      { name: "Flutter", level: 72, icon: Smartphone, color: "#02569B" },
      { name: "Swift", level: 65, icon: Smartphone, color: "#FA7343" },
      { name: "Kotlin", level: 68, icon: Smartphone, color: "#7F52FF" },
    ]
  }
];

const SkillProgressRing = ({ level, color }: { level: number; color: string }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedLevel(level);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, level]);

  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedLevel / 100) * circumference;

  return (
    <div ref={ref} className="relative w-14 h-14 flex items-center justify-center">
      <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#2a2a2a"
          strokeWidth="3"
          fill="none"
        />
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 6px ${color}40)`
          }}
        />
      </svg>
      <span className="absolute text-xs font-mono font-medium">
        {Math.round(animatedLevel)}%
      </span>
    </div>
  );
};

const SkillCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = category.icon;

  const getGridSpan = () => {
    switch (category.size) {
      case "large": return "md:col-span-2 md:row-span-2";
      case "medium": return "md:col-span-2";
      case "small": return "md:col-span-1";
      default: return "md:col-span-1";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative ${getGridSpan()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`relative h-full min-h-[300px] rounded-2xl border border-border/50 bg-gradient-to-br ${category.gradient} backdrop-blur-sm overflow-hidden`}
        whileHover={{ 
          scale: 1.02,
          rotateX: 5,
          rotateY: 5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              className="p-3 rounded-xl bg-background/50 border border-border/50"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <IconComponent className="w-6 h-6 text-primary" />
            </motion.div>
            <h3 className="text-xl font-display font-semibold text-foreground">
              {category.title}
            </h3>
          </div>

          {/* Skills */}
          <div className="flex-1 space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                className="flex items-center gap-4 p-3 rounded-lg bg-background/30 border border-border/30 hover:bg-background/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {skill.level}%
                    </Badge>
                  </div>
                  <div className="w-full bg-border/50 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ 
                        background: `linear-gradient(90deg, ${skill.color}40, ${skill.color})`,
                        boxShadow: `0 0 8px ${skill.color}40`
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, delay: skillIndex * 0.1, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {category.size === "large" && (
                  <SkillProgressRing level={skill.level} color={skill.color} />
                )}
              </motion.div>
            ))}
          </div>

          {/* Experience badge */}
          <motion.div
            className="mt-4 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 transition-colors">
              <Star className="w-3 h-3 mr-1" />
              {category.size === "large" ? "5+ years" : 
               category.size === "medium" ? "3+ years" : "2+ years"}
            </Badge>
          </motion.div>
        </div>

        {/* Gradient border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(45deg, transparent, ${category.gradient.includes('blue') ? '#0070f3' : 
                                                              category.gradient.includes('green') ? '#10b981' : 
                                                              category.gradient.includes('purple') ? '#7c3aed' : '#f97316'}20, transparent)`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium">Technical Expertise</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Skills & 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Technologies
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience 
            and continuous learning in modern development practices.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Technologies", value: "20+", icon: Code2 },
            { label: "Years Experience", value: "5+", icon: Star },
            { label: "Projects Built", value: "50+", icon: Layers },
            { label: "Certifications", value: "8+", icon: Badge },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-background/50 border border-border/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <motion.div
                className="text-2xl font-bold text-foreground"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};