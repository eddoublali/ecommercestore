import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,

  clearCart,
  incrementQuantity,
  decrementQuantity,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../features/cardSlice";
import { Link } from "react-router";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-6">
        Mon Panier
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Votre panier est vide.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between bg-white border rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center w-full md:w-1/3">
                <p className="text-lg font-medium text-gray-800">{item.name}</p>
              </div>
              <div className="flex flex-col md:flex-row items-center w-full md:w-2/3 justify-between mt-4 md:mt-0">
                <div className="text-gray-800">
                  Prix: {item.price.toFixed(2)} €
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-4 py-1 transition"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full px-4 py-1 transition"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <div className="text-gray-800">
                  Total: {item.totalPrice.toFixed(2)} €
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition mt-4 md:mt-0"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md mt-6">
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
            >
              Vider le panier
            </button>
            <button
              className="bg-black text-white py-2 px-6 rounded-lg  transition"
            >
             <Link to="/check-out"> Check-Out</Link>
            </button>
            <div className="text-right mt-4 md:mt-0">
              <h4 className="text-lg">Nombre darticles: {totalQuantity}</h4>
              <h3 className="text-2xl font-semibold">
                Total: {totalAmount.toFixed(2)} €
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
