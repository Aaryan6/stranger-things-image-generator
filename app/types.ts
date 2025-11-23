export interface GeneratedImage {
  id: string;
  url: string;
  timestamp: number;
}

export interface AppState {
  sourceImage: File | null;
  sourceImagePreview: string | null;
  generatedImages: GeneratedImage[];
  isGenerating: boolean;
  imageCount: number;
  apiKeySet: boolean;
  error: string | null;
  userPrompt: string;
}

export interface GenerationConfig {
  imageCount: number;
  sourceImage: string; // Base64
  mimeType: string;
}
