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
  
  interface ResultSectionProps {
    result: ProcessedResult;
  }
  
  export default function ResultSection({ result }: ResultSectionProps) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Your Simplified Report</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100">
            {/* Measurements */}
            <div className="space-y-6">
              {result.measurements.map((measurement, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-lg ${
                    measurement.status === 'Good' ? 'bg-green-50 border border-green-100' :
                    measurement.status === 'Okay' ? 'bg-yellow-50 border border-yellow-100' :
                    'bg-red-50 border border-red-100'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {measurement.name}
                    </h3>
                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                      measurement.status === 'Good' ? 'bg-green-100 text-green-800' :
                      measurement.status === 'Okay' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {measurement.status}
                    </span>
                  </div>
                  
                  <p className="text-3xl font-bold text-gray-900 mb-4">
                    {measurement.value}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-medium">What it means:</span> {measurement.meaning}
                      </p>
                    </div>
                    
                    <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        <span className="font-medium">Normal Range:</span> {measurement.normalRange}
                      </p>
                    </div>
                    
                    {measurement.tips && measurement.tips.length > 0 && (
                      <div className="bg-white bg-opacity-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-900 mb-2">
                          {measurement.status === 'Good' ? 'Tips to maintain:' : 'Tips to improve:'}
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                          {measurement.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-gray-700">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
  
            {/* Summary */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Summary</h3>
              <p className="text-gray-700 leading-relaxed">{result.summary}</p>
            </div>
  
            {/* Lifestyle Tips */}
            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-100">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Lifestyle Tips</h3>
              <ul className="space-y-3">
                {result.lifestyleTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2"></span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Disclaimer */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-lg font-bold mb-3 text-gray-900">Important Note</h4>
              <p className="text-gray-600 leading-relaxed">
                This AI-generated analysis is for reference purposes only and may not be 100% accurate. 
                Always consult with your healthcare provider to interpret your test results and for 
                personalized medical advice. Your doctor can consider your overall health, family history, 
                and other factors to provide the most appropriate recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  