import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { addToCart } from "../features/cardSlice"; // Ensure correct import path
import Modle from "../components/modle";

export default function ProductInfo() {
  const { id } = useParams(); // Extract product ID from route parameters
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  // Fetch product by ID from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/products/${id}`); // Correct endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching the product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      try {
        dispatch(
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: parseInt(quantity, 10),
            totalPrice: product.price * parseInt(quantity, 10),
            image: product.imageUrl,
          })
        );
        setModalMessage("Product added to cart!");
        setIsModalOpen(true);
        setQuantity(1); // Reset quantity
      } catch (error) {
        console.error("Error adding to cart:", error);
        setModalMessage("Failed to add the product to the cart. Please try again.");
        setIsModalOpen(true);
      }
    } else {
      setModalMessage("Please enter a valid quantity.");
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="container mx-auto my-10 p-4  ">
      <div className="card bg-base-100 shadow-lg rounded-lg items-center  overflow-hidden md:flex md:gap-6">
        <figure className="w-full md:w-1/2">
          <img
            src={product.image || "/placeholder-image.jpg"}
            alt={product.name || "Product"}
            className="object-cover h-64 w-full md:h-full"
          />
        </figure>
        <div className="p-4 md:p-6 flex flex-col justify-between w-full">
          <div>
            <h2 className="text-lg md:text-2xl font-bold mb-2">
              {product.name || "Default Product Name"}
            </h2>
            <p className="text-gray-600 mb-4">
              {product.description || "No description available for this product."}
            </p>
            <p className="font-bold text-xl text-primary mb-6">
              £{product.price?.toFixed(2) || "0.00"}
            </p>
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-4 mb-4">
              <input
                type="number"
                placeholder="Quantity"
                className="input input-bordered w-1/2 sm:w-1/3"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              />
              <button
                className="btn btn-primary w-1/2 sm:w-1/3"
                onClick={handleAddToCart}
                disabled={!product.id || !product.price}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modle
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
