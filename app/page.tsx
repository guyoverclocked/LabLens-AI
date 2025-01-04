'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import UploadSection from '../components/UploadSection'
import ResultSection from '../components/ResultSection'
import FeaturesSection from '../components/FeaturesSection'
import AboutSection from '../components/AboutSection'

// Define the types to match ResultSection
interface Measurement {
  name: string;
  value: string;
  meaning: string;
  normalRange: string;
  status: 'Good' | 'Okay' | 'Needs Attention';
  tips?: string[];
}

interface ProcessedResult {
  measurements: Measurement[];
  summary: string;
  lifestyleTips: string[];
}

export default function HomePage() {
  const [result, setResult] = useState<ProcessedResult | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <UploadSection setResult={setResult} />
        {result && <ResultSection result={result} />}
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}

