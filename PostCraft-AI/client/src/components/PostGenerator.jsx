import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { PostCard } from './PostCard';
import axios from 'axios';
import { cn } from '@/lib/utils';

const PLATFORMS = [
  { id: 'twitter', label: 'Twitter/X' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
];

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'funny', label: 'Funny' },
  { value: 'engaging', label: 'Engaging' },
  { value: 'inspiring', label: 'Inspiring' },
];

export function PostGenerator({ onGenerate, onCopy }) {
  const [prompt, setPrompt] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['twitter', 'linkedin']);
  const [tone, setTone] = useState('professional');
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const togglePlatform = (platformId) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || selectedPlatforms.length === 0) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/posts/generate', {
        prompt,
        platforms: selectedPlatforms,
        tone,
      });

      setGeneratedPosts(response.data.posts);
      onGenerate && onGenerate(response.data.count);
    } catch (error) {
      console.error('Error generating posts:', error);
      alert('Failed to generate posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 font-space">Create Your Post</h2>
          <p className="text-sm text-muted-foreground">Tell us what you want to post about.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Topic or Idea</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your post topic or idea here..."
            className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Platforms</label>
          <div className="grid grid-cols-2 gap-3">
            {PLATFORMS.map((platform) => (
              <label
                key={platform.id}
                className={cn(
                  'flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-colors',
                  selectedPlatforms.includes(platform.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-input hover:bg-accent'
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(platform.id)}
                  onChange={() => togglePlatform(platform.id)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{platform.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tone</label>
          <Select
            value={tone}
            onValueChange={setTone}
            options={TONES}
            placeholder="Select tone"
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={isLoading || !prompt.trim() || selectedPlatforms.length === 0}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            'Generating...'
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Posts
            </>
          )}
        </Button>
      </div>

      {generatedPosts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold font-space">Generated Posts</h3>
          <div className="space-y-4">
            {generatedPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onCopy={() => onCopy && onCopy('Post copied to clipboard!')}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

