# 🏗️ Deploying DreamPoint

This guide explains how to get your DreamPoint prototype live on a sharable URL (e.g., `yourproject.vercel.app`) so you can share it with your YouTube and social media community.

## 1. Prerequisites
- A **GitHub** account.
- A **Vercel** account (Free tier is fine).
- Your **OpenRouter API Key** (for the AI Coach).

## 2. Step-by-Step Deployment

### A. Push to GitHub
1. Initialize a git repo if you haven't: `git init`
2. Add all files: `git add .`
3. Commit: `git commit -m "Ready for public demo"`
4. Create a new repository on GitHub and follow the instructions to push your local code.

### B. Link to Vercel
1. Go to [Vercel.com](https://vercel.com) and log in.
2. Click **"New Project"**.
3. Import your DreamPoint repo from GitHub.
4. **Environment Variables**:
   - In the "Environment Variables" section, add:
     - `OPENROUTER_API_KEY` = `your_actual_api_key_here`
5. Click **"Deploy"**.

### C. Get Your Link
- Once finished, Vercel will give you a public URL. This is the link you can share on YouTube!

---

## ⚠️ Important Note on Persistence
This prototype currently uses a **Mock Database** (`db.json`). 
- **On Local**: Changes are saved to your hard drive.
- **On Vercel**: Vercel's filesystem is **temporary**. 
  - If a user claims a shop, it might show up for them, but it likely **won't be there** after the server sleeps or if another user accesses it from a different server instance.
  - **Best for Demos**: This is perfect for showing people *how* the app works, but it's not yet a permanent storage solution.

## 🚀 Next Steps for Community Growth
- **YouTube Strategy**: Show people yourself talking to the AI Coach.
- **Social CTA**: "The first 100 people to reserve their shop slug get the 'First 100' badge."
- **Feedback**: Ask your audience which "Specialty" we should add next!
