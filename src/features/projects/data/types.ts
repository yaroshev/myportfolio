export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  technologies: string[];
  videos?: {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
  }[];
  description: string;
  client: string;
  year: number;
  role: string;
  overview: string;
  process: string[];
  results: string[];
  challenge?: string;
  solution?: string;
  impact?: string;
  images: string[];
  featured?: boolean;
  url?: string;
  tools?: string[];
  lightBackground?: boolean;
  featuredVideo?: {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
  };
} 