export interface SkinToneResult {
  tone: string;
  confidence: number;
  undertone: 'warm' | 'cool' | 'neutral';
}

export interface ColorRecommendation {
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  colors: string[];
  description: string;
}

export interface SeasonalPalette {
  name: string;
  colors: string[];
  description: string;
}