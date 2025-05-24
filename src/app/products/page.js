import Navbar from "@/app/components/ui/Navbar";

const itemsPerPage = 8;

export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams?.page || "1");

  const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
    headers: {
      "Content-Type": "application/json",
      apiKey: "w05KkI9AWhKxzvPFtXotUva-",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-center mt-10 text-red-600">Gagal memuat data makanan</div>;
  }

  const data = await res.json();
  const allFoods = data.data || [];

  const totalPages = Math.ceil(allFoods.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentFoods = allFoods.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">🍽️ Daftar Makanan</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentFoods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
            >
              <img src={food.imageUrl} alt={food.name} className="w-full h-48 object-cover" />
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">{food.price ? `Rp ${food.price}` : "-"}</h2>
                <h2 className="text-lg font-semibold text-gray-800">{food.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{food.description}</p>
              </div>
              <div className="p-4">
                <a
                  href={`/products/${food.id}`}
                  className="block text-center bg-yellow-400 text-yellow-900 py-2 rounded hover:bg-yellow-500 transition font-semibold"
                >
                  Lihat Detail
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-2">
          <a
            href={`/products?page=${page - 1}`}
            className={`px-4 py-2 rounded ${
              page === 1
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-yellow-300 text-yellow-900 hover:bg-yellow-400"
            }`}
            aria-disabled={page === 1}
          >
            Prev
          </a>

          {[...Array(totalPages)].map((_, i) => (
            <a
              key={i}
              href={`/products?page=${i + 1}`}
              className={`px-3 py-2 rounded ${
                page === i + 1
                  ? "bg-yellow-400 text-yellow-900 font-bold"
                  : "bg-white text-gray-800 border border-gray-300 hover:bg-yellow-300 hover:text-yellow-900"
              }`}
            >
              {i + 1}
            </a>
          ))}

          <a
            href={`/products?page=${page + 1}`}
            className={`px-4 py-2 rounded ${
              page === totalPages
                ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                : "bg-yellow-300 text-yellow-900 hover:bg-yellow-400"
            }`}
            aria-disabled={page === totalPages}
          >
            Next
          </a>
        </div>
      </div>
    </>
  );
}
