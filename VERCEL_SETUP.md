# Vercel Environment Variables Setup Guide

## ⚠️ IMPORTANT: Fix "Email service configuration error"

This error means your environment variables are not set in Vercel. Follow these steps:

## Step-by-Step Instructions

### 1. Go to Vercel Dashboard
- Open [vercel.com](https://vercel.com)
- Log in to your account
- Select your portfolio project

### 2. Navigate to Environment Variables
- Click on your project
- Go to **Settings** (top menu)
- Click **Environment Variables** (left sidebar)

### 3. Add Required Variables

Add these **3 environment variables** one by one:

#### Variable 1: RESEND_API_KEY
- **Key**: `RESEND_API_KEY`
- **Value**: Your Resend API key (starts with `re_`)
- **Environment**: Select all three: ☑ Production, ☑ Preview, ☑ Development
- Click **Save**

#### Variable 2: RESEND_TO_EMAIL
- **Key**: `RESEND_TO_EMAIL`
- **Value**: `aadityak22@outlook.com`
- **Environment**: Select all three: ☑ Production, ☑ Preview, ☑ Development
- Click **Save**

#### Variable 3: RESEND_FROM_EMAIL (Optional)
- **Key**: `RESEND_FROM_EMAIL`
- **Value**: `onboarding@resend.dev`
- **Environment**: Select all three: ☑ Production, ☑ Preview, ☑ Development
- Click **Save**

### 4. Get Your Resend API Key

If you don't have a Resend API key:

1. Go to [resend.com](https://resend.com)
2. Sign up or log in
3. Go to **API Keys** section
4. Click **Create API Key**
5. Give it a name (e.g., "Portfolio")
6. Copy the key (it starts with `re_`)
7. **Important**: Copy it immediately - you won't see it again!

### 5. Redeploy Your Application

**CRITICAL STEP**: After adding environment variables, you MUST redeploy:

**Option A: Automatic Redeploy**
- Vercel usually auto-redeploys when you save env vars
- Wait 1-2 minutes and check if a new deployment started

**Option B: Manual Redeploy**
1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### 6. Verify It Works

1. Go to your live site
2. Try sending a test email from the contact form
3. Check your inbox at `aadityak22@outlook.com`

## Troubleshooting

### Still Getting the Error?

1. **Check Vercel Logs**:
   - Go to your project → **Deployments** → Click on latest deployment
   - Click **Functions** tab
   - Click on `/api/send`
   - Check the logs for error messages

2. **Verify Variables Are Set**:
   - Go to Settings → Environment Variables
   - Make sure all 3 variables are listed
   - Check that they have values (not empty)

3. **Check Variable Names**:
   - Must be exactly: `RESEND_API_KEY` (not `resend_api_key` or `Resend_Api_Key`)
   - Must be exactly: `RESEND_TO_EMAIL` (not `resend_to_email`)

4. **Ensure Redeployment**:
   - Environment variables only work after redeployment
   - Make sure you redeployed after adding them

5. **Check API Key Format**:
   - Should start with `re_`
   - Should be about 40-50 characters long
   - No extra spaces before or after

## Quick Checklist

- [ ] Added `RESEND_API_KEY` in Vercel
- [ ] Added `RESEND_TO_EMAIL` in Vercel  
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Redeployed the application
- [ ] API key starts with `re_`
- [ ] Email address is correct: `aadityak22@outlook.com`
- [ ] No extra spaces in variable values

## Still Need Help?

Check the Vercel function logs:
1. Go to Deployments → Latest deployment
2. Click **Functions** → `/api/send`
3. Look for error messages that show which variable is missing

