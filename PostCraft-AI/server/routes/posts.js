import express from 'express';
import Post from '../models/Post.js';
import { generatePost } from '../services/aiService.js';

const router = express.Router();

// Test endpoint to verify API key
router.get('/test-api-key', async (req, res) => {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    
    if (!apiKey || apiKey === '') {
      return res.status(400).json({ 
        error: 'API key not found',
        message: 'GEMINI_API_KEY is not set in environment variables',
        help: 'Create a server/.env file with: GEMINI_API_KEY=your_api_key_here'
      });
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    // Simple test request
    const result = await model.generateContent('Say "API key is working"');
    const response = await result.response;
    const text = response.text();
    
    res.json({ 
      success: true, 
      message: 'API key is valid and working!',
      testResponse: text,
      apiKeyLength: apiKey.length,
      apiKeyPrefix: apiKey.substring(0, 10) + '...',
      model: modelName,
      note: 'Your API key is configured correctly. You can now generate posts!'
    });
  } catch (error) {
    let errorMessage = error.message;
    let suggestions = [];
    
    if (error.message.includes('403') || error.message.includes('Forbidden')) {
      errorMessage = 'Invalid API key or API key not authorized';
      suggestions = [
        'Verify your API key at https://makersuite.google.com/app/apikey',
        'Make sure there are no extra spaces or quotes in your .env file',
        'Ensure the API key is in the correct format (usually starts with AIza...)',
        'Try creating a new API key if the current one doesn\'t work'
      ];
    } else if (error.message.includes('404') || error.message.includes('not found')) {
      errorMessage = `Model "${process.env.GEMINI_MODEL || 'gemini-1.5-flash'}" not found`;
      suggestions = [
        'Available models: gemini-1.5-flash, gemini-1.5-pro, gemini-pro',
        'Set GEMINI_MODEL in your .env file to use a different model'
      ];
    }
    
    res.status(500).json({ 
      error: 'API key test failed',
      message: errorMessage,
      details: error.toString(),
      suggestions: suggestions
    });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate and save posts
router.post('/generate', async (req, res) => {
  try {
    const { prompt, platforms, tone } = req.body;

    if (!prompt || !platforms || platforms.length === 0) {
      return res.status(400).json({ error: 'Prompt and at least one platform are required' });
    }

    const generatedPosts = [];

    // Generate posts for each selected platform
    for (const platform of platforms) {
      const postContent = await generatePost(prompt, platform, tone);
      const characterCount = postContent.length;

      const post = new Post({
        prompt,
        platform,
        tone,
        content: postContent,
        characterCount,
      });

      await post.save();
      generatedPosts.push(post);
    }

    res.json({ posts: generatedPosts, count: generatedPosts.length });
  } catch (error) {
    console.error('Error generating posts:', error);
    res.status(500).json({ error: error.message || 'Failed to generate posts' });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

