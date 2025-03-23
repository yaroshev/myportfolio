import etronImage from '../../assets/etron.png';
import pininfarinaImage from '../../assets/pininfarina.png';
import hydroforceImage from '../../assets/hydroforce.png';
import rkmImage from '../../assets/rkm.png';
import { Project, VideoProject, Filter } from './types';

export const filters: Filter[] = [
  { id: 'video', label: 'Video & Live', description: '1000+ videos produced' },
  { id: 'web', label: 'Digital Marketing', description: '10M+ social reach' },
  { id: 'webdesign', label: 'Web Design', description: 'Modern web experiences' },
  { id: 'ai', label: 'AI & Automation', description: '15+ AI solutions' },
  { id: 'all', label: 'All Projects', description: '8+ years of digital innovation' }
];

export const featuredVideos: VideoProject[] = [
  {
    title: 'Pininfarina Battista',
    category: 'Automotive',
    description: 'Exclusive coverage of the Pininfarina Battista hyper GT, showcasing this revolutionary electric hypercar with cinematic videography.',
    tags: ['Automotive', 'Luxury', 'Event Coverage'],
    metrics: { views: '250K+', engagement: '18%', reach: '400K+' },
    image: pininfarinaImage,
    color: 'from-primary-500/10 to-accent-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=0LHX2jUvutc'
  },
  {
    title: 'Audi e-tron',
    category: 'Automotive',
    description: 'Dynamic showcase of the all-electric Audi e-tron, highlighting its innovative features and performance capabilities through compelling visual storytelling.',
    tags: ['Automotive', 'Electric Vehicles', 'Commercial'],
    metrics: { views: '180K+', engagement: '15%', reach: '320K+' },
    image: etronImage,
    color: 'from-accent-500/10 to-primary-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=E9vsUKmagRA'
  },
  {
    title: 'RKM Cranes',
    category: 'Industrial',
    description: 'Spectacular footage of a house lift using a 160-ton crane, showcasing the precision and power of heavy machinery in action.',
    tags: ['Industrial', 'Construction', 'Viral Content'],
    metrics: { views: '1.5M+', engagement: '22%', reach: '3M+' },
    image: rkmImage,
    color: 'from-primary-500/10 to-accent-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=9n86xwm6MxE&t=3s'
  },
  {
    title: 'Hydroforce Excavating',
    category: 'Construction',
    description: 'Professional promotional video for Hydroforce Excavating, highlighting their expertise in excavation services with compelling visual storytelling.',
    tags: ['Construction', 'Promotional', 'Corporate'],
    metrics: { views: '75K+', engagement: '14%', reach: '150K+' },
    image: hydroforceImage,
    color: 'from-accent-500/10 to-primary-500/10',
    videoUrl: 'https://www.youtube.com/watch?v=jogaasTnlwU'
  }
];

export const projects: Project[] = [
  // Featured video projects
  {
    id: 101,
    title: 'Pininfarina Battista',
    category: 'video',
    description: 'Spearheaded the North American reveal of Pininfarina\'s groundbreaking Battista hypercar, producing captivating content that highlighted the vehicle\'s innovative features and luxurious design. Created a multi-platform content strategy that generated significant engagement across social media channels.',
    image: pininfarinaImage,
    year: '2023',
    client: 'Pininfarina',
    services: ['Automotive', 'Luxury', 'Event Coverage', 'Cinematography', 'Social Media Content'],
    stats: ['250K+ Views', '18% Engagement', '400K+ Reach'],
    color: 'from-blue-500 to-cyan-500',
    accentColor: 'rgba(59, 130, 246, 0.1)',
    website: 'https://www.youtube.com/watch?v=0LHX2jUvutc'
  },
  {
    id: 102,
    title: 'Audi e-tron',
    category: 'video',
    description: 'Dynamic showcase of the all-electric Audi e-tron, highlighting its innovative features and performance capabilities through compelling visual storytelling.',
    image: etronImage,
    year: '2022',
    client: 'Audi',
    services: ['Automotive', 'Electric Vehicles', 'Commercial'],
    stats: ['180K+ Views', '15% Engagement', '320K+ Reach'],
    color: 'from-gray-500 to-zinc-500',
    accentColor: 'rgba(161, 161, 170, 0.1)',
    website: 'https://www.youtube.com/watch?v=E9vsUKmagRA'
  },
  {
    id: 103,
    title: 'RKM Cranes',
    category: 'video',
    description: 'Spectacular footage of a house lift using a 160-ton crane, showcasing the precision and power of heavy machinery in action.',
    image: rkmImage,
    year: '2023',
    client: 'RKM Cranes',
    services: ['Industrial', 'Construction', 'Viral Content'],
    stats: ['1.5M+ Views', '22% Engagement', '3M+ Reach'],
    color: 'from-violet-500 to-purple-500',
    accentColor: 'rgba(139, 92, 246, 0.1)',
    website: 'https://www.youtube.com/watch?v=9n86xwm6MxE&t=3s'
  },
  {
    id: 104,
    title: 'Hydroforce Excavating',
    category: 'video',
    description: 'Professional promotional video for Hydroforce Excavating, highlighting their expertise in excavation services with compelling visual storytelling.',
    image: hydroforceImage,
    year: '2022',
    client: 'Hydroforce Excavating',
    services: ['Construction', 'Promotional', 'Corporate'],
    stats: ['75K+ Views', '14% Engagement', '150K+ Reach'],
    color: 'from-amber-500 to-red-500',
    accentColor: 'rgba(245, 158, 11, 0.1)',
    website: 'https://www.youtube.com/watch?v=jogaasTnlwU'
  },
  {
    id: 1,
    title: 'Wildwood Digital Transformation',
    category: 'web',
    description: 'Led a comprehensive digital transformation initiative for Wildwood Outdoor Living Center, implementing an innovative email marketing system reaching 30,000 weekly recipients. The project included video integration that boosted conversion rates by 33% on their Shopify store and established their first revenue-generating YouTube channel.',
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    year: '2024',
    client: 'Wildwood Outdoor Living Center',
    services: ['Email Marketing', 'Video Production', 'Social Media Strategy', 'Analytics'],
    stats: ['30K Weekly Recipients', '33% Conversion Increase', '1M+ Organic Reach'],
    color: 'from-emerald-500 to-blue-500',
    accentColor: 'rgba(16, 185, 129, 0.1)'
  },
  {
    id: 2,
    title: 'Symphony at Vancouver Orpheum',
    category: 'video',
    description: 'Produced and directed multi-camera live streaming of prestigious symphony performances at the Vancouver Orpheum. Managed complex camera systems, graphics, and sound boards for seamless broadcast delivery, ensuring high-quality production values and engaging viewer experience.',
    image: 'https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    year: '2023',
    client: 'Roll.Focus Productions',
    services: ['Live Streaming', 'Multi-Camera Direction', 'Sound Engineering', 'Technical Direction'],
    stats: ['4K Broadcast', 'Multi-Camera Setup', 'Real-time Graphics'],
    color: 'from-purple-500 to-pink-500',
    accentColor: 'rgba(168, 85, 247, 0.1)'
  },
  {
    id: 3,
    title: 'Yager Construction Brand Evolution',
    category: 'web',
    description: 'Spearheaded a digital transformation strategy that established Yager Construction\'s complete online presence. Created and implemented viral marketing campaigns that generated over 5 million organic impressions, significantly enhancing brand recognition and market position.',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    year: '2023',
    client: 'Yager Construction Ltd',
    services: ['Brand Strategy', 'Content Creation', 'Social Media Management', 'Automation'],
    stats: ['5M+ Impressions', '1.4M+ Viral Views', '40% Efficiency Increase'],
    color: 'from-amber-500 to-red-500',
    accentColor: 'rgba(245, 158, 11, 0.1)'
  },
  {
    id: 4,
    title: 'Hugo Boss TikTok Launch',
    category: 'video',
    description: 'Conceptualized and produced the launch campaign for Hugo Boss\'s TikTok channel, creating engaging content that resonated with the platform\'s audience while maintaining the brand\'s luxury positioning. Developed a comprehensive content strategy that ensured consistent engagement and growth.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
    year: '2022',
    client: 'Hugo Boss',
    services: ['Social Media Strategy', 'Video Production', 'Content Creation', 'Brand Development'],
    stats: ['Platform Launch', 'Luxury Branding', 'Viral Content'],
    color: 'from-gray-500 to-zinc-500',
    accentColor: 'rgba(161, 161, 170, 0.1)'
  },
  {
    id: 6,
    title: 'Hublot Diamond Rally Coverage',
    category: 'video',
    description: 'Served as the official media partner for the World Record Setting Hublot Diamond Rally in 2019. Utilized advanced drone technology and ground cameras to capture the epic scale of this prestigious event, creating compelling content that showcased both the luxury vehicles and the spectacular Canadian landscape.',
    image: 'https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    year: '2019',
    client: 'Hublot Diamond Rally',
    services: ['Drone Operations', 'Event Coverage', 'Multi-Camera Production', 'Post-Production'],
    stats: ['World Record Event', 'Aerial Coverage', 'Luxury Automotive'],
    color: 'from-violet-500 to-purple-500',
    accentColor: 'rgba(139, 92, 246, 0.1)'
  },
  {
    id: 7,
    title: 'AI-Powered Content Automation',
    category: 'ai',
    description: 'Developed an AI-powered content automation system that streamlined the creation and distribution of marketing materials. The system leverages machine learning algorithms to analyze engagement metrics and optimize content performance, resulting in a 40% increase in efficiency.',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813028c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2232&q=80',
    year: '2023',
    client: 'Various Clients',
    services: ['AI Integration', 'Workflow Automation', 'Content Strategy', 'System Design'],
    stats: ['40% Efficiency Gain', '15+ AI Agents', 'Multi-platform'],
    color: 'from-green-500 to-emerald-500',
    accentColor: 'rgba(16, 185, 129, 0.1)'
  },
  {
    id: 8,
    title: 'Drone Cinematography Portfolio',
    category: 'video',
    description: 'Accumulated over 1000 hours of professional drone flight experience, capturing breathtaking aerial footage for various high-profile clients and events. Specialized in complex flight operations and cinematic techniques to create stunning visual content.',
    image: 'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1829&q=80',
    year: '2016-2025',
    client: 'Multiple Clients',
    services: ['Drone Operations', 'Aerial Photography', 'Cinematography', 'Post-Production'],
    stats: ['1000+ Flight Hours', 'Licensed Pilot', 'High-Profile Events'],
    color: 'from-sky-500 to-indigo-500',
    accentColor: 'rgba(56, 189, 248, 0.1)'
  },
  {
    id: 9,
    title: 'Fidgeteer',
    category: 'webdesign',
    description: 'Designed and developed an interactive web experience for Fidgeteer, focusing on clean aesthetics and engaging user interactions. The site features smooth animations and a minimalist design approach that highlights content while maintaining excellent performance.',
    image: 'https://api.microlink.io?url=https://fidgeteer.netlify.app&screenshot=true&meta=false&embed=screenshot.url',
    fallbackImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    website: 'https://fidgeteer.netlify.app/',
    year: '2025',
    client: 'Fidgeteer',
    services: ['UI/UX Design', 'Frontend Development', 'Interactive Elements', 'Performance Optimization'],
    stats: ['Fast Load Time', 'Interactive UI', 'Minimalist Design'],
    color: 'from-blue-400 to-indigo-400',
    accentColor: 'rgba(96, 165, 250, 0.1)'
  },
  {
    id: 10,
    title: 'Domum Improvements',
    category: 'webdesign',
    description: 'Created a modern, professional website for Domum Improvements home improvement services. The design emphasizes clarity and trust while showcasing their portfolio of work through a clean, accessible interface that converts visitors into clients.',
    image: 'https://api.microlink.io?url=https://domumimpro.netlify.app&screenshot=true&meta=false&embed=screenshot.url',
    fallbackImage: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    website: 'https://domumimpro.netlify.app/',
    year: '2025',
    client: 'Domum Improvements',
    services: ['Web Design', 'Content Strategy', 'Responsive Layout', 'Portfolio Showcase'],
    stats: ['Conversion-Focused', 'Portfolio Showcase', 'Professional Design'],
    color: 'from-emerald-400 to-teal-400',
    accentColor: 'rgba(52, 211, 153, 0.1)'
  },
  {
    id: 11,
    title: 'Torrell Homes',
    category: 'webdesign',
    description: 'Designed and developed a professional website for Torrell Homes, a Victoria-based construction company. The site showcases their custom home building, garden suites, and renovation services with a clean, modern design that emphasizes their family-operated business values and quality craftsmanship.',
    image: 'https://api.microlink.io?url=https://www.torrellhomes.ca&screenshot=true&meta=false&embed=screenshot.url',
    fallbackImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    website: 'https://www.torrellhomes.ca/',
    year: '2023',
    client: 'Torrell Homes',
    services: ['Construction Website', 'Service Showcase', 'Responsive Design', 'Brand Development'],
    stats: ['Family Business', 'Victoria, BC', 'Custom Homes'],
    color: 'from-amber-400 to-orange-400',
    accentColor: 'rgba(251, 191, 36, 0.1)'
  },
  {
    id: 12,
    title: 'YSMP',
    category: 'webdesign',
    description: 'Designed and developed a portfolio website for YSMP Media Production, showcasing their video production services and creative work. The site features a clean, professional design with a focus on visual content and easy navigation.',
    image: 'https://api.microlink.io?url=https://ysmp.ca&screenshot=true&meta=false&embed=screenshot.url',
    fallbackImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    website: 'https://ysmp.ca/',
    year: '2025',
    client: 'YSMP Media Production',
    services: ['Portfolio Website', 'Video Showcase', 'Responsive Design', 'Brand Identity'],
    stats: ['Media Production', 'Portfolio Showcase', 'Professional Design'],
    color: 'from-blue-500 to-indigo-500',
    accentColor: 'rgba(59, 130, 246, 0.1)'
  }
]; 