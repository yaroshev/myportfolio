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