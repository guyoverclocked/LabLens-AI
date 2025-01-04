import { Search, BarChart2, Globe, Lock } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      title: "Simplified Medical Terminology",
      description: "We break down complex terms into easy-to-understand language.",
      icon: Search
    },
    {
      title: "Personalized Recommendations",
      description: "Get actionable steps tailored to your health condition.",
      icon: BarChart2
    },
    {
      title: "Multi-Language Support",
      description: "Understand your reports in your preferred language.",
      icon: Globe
    },
    {
      title: "Secure and Private",
      description: "Your health data is protected with industry-leading security.",
      icon: Lock
    }
  ]

  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="mb-6 text-blue-600">
                <feature.icon size={36} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

