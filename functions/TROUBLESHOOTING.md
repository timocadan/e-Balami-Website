# Troubleshooting Firebase Functions v2 Deployment

## First-Time Setup Issues

If you see errors like:
- "Since this is your first time using 2nd gen functions, we need a little bit longer..."
- "Failed to create function"
- Eventarc Service Agent role errors

### Solution 1: Wait and Retry (Most Common)

Firebase Functions v2 requires additional setup time on first deployment. Wait 5-10 minutes, then retry:

```bash
firebase deploy --only functions
```

### Solution 2: Enable Required APIs

Make sure these APIs are enabled in your Google Cloud project:

1. **Eventarc API** (Required for Firestore triggers)
   - Go to: https://console.cloud.google.com/apis/library/eventarc.googleapis.com?project=ebalami-website
   - Click "Enable"

2. **Cloud Functions API** (Should already be enabled)
   - Go to: https://console.cloud.google.com/apis/library/cloudfunctions.googleapis.com?project=ebalami-website

3. **Cloud Build API** (Should already be enabled)
   - Go to: https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com?project=ebalami-website

### Solution 3: Grant Eventarc Service Agent Role

The Eventarc Service Agent needs proper permissions. This is usually automatic, but if issues persist:

1. Go to: https://console.cloud.google.com/iam-admin/iam?project=ebalami-website
2. Find: `service-{PROJECT_NUMBER}@gcp-sa-eventarc.iam.gserviceaccount.com`
3. Ensure it has the "Eventarc Service Agent" role

Or grant via command line:
```bash
gcloud projects add-iam-policy-binding ebalami-website \
  --member="serviceAccount:service-612434597781@gcp-sa-eventarc.iam.gserviceaccount.com" \
  --role="roles/eventarc.serviceAgent"
```

### Solution 4: Check Service Account Permissions

Ensure the default compute service account has necessary permissions:

1. Go to: https://console.cloud.google.com/iam-admin/iam?project=ebalami-website
2. Find: `612434597781-compute@developer.gserviceaccount.com`
3. Ensure it has "Editor" or "Cloud Functions Developer" role

## Deployment Steps

1. **Enable APIs** (if not already enabled)
2. **Wait 5-10 minutes** for APIs to propagate
3. **Deploy functions**:
   ```bash
   firebase deploy --only functions
   ```

## Verify Deployment

After successful deployment:

```bash
# List all functions
firebase functions:list

# Check function logs
firebase functions:log

# Test by creating a document in Firestore
```

## Common Errors

### Error: "Compute Engine API has not been used"
- Enable Compute Engine API: https://console.cloud.google.com/apis/library/compute.googleapis.com?project=ebalami-website

### Error: "Permission denied"
- Check IAM roles in Google Cloud Console
- Ensure your account has "Owner" or "Editor" role

### Error: "Function failed to create"
- Wait 5-10 minutes and retry
- Check that all required APIs are enabled
- Verify Eventarc Service Agent has proper permissions

