import { createBrowserRouter } from "react-router";
import Home from '../pages/Home'
import Cart from "../pages/Cart";
import Products from '../pages/Products'
import Productinfo from "../pages/Productinfo";
import Checkout from "../pages/Checkout";
import Contact from "../pages/contact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        children: [
            {
              path: "/cart",  
              element: <Cart />,
            },
            {
              path: "/",  
              element: <Products />,
            },{
              path: "/Productinfo/:id",  
              element: <Productinfo />  // This is lowercase 'i'
            }
            ,
            {
              path:"/check-out",  
              element: <Checkout />,
            },
            {
              path:"/contact",  
              element: <Contact />,
            }
          ],
    },
    
    
]);
