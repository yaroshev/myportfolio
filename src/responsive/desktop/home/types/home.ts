import { Dispatch, RefObject, SetStateAction } from "react";

export interface HomeSectionProps {
  onCursorChange?: Dispatch<SetStateAction<string>>;
  setActivePage: (page: string) => void;
}

export interface StatsSectionProps {
  onCursorChange?: Dispatch<SetStateAction<string>>;
  setActivePage: (page: string) => void;
}

export interface CallToActionSectionProps {
  onCursorChange?: Dispatch<SetStateAction<string>>;
  setActivePage: (page: string) => void;
}

export interface ServicesSectionProps {
  onCursorChange?: Dispatch<SetStateAction<string>>;
}

export interface TestimonialsSectionProps {
  onCursorChange?: Dispatch<SetStateAction<string>>;
}

export interface HomeProps {
  onCursorChange: (type: string) => void;
  setActivePage: (page: string) => void;
}

export interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ServiceProps {
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

export interface Testimonial {
  quote: string[];
  author: string;
  role: string;
  company: string;
  image?: string;
} 