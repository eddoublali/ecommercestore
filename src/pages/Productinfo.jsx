import { useParams } from "react-router";
import { addToCart } from "../features/cardSlice";
import { getProductinfo } from "../features/productsSlice";
import Modal from "../components/modle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import defaultImage from '../assets/2.jpg';

export default function Productinfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [imageError, setImageError] = useState(false);

  const { product, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (id && !isNaN(parseInt(id, 10))) {
      dispatch(getProductinfo(parseInt(id, 10)));
    }
  }, [id, dispatch]);

  const handleAddToCart = () => {
    if (quantity > 0 && product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        totalPrice: product.price * quantity,
        image: product.image,
      }))
        .unwrap()
        .then(() => {
          setModalMessage("Product added to cart!");
          setQuantity(1);
        })
        .catch(() => {
          setModalMessage("Failed to add the product to the cart. Please try again.");
        })
        .finally(() => setIsModalOpen(true));
        
    } else {
      setModalMessage("Please enter a valid quantity.");
      setIsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!product) return <p className="text-center">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
            <div className="relative h-96 lg:h-[600px] overflow-hidden bg-gray-100">
            <img
  src={imageError || !product.image ? defaultImage : product.image}
  onError={() => setImageError(true)}
  alt={product.name}
  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
/>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <p className="text-xl font-semibold text-primary">
                    £{product.price?.toFixed(2)}
                  </p>
                </div>

                <div className="prose prose-lg text-gray-500">
                  <p>{product.description}</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                    
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        className="input input-bordered  text-center w-full"
                        aria-label="Quantity"
                      />
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={!product.id || !product.price}
                      className="w-full btn btn-primary btn-lg transform transition-transform duration-200 hover:scale-[1.02]"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="block font-medium text-gray-700">Free Delivery</span>
                    <span>On orders over £50</span>
                  </div>
                  <div>
                    <span className="block font-medium text-gray-700">Returns</span>
                    <span>30-day return policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}