import { S3Client } from "@aws-sdk/client-s3";

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
export const r2Bucket = process.env.R2_BUCKET as string;
export const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL || "";

if (!accountId || !accessKeyId || !secretAccessKey || !r2Bucket) {
  console.warn("R2 environment variables are not fully set. Check .env file.");
}

const endpoint = accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined;

export const s3 = new S3Client({
  region: "auto",
  endpoint,
  credentials: accessKeyId && secretAccessKey ? { accessKeyId, secretAccessKey } : undefined,
});