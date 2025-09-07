# Portfolio Website

This is a modern portfolio website built with Next.js, utilizing the App Router and styled with Tailwind CSS. The site is automatically deployed to GitHub Pages through GitHub Actions.

## 🚀 Features

- Modern, responsive design
- Dark/Light mode support
- Sections for About, Experience, Skills, Portfolio, and Contact
- Automated deployment to GitHub Pages
- Built with Next.js 14 and TypeScript
- Styled using Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [PNPM](https://pnpm.io/) - Package manager

## 💻 Local Development

### Prerequisites

- Node.js (v20 or later)
- PNPM (v9 or later)

### Setting Up Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/malla-aayush/malla-aayush.github.io.git
   cd malla-aayush.github.io
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

To create a production build:

```bash
pnpm build
```

The static output will be generated in the `out` directory.

## 🚀 Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment process:

1. Builds the Next.js application
2. Generates static files
3. Deploys to GitHub Pages

You can monitor the deployment status in the Actions tab of the repository.

## 📝 Making Changes

1. Create a new branch for your changes
2. Make your changes
3. Test locally using `pnpm dev`
4. Commit and push your changes
5. Create a Pull Request to the main branch

## 📄 License

This project is open source and available under the MIT License.
