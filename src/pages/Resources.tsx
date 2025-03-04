import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    {
      id: 'web',
      title: 'Web Design Resources',
      resources: [
        { name: 'Design System Framework', url: '#', description: 'A comprehensive design system for creating consistent web interfaces.' },
        { name: 'Color Palette Generator', url: '#', description: 'Tool for creating harmonious color schemes for web projects.' },
        { name: 'Typography Guide', url: '#', description: 'Best practices for web typography and font pairing.' },
        { name: 'UI Component Library', url: '#', description: 'Collection of reusable UI components for modern web applications.' }
      ]
    },
    {
      id: 'video',
      title: 'Video Production Tools',
      resources: [
        { name: 'Video Editing Workflow', url: '#', description: 'Optimized workflow for efficient video editing and production.' },
        { name: 'Color Grading Presets', url: '#', description: 'Professional color grading presets for various video styles.' },
        { name: 'Sound Effects Library', url: '#', description: 'Curated collection of sound effects for video production.' },
        { name: 'Motion Graphics Templates', url: '#', description: 'Ready-to-use motion graphics templates for video projects.' }
      ]
    },
    {
      id: 'dev',
      title: 'Development Tools',
      resources: [
        { name: 'Frontend Starter Kit', url: '#', description: 'Boilerplate code for quickly starting new frontend projects.' },
        { name: 'API Documentation Template', url: '#', description: 'Template for creating clear and comprehensive API documentation.' },
        { name: 'Performance Optimization Guide', url: '#', description: 'Best practices for optimizing web application performance.' },
        { name: 'Accessibility Checklist', url: '#', description: 'Comprehensive checklist for ensuring web accessibility.' }
      ]
    },
    {
      id: 'ai',
      title: 'AI & Automation',
      resources: [
        { name: 'AI Integration Guide', url: '#', description: 'Guide for integrating AI capabilities into web applications.' },
        { name: 'Workflow Automation Scripts', url: '#', description: 'Collection of scripts for automating repetitive tasks.' },
        { name: 'NLP Implementation Examples', url: '#', description: 'Examples of natural language processing implementations.' },
        { name: 'AI Model Training Resources', url: '#', description: 'Resources for training custom AI models for specific use cases.' }
      ]
    },
    {
      id: 'drone',
      title: 'Drone Photography',
      resources: [
        { name: 'Drone Shot Planning Guide', url: '#', description: 'Guide for planning and executing professional drone shots.' },
        { name: 'Aerial Photography Settings', url: '#', description: 'Optimal camera settings for various aerial photography scenarios.' },
        { name: 'Location Scouting Checklist', url: '#', description: 'Checklist for scouting and preparing drone filming locations.' },
        { name: 'Post-Processing Workflow', url: '#', description: 'Workflow for processing and enhancing aerial footage.' }
      ]
    },
    {
      id: 'business',
      title: 'Business Resources',
      resources: [
        { name: 'Client Onboarding Template', url: '#', description: 'Template for smoothly onboarding new clients.' },
        { name: 'Project Proposal Framework', url: '#', description: 'Framework for creating compelling project proposals.' },
        { name: 'Digital Marketing Strategy', url: '#', description: 'Strategy guide for effective digital marketing.' },
        { name: 'Remote Team Management', url: '#', description: 'Best practices for managing remote creative teams.' }
      ]
    }
  ];

  const featuredLinks = [
    { name: 'Personal YouTube Channel', url: '#' },
    { name: 'Design Portfolio', url: '#' },
    { name: 'GitHub Repository', url: '#' },
    { name: 'Industry Blog', url: '#' }
  ];

  // Filter resources based on search query and active category
  const filteredCategories = categories
    .filter(category => activeCategory === 'all' || category.id === activeCategory)
    .map(category => ({
      ...category,
      resources: category.resources.filter(resource => 
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        resource.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => category.resources.length > 0);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
            Resources
          </span>
        </h1>
        <p className="text-neutral-400 max-w-3xl mb-16">
          A curated collection of resources, tools, and links that I've found valuable in my work. Feel free to explore and use these resources for your own projects.
        </p>
        
        {/* Search and Filter */}
        <div className="mb-16 flex flex-col md:flex-row gap-6 md:items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border border-neutral-800 rounded-lg py-3 px-4 text-neutral-300 focus:outline-none focus:border-neutral-600 transition-colors duration-300"
            />
          </div>
          
          <div className="flex overflow-x-auto pb-2 -mx-2 px-2 md:pb-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`text-sm tracking-wider uppercase whitespace-nowrap px-4 py-2 rounded-full transition-colors duration-300 mr-3 ${
                activeCategory === 'all'
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'text-neutral-400 hover:text-neutral-200 border border-neutral-800'
              }`}
            >
              All
            </button>
            
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`text-sm tracking-wider uppercase whitespace-nowrap px-4 py-2 rounded-full transition-colors duration-300 mr-3 ${
                  activeCategory === category.id
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                {category.id.charAt(0).toUpperCase() + category.id.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured Links */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
              Featured Links
            </span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url}
                className="border border-neutral-800 rounded-lg p-6 backdrop-blur-sm bg-neutral-900/20 hover:bg-neutral-800/30 transition-all duration-500 flex items-center justify-between"
              >
                <span className="text-neutral-300">{link.name}</span>
                <ExternalLink className="w-4 h-4 text-neutral-500" />
              </a>
            ))}
          </div>
        </section>
        
        {/* Resource Categories */}
        <section>
          {filteredCategories.length > 0 ? (
            <div className="space-y-16">
              {filteredCategories.map((category, index) => (
                <div key={index}>
                  <h2 className="text-xl font-light mb-6">{category.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.resources.map((resource, i) => (
                      <a 
                        key={i} 
                        href={resource.url}
                        className="border border-neutral-800 rounded-lg p-6 backdrop-blur-sm bg-neutral-900/20 hover:bg-neutral-800/30 transition-all duration-500 group"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-light mb-2 group-hover:text-neutral-100 transition-colors duration-300">
                            {resource.name}
                          </h3>
                          <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300" />
                        </div>
                        <p className="text-neutral-400 text-sm">{resource.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-neutral-400 mb-4">No resources found matching your search criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-sm tracking-wider uppercase px-4 py-2 border border-neutral-700 rounded-full hover:bg-neutral-800 transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Resources;