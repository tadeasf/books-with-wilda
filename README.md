# Books with Ztracena Cackorka

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Auth0](https://img.shields.io/badge/Auth0-Authentication-orange?style=flat-square&logo=auth0)](https://auth0.com/)
[![Directus](https://img.shields.io/badge/Directus-CMS-blue?style=flat-square)](https://directus.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38b2ac?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

A modern web platform for book lovers to share, discover, and track their reading journey.

## ✅ Todo Checklist

- [x] Set up Next.js App Router structure
- [x] Implement Auth0 authentication
- [x] Create responsive UI with TailwindCSS and shadcn/ui
- [x] Integrate Directus CMS for blog and forms
- [x] Implement dark/light theme switching
- [x] Add social features (forum)
- [ ] Implement stripe as payment gateway
- [ ] Implement connection between auth0 - landing app - directus - forum - stripe
- [ ] Add book tracking functionality
- [ ] Create user reading lists
- [ ] Develop book recommendation system
- [ ] Add book review system
- [ ] Implement notification system - smtp emailing
- [ ] Refine form handling
- [ ] Include open source event based web analytics
- [ ] Setup CI/CD pipeline

## 📋 Table of Contents

- [🔧 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔑 Environment Variables](#-environment-variables)
- [💡 Key Features](#-key-features)
- [🔐 Authentication](#-authentication)
- [📝 Forms and API](#-forms-and-api)
- [🎨 Theming](#-theming)
- [🛣️ Roadmap](#️-roadmap)
- [👨‍💻 Contributing](#-contributing)

## 🔧 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Auth0](https://auth0.com/)
- **CMS**: [Directus](https://directus.io/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **UI Libraries**: [Lucide Icons](https://lucide.dev/), [sonner](https://sonner.emilkowal.ski/)

## 📁 Project Structure

```markdown
src/
├── app/                  # App Router pages and layouts
│   ├── about/            # About page
│   ├── api/              # API routes
│   ├── auth/             # Auth0 routes
│   ├── dashboard/        # User dashboard (protected)
│   ├── profile/          # User profile (protected)
│   └── layout.tsx        # Root layout with providers
├── components/           # UI components
│   ├── auth/             # Authentication components
│   ├── forms/            # Form components
│   ├── header/           # Navigation components
│   ├── theme/            # Theme components
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── auth0.ts          # Auth0 configuration
│   ├── directus.ts       # Directus client setup
│   └── utils.ts          # Helper functions
└── middleware.ts         # Next.js middleware for auth
```

## 🚀 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/books-with-wilda.git
cd books-with-wilda
```

1. **Install dependencies**

```bash
npm install
# or
yarn install
# or 
pnpm install
```

1. **Set up environment variables**

Create a `.env.local` file in the root directory (see [Environment Variables](#-environment-variables) section).

1. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

1. **Open [http://localhost:3000](http://localhost:3000)** with your browser to see the result.

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Auth0 Configuration
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
APP_BASE_URL=http://localhost:3000

# Directus Configuration
DIRECTUS_PUBLIC_URL=https://your-directus-instance.com
NEXT_DIRECTUS_STATIC_TOKEN=your-directus-token

# Email Configuration
EMAIL_HOST=mail.yourdomain.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USERNAME=your-email-username
EMAIL_PASSWORD=your-email-password
EMAIL_FROM=books@yourdomain.com

# Forum URL
NEXT_PUBLIC_FORUM_URL=https://books.forum.yourdomain.com
```

## 💡 Key Features

- **Authentication**: Secure user authentication with Auth0
- **Content Management**: Blog and content managed through Directus CMS
- **Responsive Design**: Mobile-first design approach with TailwindCSS
- **Form Management**: Multiple form types with validation
- **Dark/Light Theme**: Theme support with system preference detection
- **Middleware Protection**: Route protection for authenticated areas
- **API Routes**: Server-side API endpoints for form processing and notifications

## 🔐 Authentication

Authentication is implemented using Auth0. The middleware (`middleware.ts`) protects routes that require authentication:

- `/dashboard/*`
- `/profile/*`

When a user tries to access these routes without authentication, they are redirected to the login page, and after successful login, they are redirected back to the originally requested page.

## 📝 Forms and API

The application has three types of forms, all connected to Directus:

1. **Contact Us Form**: For general inquiries
1. **Newsletter Form**: For newsletter subscriptions
1. **User Feedback Form**: For collecting user feedback

Form submissions are stored in Directus and can trigger email notifications via the `/api/send-notification` endpoint.

## 🎨 Theming

The application supports light and dark themes using `next-themes`. Theme preferences are persisted in local storage and can be changed via the theme toggle in the header.

## 🛣️ Roadmap

| Feature | Description | Timeline | Status |
|---------|-------------|----------|--------|
| **📚 Personal Library** | Allow users to create and manage their personal book collection | Q1 2024 | 🔄 In Progress |
| **⭐ Rating System** | Implement a star-based rating system for books | Q1 2024 | 🔄 In Progress |
| **🔍 Advanced Search** | Add advanced search with filters by genre, author, and rating | Q2 2024 | 📅 Planned |
| **📱 Mobile App** | Develop native mobile applications for iOS and Android | Q2 2024 | 📅 Planned |
| **👥 Social Features** | Add friend connections, followers, and social sharing | Q3 2024 | 🔮 Future |
| **💬 Book Discussions** | Create discussion forums for specific books and reading groups | Q3 2024 | 🔮 Future |
| **📊 Reading Analytics** | Provide insights into reading habits and achievements | Q4 2024 | 🔮 Future |
| **📚 Reading Challenges** | Set up reading challenges and goals with progress tracking | Q4 2024 | 🔮 Future |
| **🤖 AI Recommendations** | Implement AI-powered book recommendations | Q1 2025 | 🌟 Vision |
| **📖 Book Clubs** | Virtual book clubs with scheduled reading and discussions | Q1 2025 | 🌟 Vision |

## 👨‍💻 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
1. Create a new branch (`git checkout -b feature/amazing-feature`)
1. Make your changes
1. Commit your changes (`git commit -m 'Add some amazing feature'`)
1. Push to the branch (`git push origin feature/amazing-feature`)
1. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by [Your Name/Team]
