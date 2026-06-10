# Deployment Guide: Vercel & MongoDB Atlas

This document outlines the step-by-step deployment procedure for this Next.js 15+ (App Router) authentication system to Vercel and MongoDB Atlas.

---

## 1. MongoDB Atlas Setup

Since the application uses MongoDB as the primary database, you will need a MongoDB Atlas cluster.

1. **Create an Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in.
2. **Deploy a Free Cluster**: Create a new project, and deploy a shared (M0) cluster (Free Tier) in your preferred region.
3. **Database Access**: Create a database user with read and write permissions (e.g. `Read and write to any database`).
4. **Network Access**: Add IP address `0.0.0.0/0` to your IP Access List to allow Vercel serverless functions to connect.
5. **Get Connection String**:
   - Click **Connect** on the Database Deployment page.
   - Choose **Drivers** under Connect to your application.
   - Copy the connection string. Replace `<username>` and `<password>` with your database user credentials.
   - Append your database name (e.g. `/auth?retryWrites=true&w=majority&appName=Cluster0`).

---

## 2. Vercel Deployment

Vercel provides native out-of-the-box support for Next.js 15+ and React 19.

### Step 2.1: Import Project
1. Push your local repository to a remote Git provider (GitHub, GitLab, or Bitbucket).
2. Go to [Vercel Dashboard](https://vercel.com) and click **Add New** -> **Project**.
3. Select your repository and import it.

### Step 2.2: Configure Environment Variables
In the **Environment Variables** accordion, add the following variables:

| Variable Name | Required | Example/Description |
|---|---|---|
| `DATABASE_URL` | **Yes** | `mongodb+srv://user:pass@cluster.mongodb.net/auth?retryWrites=true` |
| `AUTH_SECRET` | **Yes** | Generate using `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_URL` | **No** | Production URL (Vercel automatically maps this, but set it if custom routing is needed) |
| `GOOGLE_CLIENT_ID` | Optional | Google Cloud console OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Optional | Google Cloud console OAuth Client Secret |
| `GITHUB_CLIENT_ID` | Optional | GitHub Developer settings Client ID |
| `GITHUB_CLIENT_SECRET` | Optional | GitHub Developer settings Client Secret |
| `UPSTASH_REDIS_REST_URL` | Optional | Upstash Console Redis URL (for database rate limiting) |
| `UPSTASH_REDIS_REST_TOKEN`| Optional | Upstash Console Redis Token (for database rate limiting) |

### Step 2.3: Build Settings
- **Framework Preset**: Next.js (Automatic)
- **Build Command**: `prisma generate && next build`
- **Output Directory**: `.next`

---

## 3. Post-Deployment Verification

1. Access your Vercel deployment URL.
2. Navigate to `/signup` to register a new credentials user.
3. Verify that:
   - The user document appears in your MongoDB Atlas collections under `User`.
   - The password hashes are stored safely with `bcryptjs`.
   - The dashboard route `/dashboard` is protected, and unauthenticated traffic is redirected to `/login`.
