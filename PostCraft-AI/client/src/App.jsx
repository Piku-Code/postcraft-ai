import { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { PostGenerator } from './components/PostGenerator';
import { HistoryPanel } from './components/HistoryPanel';
import { Toast } from './components/ui/Toast';

function App() {
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
  const refreshHistoryRef = useRef(null);

  const handleGenerate = (count) => {
    showToast(`Generated ${count} post${count > 1 ? 's' : ''}!`, 'success');
    // Refresh history after generating posts
    if (refreshHistoryRef.current) {
      refreshHistoryRef.current();
    }
  };

  const handleCopy = (message) => {
    showToast(message || 'Post copied to clipboard!', 'success');
  };

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, isVisible: false });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold font-space">PostCraft AI</h1>
          </div>
          <p className="text-muted-foreground">Generate engaging social media content with AI</p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Generator */}
          <div>
            <PostGenerator onGenerate={handleGenerate} onCopy={handleCopy} />
          </div>

          {/* Right Panel - History */}
          <div>
            <HistoryPanel ref={refreshHistoryRef} />
          </div>
        </div>
      </div>

      {/* Global Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}

export default App;

