import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { categories, featuredLinks } from './data';
import ResourceCard from '../../responsive/desktop/resources/resourcesCards/component';

const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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
                      <ResourceCard 
                        key={i}
                        name={resource.name}
                        url={resource.url}
                        description={resource.description}
                      />
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
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Resources;