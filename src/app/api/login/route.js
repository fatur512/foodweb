import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function POST(req) {
  const formData = await req.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response("Login gagal: " + data.message, {
        status: 401,
      });
    }

    // Simpan token ke cookie
    cookies().set("token", data.token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    // Redirect ke home
    return redirect("/");
  } catch (err) {
    return new Response("Terjadi kesalahan server", { status: 500 });
  }
}
