# Deployment Instructions

## Quick Deploy

### 1. Install Dependencies
```bash
cd functions
npm install
```

### 2. Set Resend API Key as Secret (Recommended)

For security, set your Resend API key as a Firebase secret:

```bash
firebase functions:secrets:set RESEND_API_KEY
# When prompted, enter: re_ZJwdd1bu_JkAHemQp2GxW47ufPDHimCVy
```

**Note:** The code includes your API key as a fallback, but using secrets is the recommended approach for production.

### 3. Deploy Functions

```bash
cd ..
firebase deploy --only functions
```

## Verify Deployment

1. Check deployed functions:
```bash
firebase functions:list
```

2. Test by creating a new order in Firestore
3. Check logs:
```bash
firebase functions:log
```

## Admin Emails Setup

Make sure you have an `admins` collection in Firestore with documents containing an `email` field:

```json
{
  "email": "admin@example.com",
  "name": "Admin Name"
}
```

The function will automatically fetch all emails from the `admins` collection and send notifications to each one.

