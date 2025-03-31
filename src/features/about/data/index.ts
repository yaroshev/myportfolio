import { Skill, TimelinePoint } from './types';

// Skills data
export const skills: Skill[] = [
  { 
    category: 'Media Production & Design',
    items: ['Adobe Creative Cloud', 'DaVinci Resolve', 'CapCut', 'Canon/RED/Blackmagic', 'DJI Drones & Gimbals', 'PTZ Remote Multicam'] 
  },
  { 
    category: 'Marketing & Analytics',
    items: ['Google Analytics', 'Facebook Business Suite', 'Shopify Analytics', 'YouTube Analytics', 'TikTok Analytics', 'Constant Contact'] 
  },
  { 
    category: 'Development & Technical',
    items: ['Python', 'JavaScript', 'React', 'HTML/CSS', 'Swift', 'Wix'] 
  },
  { 
    category: 'AI & Automation',
    items: ['Make', 'ChatGPT', 'Claude', 'Gemini', 'Google Cloud Console', '11Labs'] 
  },
  {
    category: 'Project Management',
    items: ['Notion', 'Miro', 'Monday', 'Buffer', 'Google Business Suite', 'Technical Project Management']
  }
];

// Timeline data
export const timelineEvents: TimelinePoint[] = [
  {
    year: '2024',
    title: 'Digital Content & Marketing Manager',
    company: 'Wildwood Outdoor Living Center',
    description: 'Managing email marketing system for 30K weekly recipients, implementing video content resulting in 33% increase in conversion rates. Developed data-driven content strategy achieving first organic sales from YouTube channel. Reached over 1M+ users through organic reach.'
  },
  {
    year: '2023',
    title: 'Producer, Camera Operator',
    company: 'Roll.Focus Productions',
    description: 'Managing advanced camera systems, graphics and sound boards for live-streaming national and global events. Executed high-profile broadcasts including Symphony at Vancouver Orpheum and 2024 Olympic Rugby Qualifiers.'
  },
  {
    year: '2021 - 2023',
    title: 'Brand Manager',
    company: 'Yager Construction Ltd',
    description: 'Developed digital transformation strategy generating 5M+ organic impressions. Created viral brand video achieving 1.4M+ views. Implemented automated media posting system, increasing efficiency by 40%.'
  },
  {
    year: '2016 - Present',
    title: 'Digital Communications Producer',
    company: 'YSMP Media Production',
    description: 'Managed media production projects for 100+ clients. Developed content for Hugo Boss TikTok launch and Pininfarina Battista NA reveal. Official media partner for World Record Setting Hublot Diamond Rally 2019. Built iOS App and implemented automation systems.'
  }
]; 