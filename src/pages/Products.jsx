import Product from "./Product";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";

export default function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSort = (type) => {
    setSortBy(type);
  };

  const sortedProducts = [...(products || [])].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "recent") return b.id - a.id;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

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
            <li className="cursor-pointer hover:underline" onClick={() => handleSort("price")}>Prix</li>
            <li className="cursor-pointer hover:underline" onClick={() => handleSort("recent")}>Plus récent</li>
            <li className="cursor-pointer hover:underline" onClick={() => handleSort("name")}>A-Z</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 ml-6 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map(({ id, price, image, name }) => (
            <Product key={id} price={price} image={image} id={id} name={name} />
          )) || <p>No products found.</p>}
        </div>
      </div>

      <div className="flex items-center justify-center my-5">
        <div className="join flex items-center">
          <button
            className="join-item btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>
          <span className="px-4">Page {currentPage} of {totalPages}</span>
          <button
            className="join-item btn"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
}
