import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Graphic Tee",
    image: "/assets/product1.jpg",
    price: "₹499",
  },
  {
    id: 2,
    name: "Minimal Tee",
    image: "/assets/product2.jpg",
    price: "₹599",
  },
  {
    id: 3,
    name: "Oversized Tee",
    image: "/assets/product3.jpg",
    price: "₹699",
  },
  {
    id: 4,
    name: "Classic Tee",
    image: "/assets/product4.jpg",
    price: "₹399",
  },
  {
    id: 5,
    name: "Trendy Tee",
    image: "/assets/product5.jpg",
    price: "₹549",
  },
  {
    id: 6,
    name: "Streetwear Tee",
    image: "/assets/product6.jpg",
    price: "₹749",
  },
];

export default function ProductGrid() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
