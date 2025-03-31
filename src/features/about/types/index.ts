// Common types for the About page components

export interface AboutSectionProps {
  onCursorChange?: (cursorType: string) => void;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
}

export interface AboutPageProps extends AboutSectionProps {
  setActivePage?: (page: string) => void;
} 