export default function ProductCard({ name, image, price }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden flex flex-col">
      <img src={image} alt={name} className="h-64 object-cover w-full" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="mt-2 font-bold text-xl text-black">{price}</div>
        <button className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800">Add to Cart</button>
      </div>
    </div>
  );
}
