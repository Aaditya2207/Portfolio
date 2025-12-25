# Portfolio Website

This is a portfolio website built with Next.js and Tailwind CSS. It showcases your skills, projects, and achievements in an elegant and responsive design.

## Installation

1. Clone the repository: `git clone https://github.com/judygab/nextjs-portfolio.git`
2. Navigate to the project directory: `cd portfolio-website`
3. Install the dependencies: `npm install`

## Usage

1. Start the development server: `npm run dev`
2. Open your browser and visit `http://localhost:3000` to view the website.

## Environment Variables Setup

**IMPORTANT: Before deploying to production, you must configure environment variables.**

Create a `.env.local` file in the root directory with the following variables:

```env
# Resend API Configuration
# Get your API key from https://resend.com/api-keys
RESEND_API_KEY=re_your_api_key_here

# Email Configuration
# The email address where you want to receive portfolio messages
RESEND_TO_EMAIL=your-email@example.com

# Optional: Custom "from" email address
# Must be verified in your Resend account
# RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Getting Your Resend API Key:
1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Copy the key and add it to `.env.local`

### For Production Deployment (Vercel):

1. **Go to your Vercel project dashboard**
2. **Navigate to**: Settings → Environment Variables
3. **Add these three variables**:
   - `RESEND_API_KEY` = `re_your_actual_api_key_here` (get from resend.com)
   - `RESEND_TO_EMAIL` = `aadityak22@outlook.com` (your email address)
   - `RESEND_FROM_EMAIL` = `onboarding@resend.dev` (optional, or your verified domain email)
4. **Select environment**: Choose "Production", "Preview", and "Development" (or just Production)
5. **Click "Save"**
6. **Redeploy your application** (Vercel will automatically redeploy when you save env vars, or you can manually redeploy)

**Important Notes:**
- After adding environment variables, you MUST redeploy for changes to take effect
- Make sure there are no extra spaces when copying the API key
- The API key should start with `re_`
- Never commit `.env.local` or any `.env` files to Git!

### For Other Platforms:
- **Netlify**: Add in Site Settings → Environment Variables
- **Other platforms**: Add environment variables in your hosting platform's dashboard

## Dependencies

The following dependencies are required for this project:

- Next.js: A React framework for server-side rendering and static site generation.
- Tailwind CSS: A highly customizable CSS framework.
- React: A JavaScript library for building user interfaces.
- React Icons: A collection of popular icons for React projects.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Resend: Resend is the email API for developers.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

