import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = 8;

  try {
    const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
      headers: {
        "Content-Type": "application/json",
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Gagal mengambil data makanan" }, { status: 500 });
    }

    const data = await res.json();
    const allFoods = data.data || [];

    // Pagination slice
    const totalPages = Math.ceil(allFoods.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const currentFoods = allFoods.slice(startIndex, startIndex + itemsPerPage);

    return NextResponse.json({
      foods: currentFoods,
      page,
      totalPages,
      totalItems: allFoods.length,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
