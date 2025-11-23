import { GoogleGenAI } from "@google/genai";

// We use the specific model requested for high quality image generation
const MODEL_NAME = 'gemini-3-pro-image-preview';

/**
 * Converts a File object to a Base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the Data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Generates images based on the source image using Gemini 3 Pro.
 * Now accepts a userPrompt to guide the specific content.
 */
export const generateStrangerThingsImages = async (
  base64Image: string,
  mimeType: string,
  count: number,
  userPrompt: string,
  apiKey: string
): Promise<string[]> => {

  // Ensure we get a fresh client with the provided API key
  const ai = new GoogleGenAI({ apiKey });

  // Constructed prompt to force the aesthetic while allowing creative freedom
  const systemPrompt = `
    You are a visual effects concept artist for Stranger Things.

    TASK: Re-imagine the subject from the provided reference image inside the "Upside Down".

    IMAGE USAGE INSTRUCTIONS (CRITICAL):
    - **IDENTITY REFERENCE ONLY**: Use the provided image to capture the character's physical appearance (face, hair, build, clothing style).
    - **BREAK THE POSE**: Do NOT strictly adhere to the original photo's pose, camera angle, or composition. You MUST re-stage the shot to make it cinematic.
    - **DYNAMIC SCENE**: The character should be interacting with the environment (e.g., looking around in fear, running, hiding, or investigating).
    - **INTEGRATION**: Blend the character naturally into the lighting and atmosphere. Their clothes should look distressed, dirty, or wet to match the environment.

    THEME: THE UPSIDE DOWN
    - **ATMOSPHERE**: Thick, volumetric blue/grey fog. The air must be filled with floating white spore particles (ash-like snow).
    - **ENVIRONMENT**: The world is decayed and abandoned. Structures are covered in massive, twisting organic vines (nether-tentacles) and biological sludge.
    - **LIGHTING**: Cinematic low-key lighting. Cold cyan ambient light punctuated by fierce RED lightning storms or glowing red rifts in the distance.
    - **VIBE**: 1980s retro-horror, film grain, high contrast.

    USER SCENARIO:
    ${userPrompt ? `SPECIFIC ACTION: "${userPrompt}". Prioritize this action over the original image context.` : 'SCENE: The character is trapped in a dark, vine-covered version of a real-world location, looking terrified or heroic.'}

    OUTPUT REQUIREMENTS:
    - Photorealistic 8k resolution.
    - Cinematic aspect ratio and depth of field.
    - NO TEXT, NO LOGOS, NO WATERMARKS.
  `;

  const requests = Array.from({ length: count }).map(async () => {
    try {
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType,
              },
            },
            { text: systemPrompt },
          ],
        },
        config: {
          imageConfig: {
            imageSize: '1K',
            aspectRatio: '1:1',
          },
        },
      });

      if (response.candidates && response.candidates.length > 0) {
        const content = response.candidates[0].content;
        if (content && content.parts) {
          for (const part of content.parts) {
            if (part.inlineData && part.inlineData.data) {
              return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            }
          }
        }
      }
      return null;
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  });

  const results = await Promise.all(requests);
  return results.filter((res): res is string => res !== null);
};
