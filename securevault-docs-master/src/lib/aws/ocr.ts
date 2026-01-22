// src/lib/aws/ocr.ts
import {
  TextractClient,
  DetectDocumentTextCommand,
} from "@aws-sdk/client-textract";

const REGION = process.env.AWS_REGION || "ca-central-1";
const MODE = process.env.OCR_MODE || "MOCK";

const textract = new TextractClient({ region: REGION });

export type OcrResult = {
  mode: "MOCK" | "TEXTRACT";
  text: string;
};

export async function runOcrFromS3(key: string): Promise<OcrResult> {
  // Phase 1: MOCK mode – no AWS calls
  if (MODE !== "TEXTRACT") {
    return {
      mode: "MOCK",
      text: `[MOCK OCR] Key=${key}`,
    };
  }

  // Phase 2: real Textract
  const bucket = process.env.S3_BUCKET_DATA;
  if (!bucket) throw new Error("S3_BUCKET_DATA is not set for Textract");

  const cmd = new DetectDocumentTextCommand({
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: key,
      },
    },
  });

  const res = await textract.send(cmd);

  const lines =
    res.Blocks?.filter((b) => b.BlockType === "LINE")
      .map((b) => b.Text)
      .filter(Boolean) ?? [];

  return {
    mode: "TEXTRACT",
    text: lines.join("\n"),
  };
}
