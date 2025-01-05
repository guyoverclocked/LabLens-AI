import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, GenerateContentResult } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

function generatePrompt(reportType: string): string {
  const basePrompt = `You are a medical report analyzer. First, verify if the provided image is a valid medical report. 

If it's NOT a valid medical report, respond exactly with:
---
INVALID_REPORT: This does not appear to be a valid medical report. Please upload a clear image of a medical laboratory report.
---

If it IS a valid medical report, analyze it and provide a detailed yet simple explanation in this format:

You are a friendly medical report analyzer. Analyze this ${reportType} report and provide a detailed yet simple explanation that anyone can understand. Also note that the important reminder is already mentioned in the website so please do not generate any precautionary reminders. For each measurement:

1. Show the value with its unit
2. Explain what it means in very simple, friendly terms (like explaining to a friend)
3. Show the normal range and what it means
4. Indicate if the value is "Good", "Okay", or "Needs Attention"
5. For ALL measurements (regardless of status), provide 2-3 practical tips to maintain or improve the value. Use everyday language.

After analyzing each measurement, provide:
1. A clear summary (3-4 sentences) explaining the overall health picture in simple terms
2. 3-4 practical lifestyle tips that are specific to these results
3. A reminder about consulting healthcare providers

Format each measurement exactly like this:
---
[Measurement Name]: [Value] [Unit]
What it means: [Simple, friendly explanation in 2-3 sentences]
Normal Range: [Range with explanation]
Status: [Good/Okay/Needs Attention]
Tips to maintain/improve:
- [Practical tip 1]
- [Practical tip 2]
- [Practical tip 3]
---

End with:
---
Summary:
[3-4 sentences about overall health picture]

Lifestyle Tips:
- [Specific tip 1]
- [Specific tip 2]
- [Specific tip 3]
- [Specific tip 4]
---
Also you don't have to say anything like: "Ensure the formatting is exactly as requested.Here's a friendly look at your report"
Just print the report in the format requested.
Also don't say anything like "Here's a plan"`;

  switch (reportType) {
    case 'cholesterol':
      return `${basePrompt}
      Focus on explaining:
      - Total Cholesterol: Explain it's like a overall score for blood fats
      - HDL: Describe it as the "healthy" cholesterol that helps keep arteries clean
      - LDL: Describe it as the "lazy" cholesterol that can build up in arteries
      - Triglycerides: Explain these are fats from food that can affect heart health
      
      For each measurement, include specific food examples and simple lifestyle changes that can help.`;
    case 'diabetes':
      return `${basePrompt}
      Focus on:
      - Fasting Glucose (blood sugar after fasting)
      - HbA1c (average blood sugar over 2-3 months)
      - Other relevant metrics`;
    case 'thyroid':
      return `${basePrompt}
      Focus on:
      - TSH (thyroid-stimulating hormone)
      - T3 (triiodothyronine)
      - T4 (thyroxine)`;
    case 'cbc':
      return `${basePrompt}
      Focus on:
      - RBC (red blood cells)
      - WBC (white blood cells)
      - Hemoglobin
      - Hematocrit
      - Platelets`;
    case 'liver':
      return `${basePrompt}
      Focus on:
      - ALT (alanine aminotransferase)
      - AST (aspartate aminotransferase)
      - ALP (alkaline phosphatase)
      - Bilirubin`;
    case 'kidney':
      return `${basePrompt}
      Focus on:
      - Creatinine
      - GFR (glomerular filtration rate)
      - BUN (blood urea nitrogen)`;
    default:
      return basePrompt;
  }
}

interface Measurement {
  name: string;
  value: string;
  meaning?: string;
  normalRange?: string;
  status: 'Good' | 'Okay' | 'Needs Attention';
  tips?: string[];
}

interface ProcessedResult {
  measurements: Measurement[];
  summary?: string;
  lifestyleTips: string[];
}

function processGeminiOutput(output: string): ProcessedResult | { error: string } {
  // Check for invalid report first
  if (output.includes('INVALID_REPORT:')) {
    // Clean up the error message by removing markdown symbols and dashes
    const errorMessage = output
      .split('INVALID_REPORT:')[1]
      .replace(/[`-]/g, '')  // Remove backticks and dashes
      .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
      .trim();
    
    return {
      error: errorMessage
    };
  }

  const sections = output.split('---').filter(s => s.trim());
  const measurements: Measurement[] = [];
  let summary = '';
  let lifestyleTips: string[] = [];

  for (const section of sections) {
    const lines = section.trim().split('\n');
    
    if (section.toLowerCase().includes('summary:')) {
      summary = lines.slice(1).filter(line => line.trim()).join(' ').trim();
    } else if (section.toLowerCase().includes('lifestyle tips:')) {
      lifestyleTips = lines
        .slice(1)
        .filter(line => line.trim())
        .map(line => line.replace(/^-\s*/, '').trim());
    } else {
      const measurement: Partial<Measurement> = {
        tips: []
      };
      
      let collectingTips = false;
      
      for (const line of lines) {
        if (line.trim() === '') continue;
        
        if (line.toLowerCase().includes('tips to maintain/improve:')) {
          collectingTips = true;
          continue;
        }
        
        if (collectingTips) {
          if (line.startsWith('-')) {
            measurement.tips?.push(line.replace(/^-\s*/, '').trim());
          }
          continue;
        }
        
        if (line.includes(':')) {
          const [key, value] = line.split(':').map(s => s.trim());
          
          if (key.toLowerCase().includes('what it means')) {
            measurement.meaning = value;
          } else if (key.toLowerCase().includes('normal range')) {
            measurement.normalRange = value;
          } else if (key.toLowerCase().includes('status')) {
            measurement.status = value as 'Good' | 'Okay' | 'Needs Attention';
          } else {
            const [name, valueWithUnit] = [key, value];
            measurement.name = name;
            measurement.value = valueWithUnit;
          }
        }
      }
      
      if (Object.keys(measurement).length > 0) {
        measurements.push(measurement as Measurement);
      }
    }
  }

  // Before sending the response, clean up empty values
  const cleanedMeasurements = measurements.map(measurement => ({
    ...measurement,
    meaning: measurement.meaning?.trim() || undefined,
    normalRange: measurement.normalRange?.trim() || undefined,
    tips: measurement.tips?.filter(tip => tip.trim()) || undefined
  })).filter(measurement => 
    measurement.value || 
    measurement.meaning || 
    measurement.normalRange || 
    (measurement.tips && measurement.tips.length)
  );

  const cleanedResult = {
    measurements: cleanedMeasurements,
    summary: summary?.trim() || undefined,
    lifestyleTips: lifestyleTips?.filter(tip => tip.trim()) || []
  };

  return cleanedResult;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const reportType = formData.get('reportType') as string;

    if (!file || !reportType) {
      return NextResponse.json(
        { error: !file ? 'No file uploaded' : 'Report type not specified' },
        { status: 400 }
      );
    }

    const fileBuffer = await file.arrayBuffer();
    const fileBytes = new Uint8Array(fileBuffer);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-1219" });
    const prompt = generatePrompt(reportType);

    try {
      const result = await Promise.race([
        model.generateContent([
          prompt,
          {
            inlineData: {
              mimeType: file.type,
              data: Buffer.from(fileBytes).toString('base64')
            }
          }
        ]),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('API timeout')), 50000)
        )
      ]) as GenerateContentResult;

      const response = await result.response;
      const processedResult = processGeminiOutput(response.text());

      // Check if result indicates invalid report
      if ('error' in processedResult) {
        return NextResponse.json({ 
          error: processedResult.error,
          isInvalidReport: true
        }, { status: 400 });
      }

      return NextResponse.json({ 
        result: processedResult,
        success: true 
      });

    } catch (error: any) {
      console.error('Gemini API Error:', error);
      return NextResponse.json({ 
        error: 'Error analyzing the document. Please make sure the file is a valid medical report.',
        details: error.message
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ 
      error: 'An unexpected error occurred while processing your request.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};

