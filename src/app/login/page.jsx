import Navbar from "@/app/components/ui/Navbar";

export const metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
    headers: {
      "Content-Type": "application/json",
      apiKey: "w05KkI9AWhKxzvPFtXotUva-",
    },
    // cache: "no-store",  <-- hapus ini agar Next.js cache fetch
  });

  if (!res.ok) {
    return <div className="text-center mt-10 text-red-600">Gagal memuat data makanan</div>;
  }

  const data = await res.json();
  const allFoods = data.data || [];

  // Pilih satu makanan random *sekali* saat build/render, tetap sama tiap reload selama cache berlaku
  const randomFood = allFoods[Math.floor(Math.random() * allFoods.length)];

  return (
    <>
      <Navbar pathname="/login" />
      <div className="min-h-screen flex items-center justify-center bg-yellow-200 px-8 py-12">
        <div className="flex flex-col md:flex-row max-w-7xl w-full bg-yellow-400 rounded-3xl shadow-2xl overflow-hidden">
          {/* Form di kiri */}
          <div className="flex flex-col justify-center p-16 md:w-1/2 bg-yellow-100">
            <h2 className="text-5xl font-extrabold text-yellow-700 mb-8 text-center md:text-left">Welcome Back!</h2>
            <p className="text-yellow-900 text-lg mb-12 text-center md:text-left">
              Masuk dan nikmati makanan favoritmu 🍽️
            </p>

            <form action="/api/login" method="POST" className="space-y-8">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 text-lg"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-5 border border-yellow-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 text-lg"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-5 rounded-lg font-bold text-2xl transition"
              >
                Login
              </button>
            </form>

            {/* Link daftar di bawah form */}
            <p className="mt-6 text-center text-yellow-900 text-lg">
              Belum punya akun?{" "}
              <a href="/register" className="font-semibold underline hover:text-yellow-700 cursor-pointer">
                Daftar di sini
              </a>
            </p>
          </div>

          {/* Foto makanan di kanan */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center relative overflow-hidden">
            <img
              src={randomFood.imageUrl}
              alt={randomFood.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-10 left-10 bg-yellow-400 bg-opacity-70 rounded-lg px-6 py-3">
              <p className="text-white font-semibold">Menu Favorit Hari Ini</p>
              <p className="text-white text-2xl font-semibold">{randomFood.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
