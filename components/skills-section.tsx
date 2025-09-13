export function SkillsSection() {
  const skills = {
    title: "Skills",
    languages: [
      { name: "Python", experience: "(4+ years)" },
      { name: "SQL", experience: "(5+ years)" },
      { name: "JavaScript", experience: "" },
      { name: "Node.js", experience: "" },
      { name: "PostgreSQL", experience: "" },
      { name: "MySQL/MSSQL", experience: "" },
    ],
    frameworks: [
      { name: "PySpark", experience: "" },
      { name: "Flask", experience: "" },
      { name: "Pandas", experience: "" },
      { name: "NumPy", experience: "" },
      { name: "Matplotlib", experience: "" },
      { name: "Scikit-learn", experience: "" },
      { name: "OpenCV", experience: "" },
      { name: "TensorFlow", experience: "" },
      { name: "PowerBI/Tableau", experience: "" },
    ],
    cloud: {
      title: "Cloud Tech",
      technologies: [
        { name: "AWS (S3, Glue, Athena)", experience: "" },
        { name: "Azure (ADF, ADLS, Synapse)", experience: "" },
        { name: "GCP (BigQuery, Cloud Storage)", experience: "" },
        { name: "Apache Airflow", experience: "" },
        { name: "Databricks", experience: "" },
        { name: "Delta Live Tables", experience: "" },
      ]
    },
    knowledge: {
      title: "Knowledge",
      areas: ["Machine Learning", "Deep Learning", "Generative AI", "DevOps"]
    }
  }

  return (
    <div className="flex-1 relative bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold mb-2 font-poppins">
          {skills.title}<span className="text-cyan-400">.</span>
        </h2>
        <div className="w-16 h-1 bg-cyan-400 mb-12"></div>

        {/* Languages and Frameworks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {skills.languages.map((skill, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-4 flex items-center space-x-2">
              <span className="text-sm">{skill.name}</span>
              {skill.experience && (
                <span className="text-xs text-cyan-400">{skill.experience}</span>
              )}
            </div>
          ))}
          {skills.frameworks.map((skill, index) => (
            <div key={`framework-${index}`} className="bg-gray-800 rounded-lg p-4 flex items-center space-x-2">
              <span className="text-sm">{skill.name}</span>
              {skill.experience && (
                <span className="text-xs text-cyan-400">{skill.experience}</span>
              )}
            </div>
          ))}
        </div>

        {/* Cloud Tech Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6">
            Cloud <span className="text-cyan-400">Tech</span>
          </h3>
          <div className="space-y-3">
            {skills.cloud.technologies.map((tech, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4">
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6">
            Knowledge<span className="text-cyan-400">.</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {skills.knowledge.areas.map((area, index) => (
              <span key={index} className="bg-gray-800 px-4 py-2 rounded-lg text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
