import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import {selectCartItems,} from "../features/cardSlice";
export default function Navbar() {
  // const cartLength = useSelector((state) => state.cart.cartItems.length);
  const cartItems = useSelector(selectCartItems);
  return (
    <div className="fixed w-full top-0 left-0 z-40">
      <div className="navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl font-bold ">
          Parfums
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li >
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/cart" className="btn flex items-center">
            <ShoppingCart className="mr-2" />
            <span>({cartItems.length})</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
