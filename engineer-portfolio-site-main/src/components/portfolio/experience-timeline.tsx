"use client"

import { useState } from 'react'
import { motion } from 'motion/react'
import { Building2, MapPin, Calendar, ChevronRight } from 'lucide-react'

interface Experience {
  id: string
  company: string
  position: string
  location: string
  period: string
  current: boolean
  description: string
  achievements: string[]
  companyLogo?: string
}

const experiences: Experience[] = [
  {
    id: '1',
    company: 'TechCorp',
    position: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    period: '2022 - Present',
    current: true,
    description: 'Lead full-stack development initiatives and mentor junior developers in a fast-paced startup environment.',
    achievements: [
      'Architected and delivered a microservices platform that reduced deployment time by 70%',
      'Led a team of 5 engineers to rebuild the core product, resulting in 40% performance improvement',
      'Implemented CI/CD pipelines and automated testing, reducing bugs in production by 60%',
      'Mentored 8 junior developers and established coding standards across the engineering team'
    ]
  },
  {
    id: '2',
    company: 'InnovateLabs',
    position: 'Full Stack Developer',
    location: 'Austin, TX',
    period: '2020 - 2022',
    current: false,
    description: 'Developed scalable web applications and APIs serving millions of users with a focus on performance optimization.',
    achievements: [
      'Built and maintained React applications with TypeScript, serving 2M+ monthly active users',
      'Optimized database queries and API endpoints, improving response times by 45%',
      'Collaborated with product and design teams to deliver 15+ major features on schedule',
      'Introduced automated testing practices that increased code coverage from 30% to 85%'
    ]
  },
  {
    id: '3',
    company: 'StartupVenture',
    position: 'Frontend Developer',
    location: 'Remote',
    period: '2019 - 2020',
    current: false,
    description: 'Specialized in creating responsive, accessible user interfaces and implementing modern frontend architectures.',
    achievements: [
      'Developed responsive web applications using React, Redux, and modern CSS frameworks',
      'Improved website accessibility compliance to WCAG 2.1 AA standards across all products',
      'Reduced bundle size by 35% through code splitting and performance optimization techniques',
      'Collaborated with UX designers to implement pixel-perfect, interactive user interfaces'
    ]
  },
  {
    id: '4',
    company: 'DevAgency',
    position: 'Junior Software Developer',
    location: 'New York, NY',
    period: '2018 - 2019',
    current: false,
    description: 'Started career building web applications and learning modern development practices in an agency environment.',
    achievements: [
      'Contributed to 12+ client projects using JavaScript, PHP, and various CMS platforms',
      'Learned and implemented responsive design principles and cross-browser compatibility',
      'Participated in code reviews and adopted industry best practices for version control',
      'Delivered projects on time while maintaining high code quality standards'
    ]
  }
]

export default function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="bg-surface">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display text-text-primary mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A journey through my career building scalable applications and leading technical initiatives
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-primary border-4 border-surface z-10"></div>
                  
                  <div className="ml-20">
                    <div 
                      className={`bg-card border border-border rounded-lg p-6 cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 ${
                        expandedId === experience.id ? 'border-primary/50' : ''
                      }`}
                      onClick={() => toggleExpanded(experience.id)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-text-secondary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold font-display text-text-primary">
                                {experience.position}
                              </h3>
                              <p className="text-primary font-medium">
                                {experience.company}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{experience.period}</span>
                              {experience.current && (
                                <span className="ml-2 px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{experience.location}</span>
                            </div>
                          </div>
                          
                          <p className="text-text-secondary mb-4">
                            {experience.description}
                          </p>
                        </div>
                        
                        <motion.div
                          animate={{ rotate: expandedId === experience.id ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-5 h-5 text-text-secondary" />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedId === experience.id ? 'auto' : 0,
                          opacity: expandedId === experience.id ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-border">
                          <h4 className="text-sm font-medium text-text-primary mb-3">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, achievementIndex) => (
                              <motion.li
                                key={achievementIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ 
                                  opacity: expandedId === experience.id ? 1 : 0,
                                  x: expandedId === experience.id ? 0 : -10
                                }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: expandedId === experience.id ? achievementIndex * 0.1 : 0 
                                }}
                                className="flex items-start gap-3 text-sm text-text-secondary"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}