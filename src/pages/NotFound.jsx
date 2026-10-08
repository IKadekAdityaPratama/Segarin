import { Link } from "react-router-dom";

// Ditampilkan jika URL tidak cocok dengan route manapun
export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-slate-100 p-6">
      <div className="bg-white rounded-3xl p-12 text-center">
        <p className="text-6xl">🧭</p>
        <h1 className="text-xl font-extrabold mt-3">Halaman tidak ditemukan</h1>
        <p className="text-slate-500 text-sm mt-1">Alamat yang kamu buka tidak tersedia.</p>
        <Link to="/" className="inline-block mt-4 bg-brand text-white font-bold rounded-full px-6 py-2.5 hover:bg-brand-dark">Kembali ke beranda</Link>
      </div>
    </div>
  );
}
