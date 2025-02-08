import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart
} from "../features/cardSlice";

export default function Cartitem({item}) {
    const dispatch = useDispatch();
  
  const handleIncreaseQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decrementQuantity(id));
    console.log(item);
  };
   const handleRemove = (id) => {
      dispatch(removeFromCart(id));
    };
  
  return (
    <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between bg-white border rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center w-full md:w-1/3">
                <p className="text-lg font-medium text-gray-800">{item.name}</p>
              </div>
              <div className="flex items-center w-full md:w-1/3">
                <img className="w-16 h-16 object-cover mr-4" src={item.image} alt={item.name} />
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
  )
}
