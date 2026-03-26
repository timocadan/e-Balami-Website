# Quick Start - Firebase Functions Email Notifications

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd functions
npm install
```

### 2. Configure Gmail (Easiest Option)

1. Enable 2-Step Verification on Gmail
2. Generate App Password: [Google Account → Security → App passwords](https://myaccount.google.com/apppasswords)
3. Set secrets:
```bash
firebase functions:secrets:set SMTP_USER
# Enter: your-email@gmail.com

firebase functions:secrets:set SMTP_PASS  
# Enter: your-16-char-app-password

firebase functions:secrets:set SMTP_FROM
# Enter: your-email@gmail.com
```

### 3. Deploy
```bash
cd ..
firebase deploy --only functions
```

### 4. Test
Create a new order in Firestore → Check your email!

## 📧 Email Providers

- **Gmail**: Free, easy setup (recommended for testing)
- **Resend**: Free tier (3K emails/month), better for production
- **Custom SMTP**: Any provider (see SETUP_GUIDE.md)

## 📋 What Gets Emailed?

When a new order is created in:
- `dalabyadaDhamaystiran` 
- `dalabyadaFarsamada`

All admins receive an email with:
- Customer Name
- Service Type  
- Phone Number
- Email, Age, City, Destination
- Timestamp

## 👥 Admin Emails

The function looks for admins in:
1. `admins` collection (any document with `email` field)
2. `users` collection (where `role === "admin"`)
3. Fallback: Hardcoded emails in code

## 🔍 Troubleshooting

**Not receiving emails?**
```bash
firebase functions:log
```

**Functions not triggering?**
- Verify collection names match exactly
- Check function status: `firebase functions:list`

**Need help?**
See `SETUP_GUIDE.md` for detailed instructions.

