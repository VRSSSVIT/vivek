import { SkinToneResult, ColorRecommendation, SeasonalPalette } from '../types';

// Monk Skin Tone Scale (MST) - simplified version
export const skinTones = [
  { id: 1, name: 'Very Light', hexColor: '#f6ede4', undertone: 'cool' },
  { id: 2, name: 'Light', hexColor: '#f3e7db', undertone: 'cool' },
  { id: 3, name: 'Light Medium', hexColor: '#f0d9c9', undertone: 'neutral' },
  { id: 4, name: 'Medium', hexColor: '#ebc8a4', undertone: 'warm' },
  { id: 5, name: 'Medium Dark', hexColor: '#c68e6e', undertone: 'warm' },
  { id: 6, name: 'Dark', hexColor: '#9b6b4e', undertone: 'neutral' },
  { id: 7, name: 'Deep', hexColor: '#7a5032', undertone: 'cool' },
  { id: 8, name: 'Very Deep', hexColor: '#5a3825', undertone: 'cool' },
  { id: 9, name: 'Deep Dark', hexColor: '#4a2c18', undertone: 'warm' },
  { id: 10, name: 'Deepest', hexColor: '#33241a', undertone: 'warm' },
];

// Seasonal color palettes
export const seasonalPalettes: SeasonalPalette[] = [
  {
    name: 'Spring',
    colors: ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#FF5733'],
    description: 'Warm, golden hues that bring brightness and energy'
  },
  {
    name: 'Summer',
    colors: ['#AED6F1', '#85C1E9', '#D2B4DE', '#A569BD', '#F5B7B1', '#F1948A'],
    description: 'Cool, muted tones that create a soft, delicate appearance'
  },
  {
    name: 'Autumn',
    colors: ['#BA4A00', '#D35400', '#E67E22', '#F39C12', '#B9770E', '#784212'],
    description: 'Rich, earthy shades that reflect warmth and depth'
  },
  {
    name: 'Winter',
    colors: ['#1B4F72', '#2E86C1', '#CB4335', '#8E44AD', '#2C3E50', '#E74C3C'],
    description: 'Bold, cool colors that create striking contrast'
  }
];

// Mock function to determine skin tone from image data
// In a real app, this would use TensorFlow.js or a similar ML library
export const analyzeSkinTone = async (imageData: string): Promise<SkinToneResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, return a random skin tone with confidence
  const randomIndex = Math.floor(Math.random() * skinTones.length);
  const selectedTone = skinTones[randomIndex];
  
  return {
    tone: selectedTone.name,
    confidence: 75 + Math.floor(Math.random() * 20), // Random confidence between 75-95%
    undertone: selectedTone.undertone as 'warm' | 'cool' | 'neutral'
  };
};

// Get color recommendations based on skin undertone
export const getColorRecommendations = (undertone: 'warm' | 'cool' | 'neutral'): ColorRecommendation[] => {
  // Map undertones to seasonal palettes
  let recommendedSeasons: ('Spring' | 'Summer' | 'Autumn' | 'Winter')[] = [];
  
  switch (undertone) {
    case 'warm':
      recommendedSeasons = ['Spring', 'Autumn'];
      break;
    case 'cool':
      recommendedSeasons = ['Summer', 'Winter'];
      break;
    case 'neutral':
      recommendedSeasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
      break;
  }
  
  return recommendedSeasons.map(season => {
    const palette = seasonalPalettes.find(p => p.name === season)!;
    return {
      season: season as 'Spring' | 'Summer' | 'Autumn' | 'Winter',
      colors: palette.colors,
      description: palette.description
    };
  });
};

// Get the hex color for a skin tone name
export const getSkinToneColor = (toneName: string): string => {
  const tone = skinTones.find(t => t.name === toneName);
  return tone ? tone.hexColor : '#000000';
};

// Get contrasting text color (black or white) based on background color
export const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? '#000000' : '#ffffff';
};