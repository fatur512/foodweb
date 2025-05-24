import Navbar from "@/app/components/ui/Navbar";

export const metadata = {
  title: "Register",
};

export default async function RegisterPage({ searchParams }) {
  // Ambil error & success dari query params
  const error = searchParams?.error || "";
  const success = searchParams?.success || "";

  // Fetch data makanan dari API, cache aktif default supaya gambar tetap sama antar reload
  const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
    headers: {
      "Content-Type": "application/json",
      apiKey: "w05KkI9AWhKxzvPFtXotUva-",
    },
    // cache: 'force-cache' // default kalau tidak diset, cache aktif
  });

  if (!res.ok) {
    return (
      <>
        <Navbar pathname="/register" />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-600">Gagal memuat data makanan</p>
        </div>
      </>
    );
  }

  const data = await res.json();
  const allFoods = data.data || [];

  // Ambil foto makanan pertama (tidak random, tetap sama tiap reload)
  const randomFood = allFoods.length > 0 ? allFoods[0] : null;

  return (
    <>
      <Navbar pathname="/register" />
      <div className="min-h-screen flex items-center justify-center bg-yellow-200 px-8 py-12">
        <div className="flex flex-col md:flex-row max-w-7xl w-full bg-yellow-400 rounded-3xl shadow-2xl overflow-hidden">
          {/* Form di kiri */}
          <div className="flex flex-col justify-center p-16 md:w-1/2 bg-yellow-100">
            <h2 className="text-5xl font-extrabold text-yellow-700 mb-8 text-center md:text-left">Register</h2>
            <p className="text-yellow-900 text-lg mb-12 text-center md:text-left">
              Buat akun baru dan nikmati makanan favoritmu 🍽️
            </p>

            {success && <p className="text-green-600 mb-4 text-center md:text-left">{success}</p>}
            {error && <p className="text-red-600 mb-4 text-center md:text-left">{error}</p>}

            <form action="/api/register" method="POST" className="space-y-8">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 text-lg"
                required
                autoComplete="name"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 text-lg"
                required
                autoComplete="email"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 text-lg"
                required
                autoComplete="new-password"
              />

              <input
                type="password"
                name="passwordRepeat"
                placeholder="Repeat Password"
                className="w-full p-5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 text-lg"
                required
                autoComplete="new-password"
              />

              <select
                name="role"
                className="w-full p-5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 text-lg"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Pilih Role
                </option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-5 rounded-lg font-bold text-2xl transition"
              >
                Register
              </button>
            </form>
          </div>

          {/* Gambar di kanan */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center relative overflow-hidden bg-yellow-300">
            {randomFood ? (
              <>
                <img
                  src={randomFood.imageUrl}
                  alt={randomFood.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-10 left-10 bg-yellow-400 bg-opacity-70 rounded-lg px-6 py-3">
                  <p className="text-white font-semibold text-lg">Menu Favorit Hari Ini</p>
                  <p className="text-white text-2xl font-semibold">{randomFood.name}</p>
                </div>
              </>
            ) : (
              <p className="text-yellow-900 text-center p-10">Gagal memuat gambar</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
