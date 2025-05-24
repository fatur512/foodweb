import Navbar from "@/app/components/ui/Navbar";
import FoodActions from "@/app/components/FoodActions"; // ✅ Import tombol client

async function getFoodById(id) {
  const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
    headers: {
      "Content-Type": "application/json",
      apiKey: "w05KkI9AWhKxzvPFtXotUva-",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch foods");

  const data = await res.json();
  const food = data.data.find((f) => f.id === id);

  if (!food) throw new Error("Food not found");

  return food;
}

export default async function FoodDetail({ params }) {
  const { id } = params;

  let food;
  try {
    food = await getFoodById(id);
  } catch (error) {
    return <div className="text-center mt-10 text-red-600">Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-yellow-600">{food.name}</h1>
        <img src={food.imageUrl} alt={food.name} className="w-full h-64 object-cover rounded-lg mb-6" />
        <p className="mb-4 text-gray-700">{food.description}</p>
        <p className="mb-2">
          <strong>Price:</strong> {food.price ? `Rp ${food.price}` : "Not available"}
        </p>
        <p className="mb-2">
          <strong>Ingredients:</strong> {food.ingredients.join(", ")}
        </p>
        <p className="mb-2">
          <strong>Rating:</strong> {food.rating}
        </p>
        <p className="mb-2">
          <strong>Likes:</strong> {food.totalLikes}
        </p>

        {/* Tombol Update & Delete */}
        <FoodActions foodId={food.id} />
      </div>
    </>
  );
}
