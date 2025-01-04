export default function HeroSection() {
    return (
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            LabLens: Simplifying Medical Reports for Everyone
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100">
            Understand your health with clarity and confidence
          </p>
          <a 
            href="#upload" 
            className="bg-white text-blue-600 py-4 px-8 rounded-full font-semibold text-lg hover:bg-blue-50 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </a>
        </div>
      </section>
    )
  }
  
  