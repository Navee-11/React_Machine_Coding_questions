import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    // const res = await fetch("https://dummyjson.com/products?limit=100");
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`,
    );
    const data = await res.json();
    console.log(data);
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 10));
    }
  };
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage !== page &&
      selectedPage <= totalPages
    )
      setPage(selectedPage);
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <div className="app">
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
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
        <div className="pagination">
          {page > 1 && (
            <span onClick={() => selectPageHandler(page - 1)}>◀️</span>
          )}
          {/* {Array.from({ length: products.length / 10 }).map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))} */}
          {[...Array(totalPages)].map((_, i) => (
            <span
              className={page === i + 1 ? "pagination__selected" : ""}
              onClick={() => selectPageHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}
          {page < totalPages && (
            <span onClick={() => selectPageHandler(page + 1)}>▶️</span>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
