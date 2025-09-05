"use client";

import { useEffect, useState } from "react";

type FileItem = {
  id: number;
  key: string;
  filename: string;
  contentType: string | null;
  size: number;
  url: string | null;
  createdAt: string;
};

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    const res = await fetch("/api/files", { cache: "no-store" });
    const data = await res.json();
    setFiles(data.files ?? []);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const onUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Upload failed");
      }
      setFile(null);
      await fetchFiles();
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onUpload} className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm"
          />
          <button
            type="submit"
            disabled={!file || uploading}
            className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>

      <section className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-medium">Files</h2>
        {files.length === 0 ? (
          <p className="text-sm text-slate-600">No files yet</p>
        ) : (
          <ul className="divide-y">
            {files.map((f) => (
              <li key={f.id} className="py-2 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{f.filename}</div>
                    <div className="text-xs text-slate-600">
                      {f.contentType ?? "unknown"} · {(f.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                  {f.url ? (
                    <a
                      href={f.url}
                      target="_blank"
                      className="text-blue-600 underline"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-xs text-slate-500">private</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}