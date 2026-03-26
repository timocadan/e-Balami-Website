# Firebase Cloud Functions Setup Guide

This guide will walk you through setting up Firebase Cloud Functions to send email notifications when new orders are created.

## Prerequisites

- Node.js 18+ installed
- Firebase project: `ebalami-website`
- Firebase CLI installed
- Access to your Firebase project

## Step-by-Step Setup

### Step 1: Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

This will open a browser window for authentication.

### Step 3: Verify Your Project

Make sure you're in the project root directory and verify the project:

```bash
firebase use ebalami-website
```

### Step 4: Install Function Dependencies

Navigate to the functions directory and install dependencies:

```bash
cd functions
npm install
```

### Step 5: Configure Email Provider

Choose one of the following email providers:

#### Option A: Gmail (Recommended for Testing)

1. **Enable 2-Step Verification** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated 16-character password

3. **Set Environment Variables**:

For Firebase Functions v2, you can set environment variables using:

```bash
# Set environment variables (Firebase Functions v2)
firebase functions:secrets:set SMTP_USER
# Enter: your-email@gmail.com

firebase functions:secrets:set SMTP_PASS
# Enter: your-16-character-app-password

firebase functions:secrets:set SMTP_FROM
# Enter: your-email@gmail.com
```

Or use the Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project → Functions → Secrets
3. Add secrets: `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`

4. **Update `functions/index.js`**:
   - The Gmail configuration is already active (lines 22-28)
   - Make sure the other options are commented out

#### Option B: Resend (Recommended for Production)

1. **Sign up** at [Resend](https://resend.com) (free tier: 3,000 emails/month)
2. **Get your API key** from the dashboard
3. **Set Environment Variables**:

```bash
firebase functions:secrets:set RESEND_API_KEY
# Enter: re_xxxxxxxxxxxxx

firebase functions:secrets:set SMTP_FROM
# Enter: noreply@yourdomain.com (must be verified domain)
```

4. **Update `functions/index.js`**:
   - Comment out the Gmail section (lines 22-28)
   - Uncomment the Resend section (lines 30-39)

#### Option C: Custom SMTP

1. **Get SMTP credentials** from your email provider
2. **Set Environment Variables**:

```bash
firebase functions:secrets:set SMTP_HOST
firebase functions:secrets:set SMTP_PORT
firebase functions:secrets:set SMTP_USER
firebase functions:secrets:set SMTP_PASS
firebase functions:secrets:set SMTP_FROM
```

3. **Update `functions/index.js`**:
   - Comment out Gmail section
   - Uncomment Custom SMTP section (lines 41-50)

### Step 6: Update Code to Use Secrets

Update `functions/index.js` to access secrets properly. The current code uses `process.env` which works, but for better security, you can use Firebase Functions secrets:

```javascript
// In the function definition, add secrets:
exports.notifyNewDhamaystiranOrder = onDocumentCreated(
    {
      document: "dalabyadaDhamaystiran/{orderId}",
      region: "us-central1",
      secrets: ["SMTP_USER", "SMTP_PASS", "SMTP_FROM"], // Add this
    },
    async (event) => {
      // ... rest of code
    }
);
```

### Step 7: Test Locally (Optional)

Test the functions locally using the Firebase Emulator:

```bash
# From project root
firebase emulators:start --only functions,firestore
```

Then create a test document in Firestore to trigger the function.

### Step 8: Deploy Functions

Deploy the functions to Firebase:

```bash
# From project root
firebase deploy --only functions
```

Or from the functions directory:

```bash
cd functions
npm run deploy
```

### Step 9: Verify Deployment

1. Check deployed functions:
```bash
firebase functions:list
```

2. Test by creating a new order in Firestore
3. Check logs:
```bash
firebase functions:log
```

4. Check your email inbox for notifications

## Setting Up Admin Emails in Firestore

The function will automatically fetch admin emails from Firestore. You can set this up in two ways:

### Method 1: Create `admins` Collection

1. Go to Firebase Console → Firestore Database
2. Create a new collection: `admins`
3. Add documents with this structure:

```json
{
  "email": "admin@example.com",
  "name": "Admin Name",
  "role": "admin"
}
```

### Method 2: Use `users` Collection

1. Go to Firebase Console → Firestore Database
2. Find or create the `users` collection
3. Add or update documents with:

```json
{
  "email": "admin@example.com",
  "role": "admin"
}
```

**Note**: If no admins are found in Firestore, the function will use the hardcoded fallback emails:
- `omermohamed1872@gmail.com`
- `ebalamiservices@gmail.com`

## Troubleshooting

### Functions Not Deploying

- Check Node.js version: `node --version` (should be 18+)
- Verify Firebase CLI is up to date: `firebase --version`
- Check for syntax errors: `cd functions && npm run lint`

### Emails Not Sending

1. **Check Function Logs**:
   ```bash
   firebase functions:log --only notifyNewDhamaystiranOrder,notifyNewFarsamadaOrder
   ```

2. **Verify SMTP Credentials**:
   - For Gmail: Make sure you're using an App Password, not your regular password
   - Check that 2-Step Verification is enabled

3. **Test SMTP Connection**:
   - You can test the SMTP connection locally before deploying

### Functions Not Triggering

1. **Verify Collection Names**:
   - Check that collection names match exactly: `dalabyadaDhamaystiran` and `dalabyadaFarsamada`
   - Case-sensitive!

2. **Check Function Status**:
   ```bash
   firebase functions:list
   ```

3. **Verify Permissions**:
   - Make sure your Firebase project has the necessary permissions
   - Check IAM roles in Google Cloud Console

## Cost Considerations

- **Firebase Functions**: Free tier includes 2 million invocations/month
- **Gmail**: Free, but has daily sending limits (~500 emails/day)
- **Resend**: Free tier includes 3,000 emails/month
- **Custom SMTP**: Varies by provider

## Next Steps

1. ✅ Set up SMTP provider
2. ✅ Configure environment variables
3. ✅ Deploy functions
4. ✅ Test with a new order
5. ✅ Set up admin collection in Firestore (optional)
6. ✅ Monitor function logs

## Support

For more information:
- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)
- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Firebase Functions v2 Migration Guide](https://firebase.google.com/docs/functions/beta/migrate-to-v2)

