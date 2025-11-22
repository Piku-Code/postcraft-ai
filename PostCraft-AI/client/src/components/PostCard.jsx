import { Copy, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

const platformColors = {
  twitter: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  linkedin: 'bg-blue-600/20 text-blue-300 border-blue-600/30',
  instagram: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  facebook: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const platformLabels = {
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

export function PostCard({ post, onCopy, onDelete, isHistory = false }) {
  const platformColor = platformColors[post.platform] || platformColors.twitter;
  const platformLabel = platformLabels[post.platform] || post.platform;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      onCopy && onCopy();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="glass-card rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <span className={cn('rounded-full px-3 py-1 text-xs font-medium border', platformColor)}>
          {platformLabel}
        </span>
        {!isHistory && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Copy className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isHistory && (
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Prompt:</p>
          <p className="mb-3">{post.prompt}</p>
        </div>
      )}

      <p className="text-sm leading-relaxed text-foreground">{post.content}</p>

      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <span className="text-xs text-muted-foreground capitalize">
          {post.characterCount} {post.characterCount === 1 ? 'char' : 'chars'} • {post.tone}
        </span>
        {isHistory && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete && onDelete(post._id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!isHistory && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs"
          >
            Copy
          </Button>
        )}
      </div>
    </div>
  );
}

