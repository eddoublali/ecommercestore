import Slide from '../components/Slide';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar' 

import { Outlet } from "react-router"


export default function Home() {
  return (
    <div>

      <Navbar />

   
      <div className="mt-20">
      <Slide />
      </div>

      <Outlet />
   ²

      <Footer /> 
    </div>
  );
}
