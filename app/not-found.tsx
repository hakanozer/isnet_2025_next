// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="display-1 fw-bold text-danger">404</h1>

          <h2 className="mb-3">Sayfa Bulunamadı</h2>

          <p className="text-muted mb-4">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>

          <a href="product" className="btn btn-primary btn-lg">
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    </div>
  );
}
