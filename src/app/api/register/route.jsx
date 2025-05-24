import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordRepeat = formData.get("passwordRepeat");
    const role = formData.get("role");

    // Validasi
    if (!name || !email || !password || !passwordRepeat || !role) {
      // Redirect ke form dengan query error
      return NextResponse.redirect(new URL("/register?error=Semua+field+wajib+diisi", request.url));
    }

    if (password !== passwordRepeat) {
      return NextResponse.redirect(new URL("/register?error=Password+dan+Repeat+Password+harus+sama", request.url));
    }

    // Kirim request ke API eksternal
    const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
      },
      body: JSON.stringify({ name, email, password, passwordRepeat, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.redirect(
        new URL(`/register?error=${encodeURIComponent(data.message || "Gagal register")}`, request.url)
      );
    }

    // Jika sukses, redirect ke halaman login dengan pesan sukses
    return NextResponse.redirect(new URL("/login?success=Register+berhasil,+silakan+login", request.url));
  } catch (error) {
    console.error("Error on register API:", error);
    return NextResponse.redirect(new URL("/register?error=Terjadi+kesalahan+server", request.url));
  }
}
