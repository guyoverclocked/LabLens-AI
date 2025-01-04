export default function AboutSection() {
    return (
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">About LabLens</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                LabLens is revolutionizing healthcare accessibility by making complex medical data understandable for everyone. Our platform uses advanced AI to translate technical jargon into clear, actionable insights, empowering you to make informed decisions about your health.
              </p>
              <p className="text-lg mb-6 text-gray-700 leading-relaxed">
                Whether it's a blood test, cholesterol analysis, or any other diagnostic report, LabLens provides personalized explanations tailored to your age, gender, and health condition. We support multiple languages to ensure that language is never a barrier to understanding your health.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Join us in our mission to bridge the gap between complex medical information and everyday understanding. With LabLens, take control of your health journey with confidence and clarity.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  