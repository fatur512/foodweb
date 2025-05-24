import Navbar from "./components/ui/Navbar";
import Link from "next/link";

async function getFoods() {
  const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
    headers: {
      "Content-Type": "application/json",
      apiKey: "w05KkI9AWhKxzvPFtXotUva-",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal mengambil data makanan");

  const data = await res.json();
  return data.data.slice(0, 4);
}

export default async function HomePage() {
  let foods = [];

  try {
    foods = await getFoods();
  } catch (error) {
    return (
      <>
        <Navbar pathname="/" />
        <main className="p-6 text-center text-red-600">Gagal memuat menu: {error.message}</main>
      </>
    );
  }

  const heroFood = foods[0]; // makanan pertama untuk hero section

  return (
    <>
      <Navbar pathname="/" />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section
          className="relative h-[60vh] bg-center bg-cover flex items-center justify-center text-white"
          style={{
            backgroundImage: `url(${heroFood.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/60 w-full h-full absolute inset-0" />
          <div className="relative z-10 text-center px-6">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
              Selamat Datang di <span className="text-yellow-400">Makan Yuk!</span>
            </h1>
            <p className="text-lg sm:text-xl max-w-xl mx-auto drop-shadow">
              Nikmati sajian lezat seperti <strong>{heroFood.name}</strong> dan banyak lainnya hanya di sini.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-block bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-6 rounded-lg transition"
            >
              Jelajahi Menu
            </Link>
          </div>
        </section>

        {/* Preview Section */}
        <section className="p-6 max-w-7xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Menu Pilihan Hari Ini</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {foods.map((food) => (
              <div
                key={food.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
              >
                <img src={food.imageUrl} alt={food.name} className="w-full h-40 object-cover" />
                <div className="p-4 flex-grow">
                  <h3 className="font-semibold text-lg text-gray-800">{food.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{food.description}</p>
                </div>
                <div className="p-4">
                  <Link
                    href={`/products/${food.id}`}
                    className="block bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold py-2 text-center rounded-lg"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-6 rounded-lg transition"
            >
              Lihat Semua Menu
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
