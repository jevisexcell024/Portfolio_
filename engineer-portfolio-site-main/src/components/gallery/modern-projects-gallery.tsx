"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  ExternalLink, 
  Github, 
  Play, 
  Code, 
  Smartphone, 
  Server, 
  Database,
  Globe,
  Zap,
  Eye,
  Star,
  GitBranch,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  category: string;
  technologies: string[];
  status: 'Live' | 'In Development' | 'Archived';
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  completion: number;
  stats: {
    stars: number;
    forks: number;
    commits: number;
    contributors: number;
  };
  metrics: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  screenshots: string[];
  demoVideo?: string;
  timeline: string;
}

const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with microservices architecture',
    longDescription: 'A comprehensive e-commerce platform built with modern microservices architecture. Features include user authentication, product catalog, shopping cart, payment processing, order management, and admin dashboard. Built with scalability and performance in mind.',
    image: '/api/placeholder/400/300',
    category: 'Full-stack',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    status: 'Live',
    githubUrl: 'https://github.com/user/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.com',
    featured: true,
    completion: 100,
    stats: { stars: 234, forks: 67, commits: 456, contributors: 8 },
    metrics: { performance: 92, accessibility: 89, bestPractices: 95, seo: 88 },
    screenshots: ['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
    timeline: '6 months'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates',
    longDescription: 'A modern task management application with real-time collaboration features. Includes drag-and-drop kanban boards, team workspaces, time tracking, and analytics dashboard.',
    image: '/api/placeholder/400/200',
    category: 'Frontend',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'Socket.io'],
    status: 'Live',
    githubUrl: 'https://github.com/user/task-manager',
    liveUrl: 'https://taskapp-demo.com',
    featured: false,
    completion: 100,
    stats: { stars: 156, forks: 34, commits: 289, contributors: 3 },
    metrics: { performance: 94, accessibility: 92, bestPractices: 90, seo: 85 },
    screenshots: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    timeline: '3 months'
  },
  {
    id: '3',
    title: 'Real-time Chat Application',
    description: 'Scalable chat platform with advanced messaging features',
    longDescription: 'A feature-rich real-time chat application supporting group chats, file sharing, voice messages, and video calls. Built with WebRTC for peer-to-peer communication.',
    image: '/api/placeholder/400/350',
    category: 'Full-stack',
    technologies: ['React', 'Express.js', 'MongoDB', 'Socket.io', 'WebRTC'],
    status: 'In Development',
    githubUrl: 'https://github.com/user/chat-app',
    featured: true,
    completion: 75,
    stats: { stars: 89, forks: 23, commits: 167, contributors: 2 },
    metrics: { performance: 88, accessibility: 85, bestPractices: 92, seo: 78 },
    screenshots: ['/api/placeholder/800/600'],
    timeline: '4 months'
  },
  {
    id: '4',
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform fitness tracking with health analytics',
    longDescription: 'A comprehensive fitness tracking mobile application with workout planning, progress tracking, social features, and health analytics.',
    image: '/api/placeholder/300/400',
    category: 'Mobile',
    technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit', 'Google Fit'],
    status: 'Live',
    githubUrl: 'https://github.com/user/fitness-tracker',
    featured: false,
    completion: 100,
    stats: { stars: 78, forks: 19, commits: 234, contributors: 1 },
    metrics: { performance: 91, accessibility: 87, bestPractices: 89, seo: 82 },
    screenshots: ['/api/placeholder/400/800', '/api/placeholder/400/800'],
    timeline: '5 months'
  },
  {
    id: '5',
    title: 'API Gateway Service',
    description: 'High-performance API gateway with advanced routing',
    longDescription: 'A robust API gateway service handling authentication, rate limiting, load balancing, and request routing for microservices architecture.',
    image: '/api/placeholder/400/250',
    category: 'Backend',
    technologies: ['Go', 'Redis', 'Consul', 'Prometheus', 'Grafana'],
    status: 'Live',
    githubUrl: 'https://github.com/user/api-gateway',
    featured: false,
    completion: 100,
    stats: { stars: 145, forks: 28, commits: 178, contributors: 4 },
    metrics: { performance: 96, accessibility: 90, bestPractices: 94, seo: 88 },
    screenshots: ['/api/placeholder/800/600'],
    timeline: '2 months'
  },
  {
    id: '6',
    title: 'DevOps Dashboard',
    description: 'Comprehensive monitoring and deployment dashboard',
    longDescription: 'A unified DevOps dashboard for monitoring applications, managing deployments, and tracking system metrics across multiple environments.',
    image: '/api/placeholder/400/280',
    category: 'Full-stack',
    technologies: ['React', 'Python', 'Django', 'Docker', 'AWS', 'Terraform'],
    status: 'In Development',
    githubUrl: 'https://github.com/user/devops-dashboard',
    featured: true,
    completion: 60,
    stats: { stars: 67, forks: 15, commits: 123, contributors: 3 },
    metrics: { performance: 85, accessibility: 88, bestPractices: 91, seo: 79 },
    screenshots: ['/api/placeholder/800/600', '/api/placeholder/800/600'],
    timeline: '8 months'
  }
];

const categories = ['All', 'Full-stack', 'Frontend', 'Backend', 'Mobile'];

const statusColors = {
  'Live': 'bg-green-500/20 text-green-400 border-green-500/30',
  'In Development': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Archived': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
};

const categoryIcons = {
  'Full-stack': Globe,
  'Frontend': Code,
  'Backend': Server,
  'Mobile': Smartphone,
  'Database': Database
};

export const ProjectsGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleImageLoad = (projectId: string) => {
    setImagesLoaded(prev => new Set(prev).add(projectId));
  };

  const getGridItemHeight = (index: number, featured: boolean) => {
    if (featured) return 'row-span-2';
    const heights = ['row-span-1', 'row-span-1', 'row-span-1'];
    return heights[index % heights.length];
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Featured Projects
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my latest work in software engineering, from full-stack applications to mobile solutions
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search projects or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card/50 backdrop-blur-sm border-border/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[200px]"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const IconComponent = categoryIcons[project.category as keyof typeof categoryIcons] || Code;
              const gridSpan = project.featured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1';
              const heightSpan = getGridItemHeight(index, project.featured);
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 10 }}
                  whileHover={{ 
                    scale: 1.02, 
                    rotateX: 2,
                    rotateY: 2,
                    transition: { duration: 0.2 }
                  }}
                  className={`${gridSpan} ${heightSpan} group cursor-pointer`}
                  style={{ perspective: '1000px' }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <Card className="h-full bg-card/50 backdrop-blur-xl border-border/50 overflow-hidden relative group-hover:border-primary/50 transition-all duration-300">
                    <div className="relative h-full">
                      {/* Background Image with Parallax */}
                      <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                          className="w-full h-full"
                          animate={{
                            scale: hoveredProject === project.id ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          <div 
                            className={`w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 transition-opacity duration-500 ${
                              imagesLoaded.has(project.id) ? 'opacity-0' : 'opacity-100'
                            }`}
                          />
                          <img
                            src={project.image}
                            alt={project.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                              imagesLoaded.has(project.id) ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => handleImageLoad(project.id)}
                          />
                        </motion.div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className={`${statusColors[project.status]} backdrop-blur-sm`}>
                            {project.status}
                          </Badge>
                        </div>
                        
                        {/* Featured Badge */}
                        {project.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <CardContent className="absolute inset-0 p-6 flex flex-col justify-end">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          {/* Category Icon */}
                          <div className="mb-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
                              <IconComponent className="w-4 h-4 text-primary" />
                              <span className="text-xs text-muted-foreground">{project.category}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-semibold mb-2 text-foreground">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.technologies.slice(0, 3).map((tech, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>

                          {/* Progress Bar for In Development */}
                          {project.status === 'In Development' && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span>{project.completion}%</span>
                              </div>
                              <Progress value={project.completion} className="h-1" />
                            </div>
                          )}

                          {/* Stats */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {project.stats.stars}
                            </div>
                            <div className="flex items-center gap-1">
                              <GitBranch className="w-3 h-3" />
                              {project.stats.forks}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {project.timeline}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <motion.div 
                            className="flex gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                              opacity: hoveredProject === project.id ? 1 : 0.7,
                              y: hoveredProject === project.id ? 0 : 10 
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  className="flex-1"
                                  onClick={() => setSelectedProject(project)}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                            </Dialog>
                            
                            <Button size="sm" variant="outline" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                              </a>
                            </Button>
                            
                            {project.liveUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                            )}
                          </motion.div>
                        </motion.div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] bg-card/95 backdrop-blur-xl border-border/50">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>
                
                <ScrollArea className="max-h-[70vh]">
                  <div className="space-y-6">
                    {/* Project Image */}
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                    </div>

                    {/* Project Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-muted-foreground mb-4">
                          {selectedProject.longDescription}
                        </p>

                        <h4 className="font-semibold mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedProject.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <Button asChild>
                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                          {selectedProject.liveUrl && (
                            <Button variant="outline" asChild>
                              <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Project Stats</h4>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-background/50 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Star className="w-4 h-4" />
                              Stars
                            </div>
                            <div className="text-xl font-bold">{selectedProject.stats.stars}</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <GitBranch className="w-4 h-4" />
                              Forks
                            </div>
                            <div className="text-xl font-bold">{selectedProject.stats.forks}</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="w-4 h-4" />
                              Contributors
                            </div>
                            <div className="text-xl font-bold">{selectedProject.stats.contributors}</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <TrendingUp className="w-4 h-4" />
                              Commits
                            </div>
                            <div className="text-xl font-bold">{selectedProject.stats.commits}</div>
                          </div>
                        </div>

                        <h4 className="font-semibold mb-2">Performance Metrics</h4>
                        <div className="space-y-3">
                          {Object.entries(selectedProject.metrics).map(([key, value]) => (
                            <div key={key}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span>{value}%</span>
                              </div>
                              <Progress value={value} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};