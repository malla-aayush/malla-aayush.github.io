import { Edit, Monitor, Layers, BarChart, Brain, Users, MapPin, Activity, Heart, Wheat } from "lucide-react"

export function AboutSection() {
  const services = [
    {
      icon: Monitor,
      title: "Data Engineering",
      description:
        "Building scalable ETL pipelines and data solutions using Azure, PySpark, and modern data technologies for enterprise-level data processing.",
    },
    {
      icon: Edit,
      title: "Machine Learning",
      description:
        "Developing ML models and AI solutions for real-world applications, including computer vision and predictive analytics systems.",
    },
    {
      icon: Layers,
      title: "Cloud Architecture",
      description:
        "Designing and implementing cloud-based data architectures on Azure platform with focus on scalability and performance optimization.",
    },
    {
      icon: BarChart,
      title: "Analytics & BI",
      description:
        "Creating comprehensive analytics solutions and business intelligence dashboards for data-driven decision making.",
    },
  ]

  const researchInterests = [
    {
      icon: Brain,
      title: "AI / Machine Learning",
      description: "Methods, applications, and foundations across modern AI and ML.",
    },
    {
      icon: Users,
      title: "Human-Centered AI & Interaction",
      description: "People-first AI systems: usability, transparency, feedback, and collaboration.",
    },
    {
      icon: Activity,
      title: "Behavioral Analytics",
      description: "Data-driven insights into behavior and interaction patterns.",
    },
    {
      icon: MapPin,
      title: "Geospatial Intelligence",
      description: "Spatial analysis and location-aware modeling for decision support.",
    },
    {
      icon: Brain,
      title: "Trustworthy & Safe AI",
      description: "Reliability, robustness, fairness, and accountability in AI.",
    },
    {
      icon: Heart,
      title: "Health Informatics",
      description: "Data-driven methods for healthcare insights, decision support, and outcomes.",
    },
  ]

  return (
    <div data-section="about" className="flex-1 relative bg-gray-800 text-white overflow-y-auto">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4 font-poppins">
            About <span className="text-cyan-400">Me</span>
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Description */}
          <div className="lg:col-span-2">
            <p className="text-gray-300 leading-relaxed mb-8">
              I'm a passionate Data Engineer with 5 years of experience building scalable ETL pipelines and data
              solutions. I specialize in Azure cloud technologies, PySpark, and machine learning applications with a
              focus on applying AI to study human decision making and create data-driven systems for real-world impact.
            </p>
          </div>

          {/* Personal Info */}
          <div className="space-y-6">
            <div className="grid grid-cols-[120px_1fr] items-center">
              <span className="text-cyan-400">Age</span>
              <span className="text-gray-300">26</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center">
              <span className="text-cyan-400">Residence</span>
              <span className="text-gray-300">Nepal</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center">
              <span className="text-cyan-400">Address</span>
              <span className="text-gray-300">Kathmandu, Nepal</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center">
              <span className="text-cyan-400">e-mail</span>
              <span className="text-gray-300">mallaaayush59@gmail.com</span>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center">
              <span className="text-cyan-400">Phone</span>
              <span className="text-gray-300">+977 9851203045</span>
            </div>
          </div>
        </div>

        {/* What I Do Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 font-poppins">
            What I <span className="text-cyan-400">Do</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex gap-4 bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-shrink-0">
                  <service.icon className="text-cyan-400" size={32} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-3 font-poppins">{service.title}</h4>
                  <p className="text-gray-300 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold mb-8 font-poppins">
            Research <span className="text-cyan-400">Interests</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchInterests.map((interest, index) => (
              <div
                key={index}
                className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <interest.icon className="text-cyan-400" size={28} />
                  <h4 className="text-lg font-semibold font-poppins">{interest.title}</h4>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
