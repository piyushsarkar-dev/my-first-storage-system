import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "@/lib/prisma";
import { s3, r2Bucket, publicBaseUrl } from "@/lib/r2";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as unknown as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `${Date.now()}-${file.name}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: r2Bucket,
        Key: key,
        Body: buffer,
        ContentType: (file as any).type || "application/octet-stream",
      })
    );

    const url = publicBaseUrl ? `${publicBaseUrl}/${key}` : null;

    const created = await prisma.file.create({
      data: {
        key,
        filename: file.name,
        contentType: (file as any).type || null,
        size: buffer.length,
        url,
      },
    });

    return NextResponse.json({ file: created }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message ?? "Upload failed" }, { status: 500 });
  }
}