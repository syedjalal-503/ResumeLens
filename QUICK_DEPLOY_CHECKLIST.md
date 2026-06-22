# ⚡ Quick Deploy Checklist

## Status Check ✅
- [x] Backend code ready (✅ tested locally)
- [x] Frontend code ready (✅ builds successfully)
- [x] Vulnerabilities fixed (✅ npm audit fix done)
- [x] All pushed to GitHub (✅ latest commit: 2fcddf8)

---

## 🚀 Step 1: Deploy Backend (Render) - 2 Minutes

### Manual Setup Required (Security):
1. Go to: https://dashboard.render.com
2. Login with GitHub or create account
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository: `https://github.com/syedjalal-503/ResumeLens`
5. **Service Settings:**
   - Name: `resumelens-backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`

6. **Add Environment Variables** (copy from backend/.env):
   ```
   PORT=3000
   MONGO_URI=mongodb+srv://mohamedferoz2023_db_user:ciETgSIZYbD5Mdbx@cluster0.fnkwqpo.mongodb.net/
   JWT_SECRET=rL$3cR3t!K3y_2026_r3sum3L3ns_@pp
   NODE_ENV=production
   ```

7. Click **"Create Web Service"**
8. ⏳ Wait 5-10 minutes for deployment
9. ✅ Copy your backend URL (e.g., `https://resumelens-backend.onrender.com`)
10. Test it: Open `https://resumelens-backend.onrender.com/` in browser

---

## 🌐 Step 2: Deploy Frontend (Vercel) - 2 Minutes

### Manual Setup Required (Security):
1. Go to: https://vercel.com/dashboard
2. Login with GitHub or create account
3. Click **"Add New"** → **"Project"**
4. Select repository: `syedjalal-503/ResumeLens`
5. **Project Settings:**
   - Framework: `React`
   - Root Directory: `FrontEnd`
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. **Environment Variable:**
   ```
   VITE_API_URL=https://resumelens-backend.onrender.com/api
   ```
   *(Replace with your actual Render backend URL from Step 1)*

7. Click **"Deploy"**
8. ⏳ Wait 2-3 minutes
9. ✅ Get your frontend URL (e.g., `https://resumelens.vercel.app`)

---

## 🔗 Step 3: Connect Frontend to Backend

The frontend automatically uses `VITE_API_URL` environment variable.

**Test it:**
1. Open your Vercel URL: `https://resumelens.vercel.app`
2. Try signing up / logging in
3. Open DevTools (F12) → Network tab
4. Check if API calls go to your Render backend ✅

---

## ✅ Final Status

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| Backend | Render | ⏳ Deploying | `https://resumelens-backend.onrender.com` |
| Frontend | Vercel | ⏳ Ready | `https://resumelens.vercel.app` |

---

## 🆘 Troubleshooting

**Backend not connecting:**
- Check Render logs: Dashboard → Service → Logs
- Verify MongoDB URI is correct
- Check if PORT=3000 env var is set

**Frontend build failing:**
- Check Vercel logs: Project → Deployments → Logs
- Verify `VITE_API_URL` is set correctly

**API calls failing:**
- Open DevTools → Network tab
- Check CORS errors in console
- Verify backend URL in `.env.production`

---

**Everything is configured and ready! ✨**
Just need to click buttons on Render/Vercel dashboards (they require your auth for security).
