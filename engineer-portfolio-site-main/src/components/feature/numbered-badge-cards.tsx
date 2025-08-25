"use client"

import { Code, Database, Cloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface SkillItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  technologies: string[];
  image: string;
}

const SKILLS: SkillItem[] = [
  {
    id: 1,
    icon: <Code className="h-5 w-5" />,
    title: "Frontend Development",
    description:
      "Creating responsive, interactive web applications with modern frameworks and cutting-edge technologies.",
    technologies: ["React", "TypeScript", "Next.js"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    icon: <Database className="h-5 w-5" />,
    title: "Backend Development",
    description:
      "Building robust server-side applications, APIs, and database systems that scale with business needs.",
    technologies: ["Node.js", "Python", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    icon: <Cloud className="h-5 w-5" />,
    title: "DevOps & Tools",
    description:
      "Streamlining development workflows with containerization, cloud infrastructure, and version control systems.",
    technologies: ["Docker", "AWS", "Git"],
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const NumberedBadgeCards = () => {
  return (
    <section className="bg-accent py-32">
      <div className="container">
        <div className="flex flex-col items-center pb-4 text-center">
          <div>
            <span className="my-3 mb-4 flex items-center justify-center">
              <Badge variant="outline" className="bg-background px-3 py-1">
                <Code className="mr-2 h-4 w-4" />
                <p className="text-xs text-white">Skills</p>
              </Badge>
            </span>
          </div>
          <h1 className="pb-3 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            Technical Skills
          </h1>
          <p className="text-muted-foreground max-w-md text-sm lg:max-w-2xl lg:text-lg">
            Expertise across the full development stack, from frontend interfaces to backend systems and deployment infrastructure.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 md:px-8 lg:grid-cols-3 lg:px-12">
          {SKILLS.map((skill) => (
            <div
              key={skill.id}
              className="bg-background grid grid-cols-1 rounded-2xl border shadow-sm"
            >
              <div className="p-6">
                <div className="bg-primary text-primary-foreground inline-flex h-8 w-8 items-center justify-center rounded-full">
                  {skill.icon}
                </div>
                <p className="text-md my-4 font-semibold">{skill.title}</p>
                <p className="text-muted-foreground mb-4">{skill.description}</p>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex min-h-[200px] justify-center rounded-b-2xl">
                <div className="h-[200px] w-full">
                  <img
                    src={skill.image}
                    alt={`${skill.title} illustration`}
                    className="h-full w-full rounded-b-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { NumberedBadgeCards };