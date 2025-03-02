import React from 'react';
import { SkinToneResult, ColorRecommendation } from '../types';
import { getSkinToneColor, getContrastColor } from '../utils/colorUtils';

interface AnalysisResultProps {
  result: SkinToneResult;
  recommendations: ColorRecommendation[];
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, recommendations }) => {
  const toneColor = getSkinToneColor(result.tone);
  const textColor = getContrastColor(toneColor);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Skin Tone:</span>
            <span 
              className="font-bold px-3 py-1 rounded" 
              style={{ backgroundColor: toneColor, color: textColor }}
            >
              {result.tone}
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 font-medium">Undertone:</span>
            <span className="font-semibold capitalize">{result.undertone}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Confidence:</span>
            <div className="flex items-center">
              <div className="w-32 bg-gray-200 rounded-full h-2.5 mr-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{result.confidence}%</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3">Recommended Color Palettes</h3>
        
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div key={rec.season} className="border rounded-md p-4">
              <h4 className="font-medium text-lg mb-2">{rec.season}</h4>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <div className="flex space-x-2">
                {rec.colors.map((color, index) => (
                  <div 
                    key={index}
                    className="w-8 h-8 rounded-full border border-gray-200"
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
  );
};

export default AnalysisResult;