"use client"

import { useState } from "react"
import { ExternalLink, Brain, BarChart3, MapPin, GraduationCap, ChevronDown, ChevronUp, Eye, Camera } from "lucide-react"

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [showAll, setShowAll] = useState(false)

  const filters = ["All", "Machine Learning", "Computer Vision", "Web Development", "Data Engineering", "Mobile Apps"]

  const projects = [
    {
      id: 1,
      title: "ML Tool Suite (MCP)",
      category: "Machine Learning",
      year: "2023",
      icon: Brain,
      gradient: "from-purple-500 to-pink-500",
      description:
        "Research-grade NLP toolkit featuring RAG-based Q&A, TextRank summarization, ML-powered sentiment analysis, and language translation. Deployed as both Streamlit app and MCP server.",
      technologies: ["Python", "NLP", "RAG", "MCP", "Streamlit"],
      features: [
        "Document Q&A with BM25 and MMR",
        "Graph-based text summarization",
        "Auto-learning sentiment analysis",
        "Offline/Online translation"
      ],
      githubUrl: "https://github.com/aayushmalla13/ML-Tool-Suite-MCP-/security",
    },
    {
      id: 2,
      title: "Nepali License Plate Recognition",
      category: "Computer Vision",
      year: "2020",
      icon: Eye,
      gradient: "from-sky-500 to-blue-600",
      description:
        "Machine learning system to detect and extract Nepali license plate numbers with 95% accuracy using SVM and OpenCV.",
      technologies: ["Python", "OpenCV", "SVM", "Image Processing"],
      features: [
        "Real-time plate detection",
        "Character segmentation",
        "95% recognition accuracy",
        "Support for multiple fonts"
      ],
      githubUrl: "https://github.com/aayushmalla13/Nepali-License-Plate-Recognition",
    },
    {
      id: 3,
      title: "Retail Data Analysis",
      category: "Data Engineering",
      year: "2022",
      icon: BarChart3,
      gradient: "from-blue-500 to-cyan-500",
      description:
        "Analyzed multi-million row retail datasets using Apache Spark to uncover seasonal trends and performance insights.",
      technologies: ["Apache Spark", "PySpark", "SQL", "DataFrames"],
      features: [
        "Multi-million row processing",
        "Seasonal trend analysis",
        "Performance optimization",
        "Interactive dashboards"
      ],
    },
    {
      id: 4,
      title: "Xplore Nepal",
      category: "Mobile Apps",
      year: "2019",
      icon: MapPin,
      gradient: "from-green-500 to-emerald-500",
      description:
        "Android tourism app for Nepal featuring local areas, restaurants, heritage sites, and guide booking functionality.",
      technologies: ["Java", "Android Studio", "Google Maps API"],
      features: [
        "Interactive maps integration",
        "Restaurant discovery",
        "Heritage site guides",
        "Local guide booking"
      ],
      githubUrl: "https://github.com/aayushmalla13/Xplore-Nepal",
    },
    {
      id: 5,
      title: "KU Digitized Wall",
      category: "Web Development",
      year: "2022",
      icon: GraduationCap,
      gradient: "from-orange-500 to-red-500",
      description:
        "Web application similar to Google Classroom for managing courses, assignments, and virtual classrooms.",
      technologies: ["JavaScript", "Node.js", "Express.js", "SQLite", "REST APIs"],
      features: [
        "Course management",
        "Assignment tracking",
        "Virtual classrooms",
        "Real-time notifications"
      ],
      githubUrl: "https://github.com/aayushmalla13/Digitized-Info-wall",
    },
  ]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6)
  const hasMoreProjects = filteredProjects.length > 4

  return (
    <div data-section="portfolio" className="flex-1 relative bg-gray-800 text-white overflow-y-auto">
      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2 font-poppins">
            Portfolio<span className="text-cyan-400">.</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mb-4"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-cyan-400 text-gray-900"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={`grid gap-4 ${
          displayedProjects.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' :
          displayedProjects.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
          displayedProjects.length === 3 ? 'md:grid-cols-3' :
          displayedProjects.length === 4 ? 'md:grid-cols-2 lg:grid-cols-2' :
          'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {displayedProjects.map((project) => {
            const IconComponent = project.icon
            return (
              <div
                key={project.id}
                className="group bg-gray-700 rounded-lg overflow-hidden hover:transform hover:scale-102 transition-all duration-300 animate-fade-in-up"
              >
                <div
                  className={`aspect-[16/10] bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20"></div>
                  <IconComponent className="w-12 h-12 text-white/90 z-10" />
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/5 rounded-full"></div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold font-poppins leading-tight">{project.title}</h3>
                    <span className="text-cyan-400 text-xs font-medium">{project.year}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed">{project.description}</p>
                  {project.features && (
                    <ul className="text-gray-300 text-sm mb-3 list-disc list-inside">
                      {project.features.map((feature, index) => (
                        <li key={index} className="text-xs leading-relaxed mb-1">{feature}</li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-600 text-gray-200 px-1.5 py-0.5 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View on GitHub
                      </a>
                    ) : (
                      <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                        <ExternalLink className="w-4 h-4" />
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {hasMoreProjects && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-8 py-3 border border-gray-600 hover:border-cyan-400 rounded-lg transition-colors duration-300"
            >
              <div className="flex items-center gap-3 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                <span className="text-sm font-medium tracking-wide">
                  {showAll ? 'Show Less' : 'View More Projects'}
                </span>
                {showAll ? (
                  <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                )}
              </div>
              <div className="absolute inset-0 -z-10 bg-gray-700/50 rounded-lg transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></div>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
