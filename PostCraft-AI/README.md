# PostCraft AI

A full-stack AI-powered social media post generator that creates engaging content for Twitter, LinkedIn, Instagram, and Facebook using Google Gemini 2.5 Flash.

## Features

- 🤖 **AI-Powered Generation**: Uses Google Gemini 2.5 Flash to generate platform-specific content
- 📱 **Multi-Platform Support**: Generate posts for Twitter/X, LinkedIn, Instagram, and Facebook
- 🎨 **Multiple Tones**: Choose from Professional, Casual, Funny, Engaging, or Inspiring tones
- 📊 **Character Limits**: Automatically enforces platform-specific character limits
- 📋 **Copy to Clipboard**: One-click copy functionality for easy sharing
- 📚 **Post History**: View and manage all previously generated posts
- 🗑️ **Delete Posts**: Remove posts from your history
- 🎯 **Modern UI**: Beautiful glass-morphism design with dark theme
- 🔔 **Toast Notifications**: Real-time feedback for user actions

## Tech Stack

- **Frontend**: React + Vite + Shadcn UI + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **AI**: Google Gemini 2.5 Flash

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Google Gemini API key

## Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**:
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**:
   
   Create a `server/.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/postcraft-ai
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start MongoDB** (if using local instance):
   ```bash
   # Make sure MongoDB is running on your system
   ```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

**Backend** (Terminal 1):
```bash
npm run server
```

**Frontend** (Terminal 2):
```bash
npm run client
```

### Production Build

Build the frontend:
```bash
npm run build
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter your post topic or idea in the text area
3. Select one or more social media platforms
4. Choose a tone for your post
5. Click "Generate Posts" to create AI-generated content
6. Copy posts to clipboard or view them in the history panel
7. Manage your posts from the history panel on the right

## Platform Character Limits

- **Twitter/X**: 280 characters
- **LinkedIn**: 3,000 characters
- **Instagram**: 2,200 characters
- **Facebook**: 2,000 characters

## Project Structure

```
postcraft-ai/
├── server/
│   ├── models/
│   │   └── Post.js
│   ├── routes/
│   │   └── posts.js
│   ├── services/
│   │   └── aiService.js
│   ├── index.js
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── PostCard.jsx
│   │   │   ├── PostGenerator.jsx
│   │   │   └── HistoryPanel.jsx
│   │   ├── lib/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/posts` - Get all posts
- `POST /api/posts/generate` - Generate new posts
- `DELETE /api/posts/:id` - Delete a post

## Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `server/.env` file

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!

