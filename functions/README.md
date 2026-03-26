# Firebase Cloud Functions - Email Notifications

This directory contains Firebase Cloud Functions (v2) that send email notifications to admins whenever a new order is created in the `dalabyadaDhamaystiran` or `dalabyadaFarsamada` collections.

## Features

- ✅ Triggers on new order creation in both collections
- ✅ Fetches admin emails from Firestore (`admins` or `users` collections)
- ✅ Falls back to hardcoded emails if no admins found in Firestore
- ✅ Sends formatted HTML emails with order details
- ✅ Uses Nodemailer with SMTP support (Gmail, Resend, or custom SMTP)

## Setup Instructions

### 1. Install Firebase CLI

If you haven't already, install the Firebase CLI globally:

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Firebase Functions (if not already done)

```bash
firebase init functions
```

When prompted:
- Select "Use an existing project" and choose `ebalami-website`
- Select JavaScript as the language
- Choose to install dependencies with npm

### 4. Install Dependencies

Navigate to the functions directory and install dependencies:

```bash
cd functions
npm install
```

### 5. Configure SMTP Settings

You have three options for email configuration:

#### Option A: Gmail SMTP

1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Create a new app password for "Mail"
3. Set environment variables:

```bash
firebase functions:config:set smtp.user="your-email@gmail.com" smtp.pass="your-app-password" smtp.from="your-email@gmail.com"
```

#### Option B: Resend SMTP

1. Sign up at [Resend](https://resend.com)
2. Get your API key
3. Set environment variables:

```bash
firebase functions:config:set resend.api_key="your-resend-api-key" smtp.from="noreply@yourdomain.com"
```

Then update `functions/index.js` to use Resend SMTP (uncomment the Resend section).

#### Option C: Custom SMTP

Set your SMTP configuration:

```bash
firebase functions:config:set smtp.host="smtp.example.com" smtp.port="587" smtp.user="your-username" smtp.pass="your-password" smtp.from="noreply@yourdomain.com"
```

### 6. Update Code for Your SMTP Provider

Edit `functions/index.js` and uncomment the appropriate SMTP configuration in the `createTransporter()` function.

### 7. Deploy Functions

Deploy the functions to Firebase:

```bash
firebase deploy --only functions
```

Or deploy from the project root:

```bash
cd ..
firebase deploy --only functions
```

### 8. Test the Functions

1. Create a test order in Firestore in either collection
2. Check the Firebase Functions logs:

```bash
firebase functions:log
```

3. Check your email inbox for the notification

## Local Development

To test functions locally:

```bash
cd functions
npm run serve
```

This starts the Firebase emulator. You can test by creating documents in the emulator's Firestore.

## Admin Email Configuration

The function will look for admin emails in this order:

1. **`admins` collection**: Any document with an `email` field
2. **`users` collection**: Documents where `role === "admin"` and have an `email` field
3. **Fallback**: Hardcoded emails in the code:
   - `omermohamed1872@gmail.com`
   - `ebalamiservices@gmail.com`

### Setting up Admin Collection in Firestore

Create an `admins` collection with documents like:

```json
{
  "email": "admin@example.com",
  "name": "Admin Name",
  "role": "admin"
}
```

Or use the `users` collection with:

```json
{
  "email": "admin@example.com",
  "role": "admin"
}
```

## Email Content

The email includes:
- Customer Name
- Service Type
- Phone Number
- Email
- Age
- City
- Destination
- Timestamp
- Collection Name

## Troubleshooting

### Functions not triggering

- Check that the functions are deployed: `firebase functions:list`
- Verify the collection names match exactly
- Check Firebase Functions logs: `firebase functions:log`

### Emails not sending

- Verify SMTP credentials are correct
- Check Firebase Functions logs for errors
- Ensure your SMTP provider allows connections from Firebase
- For Gmail, make sure you're using an App Password, not your regular password

### No admin emails found

- Check that the `admins` or `users` collection exists in Firestore
- Verify documents have an `email` field
- Check that `role === "admin"` for users collection
- The function will fall back to hardcoded emails if none are found

## Environment Variables

For Firebase Functions v2, you can also use environment variables via `.env` file or Firebase console:

1. Go to Firebase Console → Functions → Configuration
2. Add environment variables:
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`
   - `SMTP_HOST` (if using custom SMTP)
   - `SMTP_PORT` (if using custom SMTP)

## Cost Considerations

- Firebase Functions: Free tier includes 2 million invocations/month
- Email sending: Depends on your SMTP provider
  - Gmail: Free (with limits)
  - Resend: Free tier includes 3,000 emails/month
  - Custom SMTP: Varies by provider

## Support

For issues or questions, check:
- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)
- [Nodemailer Documentation](https://nodemailer.com/about/)

