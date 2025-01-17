import Product from './Product'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/productsSlice';
export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div> <span className="loading loading-spinner loading-xs"></span>
  </div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  return (

    <><div className="mb-16 mt-16 ">
    <div className="container m-auto px-10 md:flex md:justify-between text-center"> 
       <h1 className="font-bold text-3xl ">Parfum Homme</h1>
       <ul className="flex gap-4">
         <li className='font-bold'>Trié par :</li>
         <li>Prix</li>
         <li>Plus récent</li>
         <li>A-Z</li>
       </ul>
   </div>
   
     
   <div className="grid grid-cols-1 ml-6 md:grid-cols-3 lg:grid-cols-4">
   
    { products.map((product)=>{
  
      return <Product key={product.id} price={product.price} image={product.image} id={product.id} />
    })

    }
    </div> </div>

    
    <div className="flex items-center justify-center my-5">
  <div className="join flex items-center justify-center">
    <button className="join-item btn">«</button>
    <button className="join-item btn">Page 1</button>
    <button className="join-item btn">»</button>
  </div>
</div>

    
</>
  )
}
