# S3 CORS Configuration for Direct Uploads

**Last Updated:** December 23, 2025
**Related Feature:** Direct S3 Uploads (v1.1.0)
**See Also:** [CHANGELOG.md](../CHANGELOG.md)

This document explains how to configure your S3 bucket to allow direct browser-to-S3 uploads.

## Why CORS is Needed

Direct S3 uploads send files directly from the user's browser to S3 (bypassing your server). This requires S3 to accept requests from your domain, which is controlled by CORS (Cross-Origin Resource Sharing) settings.

## Configuration Steps

### Option 1: AWS Console (Recommended)

1. Go to **AWS S3 Console**: https://s3.console.aws.amazon.com/
2. Select your bucket: `svd-prod-data-ca`
3. Go to **Permissions** tab
4. Scroll to **Cross-origin resource sharing (CORS)**
5. Click **Edit**
6. Paste the following configuration:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "https://securevaultdocs.com",
            "https://www.securevaultdocs.com"
        ],
        "ExposeHeaders": [
            "ETag",
            "x-amz-meta-custom-header"
        ],
        "MaxAgeSeconds": 3600
    }
]
```

7. Click **Save changes**

### Option 2: AWS CLI

Run this command:

```bash
aws s3api put-bucket-cors --bucket svd-prod-data-ca --cors-configuration '{
  "CORSRules": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["PUT", "POST", "GET", "HEAD"],
      "AllowedOrigins": ["https://securevaultdocs.com", "https://www.securevaultdocs.com"],
      "ExposeHeaders": ["ETag", "x-amz-meta-custom-header"],
      "MaxAgeSeconds": 3600
    }
  ]
}'
```

## Development/Testing

For local development, add your local origin:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["PUT", "POST", "GET", "HEAD"],
        "AllowedOrigins": [
            "https://securevaultdocs.com",
            "https://www.securevaultdocs.com",
            "http://localhost:3000",
            "http://localhost:3001"
        ],
        "ExposeHeaders": ["ETag", "x-amz-meta-custom-header"],
        "MaxAgeSeconds": 3600
    }
]
```

## Verification

To verify CORS is working:

1. Open your browser's DevTools (F12)
2. Go to the Network tab
3. Upload a file > 10MB
4. Look for PUT requests to `s3.ca-central-1.amazonaws.com`
5. Response should show CORS headers like `Access-Control-Allow-Origin`

If you see CORS errors:
- Verify the bucket name is correct
- Check that your origin URL matches exactly (including https://)
- Wait a few minutes for changes to propagate

## Upload Size Limits

| Upload Type | Max Size | When Used |
|-------------|----------|-----------|
| Proxy Upload | 50 MB | Files < 10 MB (through server) |
| Direct S3 Upload | 5 GB | Files >= 10 MB (browser to S3) |
| Multipart Upload | 5 TB | Future enhancement for very large files |

## How It Works

1. **Small files (< 10 MB)**: Uploaded through your server (proxy)
   - No CORS needed
   - Works immediately

2. **Large files (>= 10 MB)**: Uploaded directly to S3
   - Browser requests presigned URL from `/api/upload/presign-direct`
   - Browser uploads directly to S3 using presigned URL
   - Browser notifies server via `/api/upload/complete`
   - AI/Textract analysis runs after document is saved

## Security Notes

- Presigned URLs expire after 15 minutes (or 1 hour for files > 100 MB)
- Each URL is unique and can only upload to the specific key it was generated for
- Storage limits are validated server-side before generating URLs
- AWS credentials never leave your server
