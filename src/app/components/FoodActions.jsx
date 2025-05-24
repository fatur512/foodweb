"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FoodActions({ foodId }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!confirm("Yakin ingin menghapus makanan ini?")) return;

    setDeleting(true);
    setError(null);

    try {
      const res = await fetch(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${foodId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
      });

      if (!res.ok) {
        setError("Gagal menghapus makanan.");
        setDeleting(false);
        return;
      }

      alert("Makanan berhasil dihapus.");
      router.push("/products");
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus.");
      setDeleting(false);
    }
  };

  const handleUpdate = () => {
    router.push(`/products/${foodId}/edit`);
  };

  return (
    <div className="flex space-x-4 mt-6">
      <button
        onClick={handleUpdate}
        className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-2 px-6 rounded transition"
        disabled={deleting}
      >
        Update
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
        disabled={deleting}
      >
        {deleting ? "Menghapus..." : "Delete"}
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
