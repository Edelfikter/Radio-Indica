# Radio-Indica

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- PostgreSQL Database
- Vercel Account

### Environment Variables

Create a `.env` file in the root of your project and add the following variables:

```plaintext
DATABASE_URL=your_postgres_connection_string
VERCEL_KV_URL=your_upstash_url
VERCEL_KV_TOKEN=your_upstash_token
```

### Deployment Steps
1. Push your code to GitHub.
2. Connect your GitHub repository to Vercel.
3. Configure environment variables in Vercel settings.
4. Deploy your application.
```

## Project Structure

- `app/` - Contains the app pages and components.
- `pages/api/` - Contains the API routes for auth, stations, and tracks.
- `prisma/` - Contains Prisma schema files.

## Features
- User authentication with login/signup pages.
- Globe visualization focused on India with drag-to-rotate functionality.
- Station creation and management through a modal interface.
- API routes to handle CRUD operations for stations and tracks.