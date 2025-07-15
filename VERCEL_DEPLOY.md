# Vercel'e Deployment Adımları

## 1. Vercel'e Giriş

Terminal'de şu komutu çalıştırın:
```bash
cd /Users/Onat/Workspace/local_web_app_deploy/trackit-clean
npx vercel login
```

Bu komut size bir link verecek ve browser'da login yapmanızı isteyecek.

## 2. Frontend Deployment

Login olduktan sonra:
```bash
npx vercel --prod
```

Bu komut size şu soruları soracak:
- **Set up and deploy?** → `y` (Yes)
- **Which scope?** → Hesabınızı seçin
- **Link to existing project?** → `n` (No)
- **Project name?** → `trackit-clean` (veya istediğiniz isim)
- **Directory?** → Enter (mevcut dizin)
- **Override settings?** → `n` (No)

## 3. Backend Deployment (Railway)

Backend için Railway kullanacağız:

1. https://railway.app sitesine gidin
2. GitHub ile giriş yapın
3. "New Project" → "Deploy from GitHub repo"
4. TrackIt reposunu seçin
5. `trackit-backend` klasörünü seçin
6. Environment variables ekleyin:
   - `SECRET_KEY`: supersecret123
   - `PORT`: 5000

## 4. Config Güncelleme

Backend URL'nizi aldıktan sonra:
```bash
# config.js dosyasını güncelleyin
# API_URL: 'https://your-backend-url.railway.app'
```

## 5. Tekrar Deploy

Config güncelledikten sonra:
```bash
npx vercel --prod
```

## Sonuç

✅ **Frontend**: https://trackit-clean-[random].vercel.app
✅ **Backend**: https://your-backend-url.railway.app

İki kullanıcı için hazır!