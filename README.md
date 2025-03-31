# Yaroslav Shevchenko Portfolio

This is the official repository for [yaroshev.com](https://yaroshev.com), the personal portfolio website of Yaroslav Shevchenko, Digital Creator & Web Designer.

## 🚀 Features

- Modern, responsive design with separate desktop and mobile implementations
- Feature-focused architecture with clear separation of concerns
- Optimized for performance and SEO
- Framer Motion animations for engaging user experience
- TailwindCSS for streamlined styling
- TypeScript for type safety and better development experience

## 🛠️ Tech Stack

- React 18 with TypeScript
- Vite for fast development and building
- Framer Motion for smooth animations and transitions
- TailwindCSS for utility-first styling
- React Router DOM for navigation
- React Helmet Async for SEO optimization
- EmailJS for contact form functionality

## 📋 Architecture

The application follows a feature-based architecture with a clear separation between:

1. **Core** - Foundational elements including types, hooks, and configuration
2. **Features** - Feature modules with business logic and data
3. **Responsive** - Device-specific implementations (desktop/mobile)
4. **Shared** - Reusable assets and components

## 📁 Project Structure

```
.
├── config/                 # Configuration files
│   ├── .prettierrc         # Prettier configuration
│   ├── eslint.config.js    # ESLint configuration
│   ├── postcss.config.js   # PostCSS configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── tsconfig.app.json   # TypeScript app configuration
│   ├── tsconfig.node.json  # TypeScript Node configuration
│   └── vite.config.ts      # Vite configuration
│
├── docs/                   # Documentation
│   └── PROJECT_STRUCTURE.md # Detailed project structure
│
├── public/                 # Static files
│   ├── _headers            # Netlify headers configuration
│   ├── _redirects          # Netlify redirects configuration
│   ├── robots.txt          # Robots rules
│   └── sitemap.xml         # Generated sitemap
│
├── scripts/                # Build scripts
│   └── generate-sitemap.cjs # Sitemap generator
│
├── src/                    # Source code
│   ├── core/               # Core application code
│   │   ├── config/         # App configuration
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # Type definitions
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles
│   ├── features/           # Feature modules
│   │   ├── about/          # About page feature
│   │   ├── home/           # Home page feature
│   │   ├── projects/       # Projects feature
│   │   └── resources/      # Resources feature
│   ├── responsive/         # Responsive components
│   │   ├── desktop/        # Desktop-specific components
│   │   └── mobile/         # Mobile-specific components
│   └── shared/             # Shared utilities and assets
│       ├── assets/         # Images and static files
│       ├── components/     # Shared components
│       └── hooks/          # Shared hooks
│
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository (for authorized developers only):
   ```bash
   git clone https://github.com/yourusername/yaroshev.git
   cd yaroshev
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📱 Responsive Design

The website uses a specialized approach to responsive design:

- Device-specific component implementations in `responsive/desktop` and `responsive/mobile`
- Shared components for functionality used across devices
- Media queries in TailwindCSS for fine-tuning responsive behavior

## 🌐 Deployment

This website is deployed using Netlify. All changes pushed to the main branch are automatically deployed.

## 📄 License

This project is proprietary and is not licensed for public use, modification, or distribution. All rights reserved by Yaroslav Shevchenko. See the LICENSE file for details.

## 📞 Contact

Yaroslav Shevchenko - [yaro.shev.3@gmail.com](mailto:yaro.shev.3@gmail.com)

Website: [https://yaroshev.com](https://yaroshev.com) 