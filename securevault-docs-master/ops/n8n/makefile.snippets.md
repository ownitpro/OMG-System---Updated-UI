# Makefile Snippets for n8n Operations

Copy these snippets into your root `Makefile` if desired.

## Export all workflows from a running n8n

```makefile
# Export all workflows from a running n8n (requires API key) to ops/n8n/workflows
n8n-export:
	mkdir -p ops/n8n/workflows
	n8n export:workflow --all --output=ops/n8n/workflows
```

## Import all workflows from repo into n8n

```makefile
# Import all workflows from repo into n8n
n8n-import:
	n8n import:workflow --separate --input=ops/n8n/workflows
```

## Smoke test webhooks

```makefile
# Smoke test webhooks (requires HTTPie)
webhooks-smoke:
	http POST $(N8N_BASE_URL)/webhook/svd/contact-sales < ops/n8n/tests/sample_payloads/contact_sales.lead.json
	http POST $(N8N_BASE_URL)/webhook/svd/usage/meters < ops/n8n/tests/sample_payloads/ocr.page_usage_posted.json
```

## Alternative: Using curl

```makefile
# Smoke test with curl
webhooks-smoke-curl:
	curl -X POST $(N8N_BASE_URL)/webhook/svd/contact-sales \
		-H "Content-Type: application/json" \
		-d @ops/n8n/tests/sample_payloads/contact_sales.lead.json
	curl -X POST $(N8N_BASE_URL)/webhook/svd/usage/meters \
		-H "Content-Type: application/json" \
		-d @ops/n8n/tests/sample_payloads/ocr.page_usage_posted.json
```

## Validate workflow JSONs

```makefile
# Validate all workflow JSONs are valid
n8n-validate:
	@for file in ops/n8n/workflows/*.json; do \
		echo "Validating $$file..."; \
		python3 -m json.tool $$file > /dev/null || exit 1; \
	done
	@echo "All workflows are valid JSON"
```

## Backup n8n workflows

```makefile
# Backup workflows with timestamp
n8n-backup:
	mkdir -p ops/n8n/backups
	tar -czf ops/n8n/backups/workflows-$$(date +%Y%m%d-%H%M%S).tar.gz ops/n8n/workflows/
```

