import React from 'react';
import { SkinToneResult, ColorRecommendation } from '../types';

interface AnalysisResultsProps {
  isLoading: boolean;
  skinToneResult: SkinToneResult | null;
  colorRecommendations: Record<string, { colors: string[]; description: string }> | null;
  recommendedSeasons: string[] | null;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  isLoading,
  skinToneResult,
  colorRecommendations,
  recommendedSeasons,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Analyzing your skin tone...</p>
      </div>
    );
  }

  if (!skinToneResult || !colorRecommendations || !recommendedSeasons) {
    return null;
  }

  // Map skin tone to a representative color
  const toneColorMap: Record<string, string> = {
    Light: '#F5E8C7',
    Fair: '#ECDBBA',
    Medium: '#D5B895',
    Olive: '#C9AE7C',
    Tan: '#B08968',
    Deep: '#8D5B4C',
    Dark: '#5C4033',
  };

  const toneColor = toneColorMap[skinToneResult.tone] || '#000000';

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Your Skin Tone Analysis</h2>
        
        <div className="flex flex-col md:flex-row md:items-center mb-6">
          <div className="mb-4 md:mb-0 md:mr-6">
            <div className="w-16 h-16 rounded-full" style={{ backgroundColor: toneColor }}></div>
          </div>
          
          <div>
            <p className="text-lg">
              Your skin tone is{' '}
              <span 
                className="font-bold" 
              >
                {skinToneResult.tone}
              </span>{' '}
              with a{' '}
              <span className="font-medium">
                {skinToneResult.undertone}
              </span>{' '}
              undertone
            </p>
            <p className="text-gray-600">
              Analysis confidence: {skinToneResult.confidence}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Your Color Recommendations</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Recommended Seasonal Palettes</h3>
          <p className="text-gray-600 mb-4">
            Based on your {skinToneResult.undertone} undertone, these seasonal color palettes will complement your skin tone best:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedSeasons.map((season) => (
              <div key={season} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="text-lg font-medium mb-2">{season}</h4>
                <p className="text-sm text-gray-600 mb-3">{colorRecommendations[season].description}</p>
                <div className="flex space-x-2">
                  {colorRecommendations[season].colors.map((color, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">All Seasonal Palettes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(colorRecommendations)
              .filter(([season]) => !recommendedSeasons.includes(season))
              .map(([season, palette]) => (
                <div key={season} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-lg font-medium mb-2">{season}</h4>
                  <p className="text-sm text-gray-600 mb-3">{palette.description}</p>
                  <div className="flex space-x-2">
                    {palette.colors.map((color, index) => (
                      <div 
                        key={index}
                        className="w-8 h-8 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;