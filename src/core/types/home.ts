export interface HomeProps {
  setActivePage: (page: string) => void;
  onCursorChange?: (cursorType: string) => void;
}

export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: Record<string, string>;
  image: string | any;
  color: string;
  videoUrl: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface TestimonialProps {
  quote: string[] | string;
  company: string;
  name: string;
  role: string;
  gradient: string;
}

export interface ServiceProps {
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

export interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
} 