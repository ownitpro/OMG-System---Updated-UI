#!/usr/bin/env bash
set -euo pipefail

BASE=${SVD_WEBHOOK_BASE:-"http://localhost:5678"}

http POST $BASE/webhooks/n8n/contact-sales \
  fullName="Alex Doe" email=alex@example.com company=Acme \
  useCase="Docs + OCR" planInterest=business region=CA \
  "x-svd-signature:$SVD_CONTACT_SALES_SECRET"

http POST $BASE/webhooks/n8n/demo-request name=Alex email=alex@example.com side=business

http POST $BASE/webhooks/n8n/request-file orgId=org_demo recipientEmail=client@example.com label="KYC"

http POST $BASE/webhooks/n8n/email-to-vault \
  to=ingest@securevaultdocs.com from=user@example.com subject="Receipts" \
  attachments:='[{"filename":"r1.pdf","contentBase64":"ZG9n"}]'

http POST $BASE/webhooks/n8n/marketplace/install templateId=acct-basic mode=dry-run

