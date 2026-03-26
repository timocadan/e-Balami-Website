# Step-by-Step Deployment Guide

## Step 1: Enable Eventarc API (Required for Firestore Triggers)

1. Open: https://console.cloud.google.com/apis/library/eventarc.googleapis.com?project=ebalami-website
2. Click **"Enable"**
3. Wait 2-3 minutes for the API to activate

## Step 2: Deploy Functions (Without Secret First)

The functions are currently configured to use a hardcoded API key as fallback. Deploy first:

```bash
firebase deploy --only functions
```

If this still fails, wait 5-10 minutes after enabling Eventarc API and try again.

## Step 3: Set Resend API Key as Secret (Optional but Recommended)

After successful deployment, set the secret for better security:

```bash
firebase functions:secrets:set RESEND_API_KEY
# When prompted, enter: re_ZJwdd1bu_JkAHemQp2GxW47ufPDHimCVy
```

## Step 4: Update Functions to Use Secret

1. Edit `functions/index.js`
2. Uncomment the `secrets: ["RESEND_API_KEY"]` lines in both function definitions (lines 251 and 277)
3. Redeploy:

```bash
firebase deploy --only functions
```

## Alternative: Deploy with Secret from Start

If you want to use secrets from the beginning:

1. **First, set the secret:**
   ```bash
   firebase functions:secrets:set RESEND_API_KEY
   # Enter: re_ZJwdd1bu_JkAHemQp2GxW47ufPDHimCVy
   ```

2. **Uncomment the secrets lines in index.js** (lines 251 and 277)

3. **Deploy:**
   ```bash
   firebase deploy --only functions
   ```

## Troubleshooting

### Still Getting "Failed to create function"?

1. **Check Eventarc API is enabled:**
   - Go to: https://console.cloud.google.com/apis/library/eventarc.googleapis.com?project=ebalami-website
   - Should show "API enabled"

2. **Wait longer:**
   - First-time setup can take 10-15 minutes
   - Try again after waiting

3. **Check Google Cloud Console:**
   - Go to: https://console.cloud.google.com/functions?project=ebalami-website
   - See if functions appear there (even if deployment failed)

4. **Check logs for more details:**
   ```bash
   firebase functions:log --only notifyNewDhamaystiranOrder,notifyNewFarsamadaOrder
   ```

### Secret Not Found Error?

If you get an error about the secret not existing:
- Either set it first (Step 3 above)
- Or keep the secrets line commented out (current configuration)

