# Insurance Recommendation Tool

A modern, responsive web application built with Next.js and TypeScript that provides personalized insurance recommendations based on user input.

## Features

- **Single-page form** that collects user information:

  - Age (18-80 years)
  - Annual Income ($20,000+)
  - Number of Dependents (0-10)
  - Risk Tolerance (Low/Medium/High)

- **Personalized recommendations** including:

  - Insurance type (Term Life or Whole Life)
  - Coverage amount (calculated based on income, dependents, and risk profile)
  - Policy duration (15, 20, or 30 years)
  - Detailed explanation of the recommendation

- **Clean, responsive design** using Tailwind CSS
- **TypeScript** for type safety and better development experience
- **Modern UI** with smooth transitions and intuitive user experience

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState)
- **Build Tool**: Vite (via Next.js)
- **Backend**: Node.js/Express API
- **Database**: PostgreSQL 15

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- PostgreSQL 15 (or Docker for database)

### Full-Stack Setup

This frontend is part of a full-stack application. For complete setup:

1. **Start the database** (from project root):

   ```bash
   docker-compose up postgres -d
   ```

2. **Start the backend** (from project root):

   ```bash
   cd backend && npm run dev
   ```

3. **Start the frontend** (from this directory):
   ```bash
   npm run dev
   ```

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## How It Works

### Recommendation Algorithm

The application uses a sophisticated algorithm to generate personalized insurance recommendations:

1. **Base Coverage**: 10x annual income
2. **Dependent Adjustment**: +$250,000 per dependent
3. **Age Adjustment**:
   - Under 30: +20% coverage
   - Over 50: -20% coverage
4. **Risk Tolerance Adjustment**:
   - Low: 80% coverage, 15-year term
   - Medium: 100% coverage, 20-year term
   - High: 130% coverage, 30-year whole life

### User Interface

The application features a clean, intuitive interface with:

- **Form View**: Collects user information with validation
- **Recommendation View**: Displays personalized results with explanation
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Proper labels, focus states, and semantic HTML

## Project Structure

```
frontend/
├── src/
│   └── app/
│       ├── page.tsx          # Main application component
│       ├── layout.tsx        # Root layout with metadata
│       └── globals.css       # Global styles
├── public/                   # Static assets
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Customization

### Modifying the Recommendation Algorithm

The recommendation logic is located in the `generateRecommendation` function in `src/app/page.tsx`. You can adjust:

- Base coverage multipliers
- Age-based adjustments
- Risk tolerance factors
- Policy duration logic

### Styling

The application uses Tailwind CSS for styling. You can customize:

- Colors in `tailwind.config.js`
- Component styles in the JSX classes
- Global styles in `src/app/globals.css`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform that supports Next.js:

```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue in the repository.
