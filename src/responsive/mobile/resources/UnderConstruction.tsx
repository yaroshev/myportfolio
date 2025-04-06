import React from 'react';
import { Construction } from 'lucide-react';

interface UnderConstructionProps {
  setShowOriginalContent: (show: boolean) => void;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ setShowOriginalContent }) => {
  return (
    <div className="pt-24 pb-20 px-4">
      <div className="mx-auto">
        <div className="backdrop-blur-sm bg-dark-900/40 border border-primary-500/30 rounded-xl p-6 text-center relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-dark-950 z-0" />
          
          {/* Construction icon */}
          <div className="flex justify-center mb-6 relative z-10">
            <div className="p-4 rounded-full bg-dark-800/50 border border-primary-500/30">
              <Construction className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-light tracking-tight mb-4 relative z-10 text-primary-300">
            Resources Coming Soon
          </h1>
          
          {/* Description */}
          <p className="text-neutral-300 text-base mx-auto mb-10 relative z-10">
            The resources section is currently under construction. I'm working on curating a valuable collection of tools, guides, and resources to share with you soon.
          </p>
          
          {/* Visual flair - grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjkuNSAwLjVMMjkuNSA1OS41TTU5LjUgMjkuNUgwLjUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] z-0 opacity-20" />
          
          {/* Animated particles */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary-500/10 animate-float1 z-0"></div>
          <div className="absolute top-3/4 left-1/3 w-4 h-4 rounded-full bg-primary-500/10 animate-float2 z-0"></div>
          <div className="absolute top-1/2 right-1/4 w-5 h-5 rounded-full bg-primary-500/10 animate-float3 z-0"></div>
          
          {/* Hidden button */}
          <div className="mt-16 relative z-10">
            <button
              onClick={() => setShowOriginalContent(true)}
              className="text-xs text-neutral-600 hover:text-primary-400 transition-colors duration-300"
            >
              v0.0.01
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction; 