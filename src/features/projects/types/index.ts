export interface WorkProps {
  onCursorChange?: (cursorType: string) => void;
  setActivePage?: (page: string) => void;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  fallbackImage?: string;
  website?: string;
  year: string;
  client: string;
  services: string[];
  stats: string[];
  color: string;
  accentColor: string;
}

export interface VideoProject {
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: {
    views: string;
    engagement: string;
    reach: string;
  };
  image: string;
  color: string;
  videoUrl: string;
}

export interface Filter {
  id: string;
  label: string;
  description: string;
} 