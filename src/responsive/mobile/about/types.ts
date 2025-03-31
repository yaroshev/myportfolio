import { RefObject, Dispatch, SetStateAction } from 'react';

export interface AboutSectionProps {
  sectionRef: RefObject<HTMLElement>;
  onCursorChange?: Dispatch<SetStateAction<string>>;
  setActivePage?: (page: string) => void;
}

export interface BioSectionProps extends AboutSectionProps {
  // Add any bio-specific props here
}

export interface HeroSectionProps extends AboutSectionProps {
  // Add any hero-specific props here
  setActivePage: (page: string) => void;
}

export interface SkillsSectionProps extends AboutSectionProps {
  // Add any skills-specific props here
}

export interface TimelineSectionProps extends AboutSectionProps {
  // Add any timeline-specific props here
}

export interface NavDotsProps {
  activeSection: string;
  sections: string[];
  onDotClick: (sectionId: string) => void;
  onCursorChange?: Dispatch<SetStateAction<string>>;
} 