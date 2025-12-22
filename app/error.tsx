// app/error.tsx
"use client";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  console.error(error);

  return (
        <>
        <h1>Bir hata oluştu</h1>
        <p>{error.message}</p>

        <button className="btn btn-danger" onClick={() => reset()}>
          Tekrar Dene
        </button>
        </>
  );
}
