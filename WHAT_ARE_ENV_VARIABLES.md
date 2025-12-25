# What Are Environment Variables?

## Simple Explanation

**Environment variables** are like secret passwords and configuration settings that your application needs to work, but you don't want to put directly in your code.

Think of them like this:
- **Your code** = The recipe (public, everyone can see)
- **Environment variables** = The secret ingredients (private, only you know)

## Why Do We Use Them?

### 1. **Security** 🔒
- Keep sensitive information (like API keys) out of your code
- If someone sees your code, they can't steal your secrets
- Example: Your email password shouldn't be in your code!

### 2. **Flexibility** 🔄
- Same code works in different environments (development, production)
- Easy to change settings without editing code
- Example: Use different email addresses for testing vs. production

### 3. **Best Practice** ✅
- Industry standard way to handle configuration
- Works the same way on your computer and on servers (like Vercel)

## Real-World Analogy

Imagine you have a house:
- **Your code** = The house blueprint (everyone can see it)
- **Environment variables** = The keys to the house (only you have them)

You wouldn't put your house keys in the blueprint, right? Same with API keys in code!

## For Your Portfolio Project

Your portfolio needs **3 environment variables** to send emails:

### 1. RESEND_API_KEY
- **What it is**: A secret password to use the Resend email service
- **Where to get it**: From resend.com (after you sign up)
- **Looks like**: `re_1234567890abcdef...` (starts with `re_`)
- **Why secret**: If someone steals this, they could send emails using your account

### 2. RESEND_TO_EMAIL
- **What it is**: Your email address where you want to receive messages
- **Example**: `aadityak22@outlook.com`
- **Why needed**: Tells the system where to send the contact form messages

### 3. RESEND_FROM_EMAIL (Optional)
- **What it is**: The email address that appears as the sender
- **Default**: `onboarding@resend.dev` (works automatically)
- **Optional**: You can use your own verified email domain

## How They Work

### In Your Code:
```javascript
// Your code reads the environment variable
const apiKey = process.env.RESEND_API_KEY;
// It gets the value you set in Vercel
```

### In Vercel:
```
RESEND_API_KEY = re_your_actual_key_here
RESEND_TO_EMAIL = aadityak22@outlook.com
```

### What Happens:
1. You set the variables in Vercel
2. Vercel makes them available to your code
3. Your code uses them to send emails
4. Your secrets stay safe! 🔒

## Where to Set Them

### For Local Development (Your Computer):
Create a file called `.env.local` in your project folder:
```env
RESEND_API_KEY=re_your_key_here
RESEND_TO_EMAIL=aadityak22@outlook.com
```

### For Production (Vercel):
1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Add each variable one by one
4. Redeploy your app

## Important Rules

1. ✅ **DO**: Keep them secret
2. ✅ **DO**: Add `.env.local` to `.gitignore` (so you don't accidentally share them)
3. ❌ **DON'T**: Put them in your code
4. ❌ **DON'T**: Commit them to GitHub
5. ❌ **DON'T**: Share them publicly

## Example

### ❌ BAD (Don't do this):
```javascript
// DON'T PUT SECRETS IN CODE!
const apiKey = "re_1234567890abcdef"; // BAD!
```

### ✅ GOOD (Do this):
```javascript
// Read from environment variable
const apiKey = process.env.RESEND_API_KEY; // GOOD!
```

## Summary

- **Environment variables** = Secret configuration settings
- **Why use them** = Security and flexibility
- **For your project** = Need 3 variables for email functionality
- **Where to set** = Vercel dashboard (for production) or `.env.local` (for local)

Think of them as your app's secret settings that only you and your server know! 🤫

