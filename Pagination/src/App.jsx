import React, { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    /*  const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`,
    ); */
    const data = await res.json();
    console.log(data);
    if (data && data.products) {
      setProducts(data.products);
      // setTotalPages(Math.ceil(data.total / 10));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="app">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <Pagination products={products} page={page} setPage={setPage} />
      )}
    </div>
  );
};

export default App;
