import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import AnalysisResults from './components/AnalysisResults';
import { analyzeSkinTone, getSeasonalPalettes } from './utils/skinToneAnalyzer';
import { SkinToneResult } from './types';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [skinToneResult, setSkinToneResult] = useState<SkinToneResult | null>(null);
  const [colorRecommendations, setColorRecommendations] = useState<Record<string, { colors: string[]; description: string }> | null>(null);
  const [recommendedSeasons, setRecommendedSeasons] = useState<string[] | null>(null);

  const handleImageSelected = async (image: HTMLImageElement) => {
    setIsAnalyzing(true);
    setSkinToneResult(null);
    setColorRecommendations(null);
    setRecommendedSeasons(null);
    
    try {
      // Simulate loading time for the AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Analyze skin tone
      const result = await analyzeSkinTone(image);
      setSkinToneResult(result);
      
      // Get color recommendations based on undertone
      const { recommended, all } = getSeasonalPalettes(result.undertone);
      setRecommendedSeasons(recommended);
      setColorRecommendations(all);
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Handle error state here
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Palette size={36} className="text-purple-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">AI Skin Tone Analyzer</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload or capture a photo of your face to analyze your skin tone and get personalized color recommendations based on seasonal palettes.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Step 1: Upload or Capture Your Photo</h2>
          <ImageUploader onImageSelected={handleImageSelected} />
        </div>

        {(isAnalyzing || skinToneResult) && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Step 2: View Your Results</h2>
            <AnalysisResults
              isLoading={isAnalyzing}
              skinToneResult={skinToneResult}
              colorRecommendations={colorRecommendations}
              recommendedSeasons={recommendedSeasons}
            />
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Note: This is a demonstration using simulated AI analysis. In a production environment, 
            this would use properly trained models for accurate skin tone analysis.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;