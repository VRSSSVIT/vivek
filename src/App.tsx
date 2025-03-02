import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import AnalysisResult from './components/AnalysisResult';
import LoadingSpinner from './components/LoadingSpinner';
import { analyzeSkinTone, getColorRecommendations } from './utils/colorUtils';
import { SkinToneResult, ColorRecommendation } from './types';

function App() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SkinToneResult | null>(null);
  const [colorRecommendations, setColorRecommendations] = useState<ColorRecommendation[]>([]);

  const handleImageCaptured = async (data: string) => {
    setImageData(data);
    setIsAnalyzing(true);
    
    try {
      // In a real app, this would use TensorFlow.js to analyze the image
      const result = await analyzeSkinTone(data);
      setAnalysisResult(result);
      
      // Get color recommendations based on undertone
      const recommendations = getColorRecommendations(result.undertone);
      setColorRecommendations(recommendations);
    } catch (error) {
      console.error('Error analyzing image:', error);
      // Handle error state
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Palette className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">AI Skin Tone Analyzer</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload or capture a photo of your face</h2>
            <p className="text-gray-600 mb-6">
              Our AI will analyze your skin tone and provide personalized color recommendations.
              For best results, use a well-lit photo with a neutral background.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Your Photo</h3>
                <ImageUploader onImageCaptured={handleImageCaptured} />
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Results</h3>
                {isAnalyzing ? (
                  <LoadingSpinner />
                ) : analysisResult ? (
                  <AnalysisResult 
                    result={analysisResult} 
                    recommendations={colorRecommendations} 
                  />
                ) : (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <p className="text-gray-500">
                      Upload or capture a photo to see your skin tone analysis and color recommendations
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
                <div className="text-blue-600 font-bold text-lg mb-2">1. Upload Photo</div>
                <p className="text-gray-600">
                  Upload a clear photo of your face or use your camera to capture one in good lighting.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-blue-600 font-bold text-lg mb-2">2. AI Analysis</div>
                <p className="text-gray-600">
                  Our AI analyzes your skin tone using advanced computer vision and maps it to the Monk Skin Tone Scale.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-blue-600 font-bold text-lg mb-2">3. Get Recommendations</div>
                <p className="text-gray-600">
                  Receive personalized color recommendations based on your skin tone and undertone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2025 AI Skin Tone Analyzer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;