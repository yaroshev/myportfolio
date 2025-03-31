interface SeoData {
  title: string;
  description: string;
  canonicalUrl: string;
}

interface PageSeoData {
  [key: string]: SeoData;
}

export const pageSeoData: PageSeoData = {
  home: {
    title: 'Yaroslav Shevchenko | Digital Creator & Web Designer',
    description: 'Portfolio of Yaroslav Shevchenko - Digital Creator & Web Designer specializing in modern web experiences, UI/UX design, and creative digital solutions.',
    canonicalUrl: 'https://yaroshev.com/'
  },
  work: {
    title: 'Work & Projects | Yaroslav Shevchenko',
    description: 'Explore the portfolio and projects of Yaroslav Shevchenko, showcasing web design, UI/UX, and digital creation work.',
    canonicalUrl: 'https://yaroshev.com/work'
  },
  about: {
    title: 'About Yaroslav Shevchenko | Digital Creator',
    description: 'Learn about Yaroslav Shevchenko, a digital creator and web designer with expertise in creating modern digital experiences.',
    canonicalUrl: 'https://yaroshev.com/about'
  },
  resources: {
    title: 'Resources | Yaroslav Shevchenko',
    description: 'Useful resources, tools, and insights shared by Yaroslav Shevchenko for web design and digital creation.',
    canonicalUrl: 'https://yaroshev.com/resources'
  }
};

export const getPageSeoData = (activePage: string): SeoData => {
  return pageSeoData[activePage] || pageSeoData.home;
}; 