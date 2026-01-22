# AI Workflows - Complete List

All AI workflows for SecureVault Docs, ready to import into N8N.

## Available AI Workflows

1. **ai_01_document_classification.json** - Auto-classify documents into folders
2. **ai_02_ocr_enhancement.json** - Enhance OCR text quality
3. **ai_03_template_generation.json** - Generate document request templates
4. **ai_04_email_personalization.json** - Personalize client emails
5. **ai_05_search_enhancement.json** - Enhance search queries
6. **ai_06_anomaly_detection.json** - Detect security anomalies
7. **ai_07_document_summarization.json** - Summarize long documents
8. **ai_08_folder_suggestions.json** - Suggest folder improvements
9. **ai_09_auto_response.json** - Auto-respond to client questions
10. **ai_10_usage_analysis.json** - Analyze usage patterns

## Model Configuration

### OpenAI Models
- **GPT-4o**: Best quality, higher cost - Use for complex tasks
- **GPT-4o-mini**: Cost-effective, good quality - Use for simple tasks
- **GPT-3.5-turbo**: Fast, low cost - Use for high-volume tasks

### Anthropic Models
- **Claude 3.5 Sonnet**: Best for creative/content tasks
- **Claude 3 Haiku**: Fast, cost-effective - Use as fallback

### Model Selection Guide

| Task | Primary Model | Fallback | Reason |
|------|--------------|----------|--------|
| Classification | GPT-4o-mini | Claude 3 Haiku | Simple, deterministic |
| OCR Enhancement | GPT-4o | Claude 3.5 Sonnet | Complex text correction |
| Template Generation | Claude 3.5 Sonnet | GPT-4o | Creative content |
| Email Personalization | GPT-4o-mini | Claude 3 Haiku | Simple personalization |
| Search Enhancement | GPT-4o-mini | Claude 3 Haiku | Fast, low cost |
| Anomaly Detection | GPT-4o | Custom ML | Complex pattern analysis |
| Summarization | Claude 3.5 Sonnet | GPT-4o | Long-form content |
| Folder Suggestions | GPT-4o | Claude 3.5 Sonnet | Analysis task |
| Auto-Response | GPT-4o-mini | Claude 3 Haiku | Fast responses |
| Usage Analysis | GPT-4o | Claude 3.5 Sonnet | Complex analysis |

## Cost Optimization

### Strategies
1. **Use GPT-4o-mini for simple tasks** - 10x cheaper than GPT-4o
2. **Set maxTokens appropriately** - Don't request more than needed
3. **Cache common responses** - Store frequent classifications
4. **Batch processing** - Process multiple documents together
5. **Fallback to rules** - Use rule-based classification when confidence is high

### Expected Costs (per 1000 requests)
- GPT-4o-mini: ~$0.15
- GPT-4o: ~$2.50
- Claude 3 Haiku: ~$0.25
- Claude 3.5 Sonnet: ~$3.00

## Import All AI Workflows

```bash
# Copy all AI workflow files to N8N
# Then import each one via N8N UI
```

See main README.md for detailed import instructions.

