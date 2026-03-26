# Delete Old Functions Before Deploying

## The Problem

Firebase doesn't allow changing a function's trigger type. If you have existing functions with the same names that are HTTPS-triggered, you need to delete them first.

## Solution: Delete Old Functions

You have two options:

### Option 1: Delete via Firebase Console (Easiest)

1. Go to: https://console.cloud.google.com/functions?project=ebalami-website
2. Find these functions:
   - `notifyNewDhamaystiranOrder`
   - `notifyNewFarsamadaOrder`
3. Click on each function
4. Click "Delete" and confirm

### Option 2: Delete via gcloud CLI

If you have `gcloud` CLI installed:

```bash
# Delete the first function
gcloud functions delete notifyNewDhamaystiranOrder --region=us-central1 --gen2 --project=ebalami-website

# Delete the second function
gcloud functions delete notifyNewFarsamadaOrder --region=us-central1 --gen2 --project=ebalami-website
```

### Option 3: Delete via Firebase CLI (if project is set up)

```bash
# Set the project
firebase use ebalami-website

# Delete functions (if Firebase CLI supports it)
# Note: You may need to use gcloud or the console instead
```

## After Deleting

Once the old functions are deleted, deploy the new ones:

```bash
firebase deploy --only functions
```

## Verify Deletion

Check that the functions are gone:
- Go to: https://console.cloud.google.com/functions?project=ebalami-website
- The functions should no longer appear in the list

