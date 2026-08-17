# RTL Radio - DemocracyCraft

A modern web application for RTL Radio, DemocracyCraft's premier radio station. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Homepage**: Company description, Discord integration, and latest news
- **Info Page**: Planned broadcasts with timezone-adapted schedules
- **Advertisement System**: User-submitted advertisements with Discord OAuth authentication
- **Job Applications**: Career opportunities and application forms
- **Reviews System**: Community feedback and ratings
- **TreasuryAPI Integration**: Secure payment processing through DemocracyCraft's treasury system
- **Discord OAuth**: Secure authentication using Discord OAuth2
- **Modern Design**: Red and black color scheme matching the radio station's branding

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Discord OAuth
- **API Integration**: Axios for TreasuryAPI communication
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Discord Developer Portal account (for OAuth credentials)
- DemocracyCraft TreasuryAPI access

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rtl-radio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your credentials:
```env
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:3000/api/auth/callback
TREASURYAPI_KEY=your_treasuryapi_key
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
NEXTAUTH_URL=http://localhost:3000
```

5. Generate a secure NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Security Features

- Environment variable protection for sensitive credentials
- Discord OAuth2 for secure user authentication
- HTTPS required for production (OAuth redirect URIs)
- Input validation and sanitization
- CSRF protection via NextAuth.js
- Secure API key management for TreasuryAPI
- File upload restrictions for screenshots
- Rate limiting ready for API endpoints

## Discord OAuth Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Configure OAuth2 redirect URI: `http://localhost:3000/api/auth/callback`
4. Copy Client ID and Client Secret to your `.env` file
5. For production, add your production domain as an authorized redirect URI

## TreasuryAPI Integration

The application integrates with DemocracyCraft's TreasuryAPI for:
- Advertisement payment processing
- User balance checking
- Payment status tracking
- Refund processing (admin functions)

## Project Structure

```
rtl-radio/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts       # NextAuth configuration
│   ├── advertise/
│   │   └── page.tsx              # Advertisement submission page
│   ├── globals.css               # Global styles
│   ├── info/
│   │   └── page.tsx              # Broadcast schedule page
│   ├── jobs/
│   │   └── page.tsx              # Job application page
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Homepage
│   └── reviews/
│       └── page.tsx              # Reviews page
├── lib/
│   ├── providers.tsx             # Session provider
│   └── treasuryapi.ts            # TreasuryAPI client
├── .env                          # Environment variables (not in git)
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to update these for production:
- `DISCORD_REDIRECT_URI`: Your production domain
- `NEXTAUTH_URL`: Your production domain with https
- `NEXTAUTH_SECRET`: Strong secret generated in production

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

The application is designed to be easily extensible. To add new features:

1. Create a new page in the `app/` directory
2. Add navigation links to existing pages
3. Integrate with TreasuryAPI if payment processing is needed
4. Follow the existing red and black color scheme

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is proprietary software for DemocracyCraft.

## Support

For support, join our Discord server or contact the development team.

## Security Considerations

- Never commit `.env` file to version control
- Rotate API keys regularly
- Use strong, unique secrets
- Enable HTTPS in production
- Implement rate limiting for API endpoints
- Regular security audits
- Keep dependencies updated
- Monitor for security vulnerabilities

## Future Enhancements

Potential features that can be added:
- Live radio streaming integration
- User profiles and dashboards
- Advanced analytics and reporting
- Mobile app development
- Podcast archive
- Community forum integration
- Advanced payment options
- Admin dashboard for content management
