// app/global-error.tsx
"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <h1>Sistemsel hata</h1>
        <pre>{error.message}</pre>
      </body>
    </html>
  );
}
