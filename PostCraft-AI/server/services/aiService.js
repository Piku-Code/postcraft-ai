import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Validate API key
const apiKey = process.env.GEMINI_API_KEY?.trim();
const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash'; // Default to stable version

if (!apiKey || apiKey === '') {
  console.error(' WARNING: GEMINI_API_KEY is not set in environment variables');
} else {
  console.log(`Gemini API key loaded (length: ${apiKey.length}, model: ${modelName})`);
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Platform-specific character limits
const PLATFORM_LIMITS = {
  twitter: 280,
  linkedin: 3000,
  instagram: 2200,
  facebook: 2000,
};

// Platform-specific instructions
const PLATFORM_INSTRUCTIONS = {
  twitter: 'Keep it concise and engaging. Use hashtags sparingly. Make it punchy and shareable.',
  linkedin: 'Professional and thoughtful. Can be longer and more detailed. Focus on value and insights.',
  instagram: 'Engaging and visual. Use emojis appropriately. Make it relatable and authentic.',
  facebook: 'Conversational and friendly. Can include questions to encourage engagement. Make it community-focused.',
};

export async function generatePost(prompt, platform, tone) {
  try {
    // Validate API key before making request
    if (!apiKey || apiKey === '') {
      throw new Error('GEMINI_API_KEY is not configured. Please set it in your server/.env file.');
    }

    if (!genAI) {
      throw new Error('GoogleGenerativeAI client not initialized. Check your API key.');
    }

    // Use configured model (default: gemini-1.5-flash)
    // Available models: gemini-1.5-flash, gemini-1.5-pro, gemini-pro
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const characterLimit = PLATFORM_LIMITS[platform.toLowerCase()];
    const platformInstructions = PLATFORM_INSTRUCTIONS[platform.toLowerCase()];

    const systemPrompt = `You are an expert social media content creator. Generate a ${tone} social media post for ${platform}.

Requirements:
- Platform: ${platform}
- Tone: ${tone}
- Character limit: ${characterLimit} characters (STRICTLY enforce this limit)
- Platform guidelines: ${platformInstructions}

User's prompt/topic: ${prompt}

Generate ONLY the post content. Do not include any explanations, labels, or meta information. Just the post text itself. Make sure it's engaging, authentic, and fits the platform's style.`;

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    let generatedText = response.text().trim();

    // Ensure we don't exceed character limit
    if (generatedText.length > characterLimit) {
      generatedText = generatedText.substring(0, characterLimit - 3) + '...';
    }

    return generatedText;
  } catch (error) {
    console.error('AI generation error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      apiKeySet: !!apiKey,
      apiKeyLength: apiKey?.length,
      modelName: modelName
    });
    
    // Provide more helpful error messages
    if (error.message.includes('API_KEY') || error.message.includes('403') || error.message.includes('Forbidden')) {
      throw new Error(
        'Invalid or missing Gemini API key. ' +
        'Please verify your GEMINI_API_KEY in server/.env file. ' +
        'Make sure the key is correct and has no extra spaces or quotes. ' +
        'You can test your API key at: http://localhost:5000/api/posts/test-api-key'
      );
    }
    
    if (error.message.includes('404') || error.message.includes('not found')) {
      throw new Error(
        `Model "${modelName}" not found. ` +
        'Available models: gemini-1.5-flash, gemini-1.5-pro, gemini-pro. ' +
        'Set GEMINI_MODEL in your .env file to use a different model.'
      );
    }
    
    throw new Error(`Failed to generate post: ${error.message}`);
  }
}

