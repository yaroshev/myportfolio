import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  name: string;
  url: string;
  description: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ name, url, description }) => {
  return (
    <a 
      href={url}
      className="border border-neutral-800 rounded-lg p-6 backdrop-blur-sm bg-neutral-900/20 hover:bg-neutral-800/30 transition-all duration-500 group"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-light mb-2 group-hover:text-neutral-100 transition-colors duration-300">
          {name}
        </h3>
        <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300" />
      </div>
      <p className="text-neutral-400 text-sm">{description}</p>
    </a>
  );
};

export default ResourceCard; 