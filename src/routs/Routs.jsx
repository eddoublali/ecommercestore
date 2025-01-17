import { createBrowserRouter } from "react-router";
import Home from '../pages/Home'
import Cart from "../pages/Cart";
import Products from '../pages/Products'
import Productinfo from "../pages/Productinfo";
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
            },
            {
              path:"/productinfo/:id",  
              element: <Productinfo />,
            },
          ],
    },
    
    
]);
