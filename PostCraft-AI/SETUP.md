# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm run install-all
```

This will install dependencies for:
- Root project (concurrently for running both servers)
- Backend server
- Frontend client

## Step 2: Configure Environment Variables

Create a file `server/.env` with the following content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/postcraft-ai
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

**Note:** 
- `GEMINI_MODEL` is optional (defaults to `gemini-2.5-flash`)
- Available models: `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-pro`
- Make sure there are **no spaces or quotes** around the API key value

### Getting a Gemini API Key:
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `server/.env` file

### MongoDB Setup:
- **Option 1 (Local)**: Install MongoDB locally and make sure it's running
- **Option 2 (Cloud)**: Use MongoDB Atlas (free tier available)
  - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - Create a cluster
  - Get connection string and update `MONGODB_URI` in `.env`

## Step 3: Start the Application

### Development Mode (Recommended):
```bash
npm run dev
```

This starts both frontend (port 3000) and backend (port 5000) simultaneously.

### Or run separately:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

## Step 4: Test Your API Key (Optional but Recommended)

Before generating posts, test if your API key is working:

Visit: `http://localhost:5000/api/posts/test-api-key`

You should see a success message if your API key is configured correctly.

## Step 5: Open in Browser

Navigate to: `http://localhost:3000`

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running (if using local)
- Check your `MONGODB_URI` in `server/.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Gemini API Error (403 Forbidden)
- **Most common issue**: API key not loaded or incorrect format
- Verify your API key is in `server/.env` (not root `.env`)
- Check for extra spaces or quotes around the key
- Make sure you **restarted the server** after adding the key
- Test your API key: `http://localhost:5000/api/posts/test-api-key`
- See `TROUBLESHOOTING.md` for detailed help

### Port Already in Use
- Change `PORT` in `server/.env` (backend)
- Change port in `client/vite.config.js` (frontend)

