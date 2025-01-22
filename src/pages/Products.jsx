import Product from "./Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-16 mt-16">
        <div className="container m-auto px-10 md:flex md:justify-between text-center">
          <h1 className="font-bold text-3xl">Parfum Homme</h1>
          <ul className="flex gap-4 justify-center md:justify-end">
            <li className="font-bold">Trié par:</li>
            <li className="cursor-pointer hover:underline">Prix</li>
            <li className="cursor-pointer hover:underline">Plus récent</li>
            <li className="cursor-pointer hover:underline">A-Z</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 ml-6 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map(({ id, price, image }) => (
            <Product key={id} price={price} image={image} id={id} />
          )) || <p>No products found.</p>}
        </div>
      </div>

      <div className="flex items-center justify-center my-5">
        <div className="join flex items-center">
          <button className="join-item btn">«</button>
          <button className="join-item btn">Page 1</button>
          <button className="join-item btn">»</button>
        </div>
      </div>
    </>
  );
}