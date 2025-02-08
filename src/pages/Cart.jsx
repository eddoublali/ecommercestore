import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../features/cardSlice";
import { Link } from "react-router";
import Cartitem from "../components/Cartitem";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalQuantity = useSelector(selectCartTotalQuantity);

 
  const handleClearCart = () => {
    dispatch(clearCart());
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
            <Cartitem key={item.id} item={item} />
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
