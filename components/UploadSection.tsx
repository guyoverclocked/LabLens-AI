'use client'

import { useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'

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

interface UploadSectionProps {
  setResult: (result: ProcessedResult) => void
}

export default function UploadSection({ setResult }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null)
  const [reportType, setReportType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !reportType) return

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('reportType', reportType)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      
      if (data.isInvalidReport) {
        setError(data.error)
        // Handle invalid report UI
        return
      }
      
      // Handle valid report
      setResult(data.result)
      // Reset form after successful submission
      setFile(null)
      setReportType('')
      // Reset the file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (error) {
      console.error('Error:', error)
      setError('An error occurred while uploading the file. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="upload" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Upload Your Medical Report</h2>
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}
            <div className="mb-6">
              <label htmlFor="report-type" className="block mb-2 text-sm font-medium text-gray-700">
                Report Type
              </label>
              <select
                id="report-type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <option value="">Select report type</option>
                <option value="cholesterol">Cholesterol</option>
                <option value="diabetes">Diabetes</option>
                <option value="thyroid">Thyroid</option>
                <option value="cbc">Complete Blood Count (CBC)</option>
                <option value="liver">Liver Function</option>
                <option value="kidney">Kidney Function</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="file-input" className="block mb-2 text-sm font-medium text-gray-700">
                Upload Report (PDF)
              </label>
              <input
                type="file"
                id="file-input"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".pdf"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700
                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold flex items-center justify-center gap-2 text-lg disabled:bg-blue-400"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Analyzing Report...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Analyze Report
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

