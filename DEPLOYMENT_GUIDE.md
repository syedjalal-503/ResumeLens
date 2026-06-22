# ResumeLens Deployment Guide

## Prerequisites
- GitHub repository with both frontend and backend pushed
- Render account (https://render.com)
- Vercel account (https://vercel.com)

---

## Step 1: Deploy Backend to Render

### 1.1 Push to GitHub
```bash
cd ResumeLens
git add .
git commit -m "Add Procfile and deployment configs"
git push origin main
```

### 1.2 Create Render Account & Deploy
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `resumelens-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Region**: Choose closest to you
   - **Plan**: Free tier (or paid as needed)

### 1.3 Add Environment Variables
In Render dashboard for your backend service, go to **Environment** and add:
```
PORT=3000
MONGO_URI=mongodb+srv://mohamedferoz2023_db_user:ciETgSIZYbD5Mdbx@cluster0.fnkwqpo.mongodb.net/
JWT_SECRET=rL$3cR3t!K3y_2026_r3sum3L3ns_@pp
```

### 1.4 Deploy
- Click **"Deploy"**
- Wait for deployment to complete (~5-10 minutes)
- Copy your backend URL (e.g., `https://resumelens-backend.onrender.com`)

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Prepare Environment Variable
Before deploying, update the `.env.production` file in your frontend folder:

```bash
cd ResumeLens/FrontEnd
# Update the VITE_API_URL with your actual Render backend URL
```

Edit `.env.production`:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### 2.2 Create Vercel Account & Deploy
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **"Add New +"** → **"Project"**
4. Select your GitHub repository
5. Configure project:
   - **Framework Preset**: `React`
   - **Root Directory**: `FrontEnd`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.3 Add Environment Variable
In Vercel Project Settings → **Environment Variables**, add:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### 2.4 Deploy
- Click **"Deploy"**
- Wait for deployment to complete (~2-3 minutes)
- Your frontend URL will be provided (e.g., `https://resumelens.vercel.app`)

---

## Step 3: Update CORS Settings (Important!)

Go back to your backend code and update CORS to allow your Vercel frontend:

Edit `backend/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
```

Then push this change:
```bash
git add backend/server.js
git commit -m "Update CORS for production"
git push origin main
```

Render will auto-redeploy with the new changes.

---

## Step 4: Test the Deployment

1. Visit your frontend URL: `https://your-frontend.vercel.app`
2. Try signing up / logging in
3. Test resume upload and analysis features
4. Check browser console for any API errors

---

## Troubleshooting

### Backend not connecting
- Check if MongoDB URI is correct in Render environment variables
- Check CORS settings - make sure frontend URL is whitelisted
- Check Render logs: Dashboard → Service → Logs

### Frontend build failing
- Ensure `.env.production` has correct `VITE_API_URL`
- Check Vercel logs for build errors
- Make sure all dependencies are installed

### API calls failing
- Open browser DevTools → Network tab
- Check if requests are going to correct backend URL
- Check backend logs for error messages

---

## Optional: Custom Domain

**For Render Backend:**
- Go to Render dashboard → Service Settings → Custom Domain
- Add your domain and follow DNS instructions

**For Vercel Frontend:**
- Go to Vercel dashboard → Project Settings → Domains
- Add your domain and follow DNS instructions

---

## Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
