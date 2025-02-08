import { Link } from "react-router";

export default function Product({ id, price, image, name }) {
  return (
    <div className="">
      <div className="card bg-base-100 w-72 shadow-xl mb-4">
        <figure className="px-10 pt-10">
          <img src={image||'../assets/2.jpg'} alt={name || "Product"} />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name || "Product Name"}</h2>
          <p className="font-bold text-xl">{price} £</p>
          <div className="card-actions">
            {/* Link navigates to the dynamic route with the product ID */}
            <Link to={`/Productinfo/${id}`} className="btn btn-primary">
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
