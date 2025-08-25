"use client";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProjectData {
  title: string;
  description: string;
  techStack: string[];
  background: string;
  liveDemo: string;
  github: string;
  category: string;
}

// Software projects showcase
const PROJECTS: Array<ProjectData> = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with user authentication, payment processing, and admin dashboard. Features include product catalog, shopping cart, order management, and real-time inventory tracking.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
    background: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop",
    liveDemo: "https://ecommerce-demo.dev",
    github: "https://github.com/username/ecommerce-platform",
    category: "Full-Stack"
  },
  {
    title: "Task Management Tool",
    description: "Collaborative project management application with real-time updates, team collaboration features, and advanced task tracking. Includes Kanban boards, time tracking, and progress analytics.",
    techStack: ["Vue.js", "Firebase", "TypeScript", "Tailwind CSS"],
    background: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1000&auto=format&fit=crop",
    liveDemo: "https://taskflow-app.dev",
    github: "https://github.com/username/task-manager",
    category: "Frontend"
  },
  {
    title: "Weather Dashboard",
    description: "Interactive weather application with location-based forecasts, historical data visualization, and severe weather alerts. Features include 7-day forecasts, weather maps, and personalized notifications.",
    techStack: ["React", "D3.js", "OpenWeather API", "Chart.js"],
    background: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=1000&auto=format&fit=crop",
    liveDemo: "https://weather-insights.dev",
    github: "https://github.com/username/weather-dashboard",
    category: "Frontend"
  },
  {
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website built with Next.js and featuring smooth animations, optimized performance, and SEO-friendly architecture. Includes blog functionality and contact forms.",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    background: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1000&auto=format&fit=crop",
    liveDemo: "https://portfolio-showcase.dev",
    github: "https://github.com/username/portfolio-site",
    category: "Frontend"
  },
  {
    title: "RESTful API Service",
    description: "Scalable REST API with comprehensive authentication, rate limiting, and documentation. Features include JWT authentication, data validation, error handling, and automated testing suite.",
    techStack: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker"],
    background: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
    liveDemo: "https://api-docs.dev",
    github: "https://github.com/username/api-service",
    category: "Backend"
  },
  {
    title: "Mobile Fitness App",
    description: "Cross-platform mobile application for fitness tracking with workout plans, progress monitoring, and social features. Includes offline functionality and wearable device integration.",
    techStack: ["React Native", "Redux", "AsyncStorage", "Expo"],
    background: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
    liveDemo: "https://fitness-app.dev",
    github: "https://github.com/username/fitness-mobile",
    category: "Mobile"
  },
];

const ProjectCard = ({ title, description, techStack, background, liveDemo, github, category }: ProjectData) => {
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="group relative min-h-auto w-full overflow-hidden rounded-lg bg-surface bg-cover bg-center bg-no-repeat transition-all duration-300 sm:aspect-square md:aspect-auto md:min-h-[30rem] md:max-w-[30rem]"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 transition-all duration-300 group-hover:bg-black/40" />
      
      {/* Content - Always visible */}
      <div className="relative z-20 flex size-full flex-col justify-between p-6">
        {/* Category badge */}
        <div className="flex justify-start">
          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Bottom content */}
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">
              {title}
            </h3>
            
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Hover details */}
          <div className="transform transition-all duration-300 group-hover:translate-y-0 translate-y-4 opacity-0 group-hover:opacity-100">
            <p className="mb-4 text-sm leading-relaxed text-white/80">
              {description}
            </p>
            
            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                asChild
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <a href={liveDemo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4 mr-2" />
                  Live Demo
                </a>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <Github className="size-4 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GridOverlayGallery = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest software development projects, featuring full-stack applications, 
            mobile apps, and API services built with modern technologies.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={`project-${i}`} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { GridOverlayGallery };