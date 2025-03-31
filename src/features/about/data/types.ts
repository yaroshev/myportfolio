export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface TimelinePoint {
  year: string;
  title: string;
  description: string;
  company?: string;
}

export interface AboutPageData {
  skills: Skill[];
  timeline: TimelinePoint[];
} 