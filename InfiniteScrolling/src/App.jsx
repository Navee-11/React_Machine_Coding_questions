import { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${page * 10}`,
      );
      const data = await response.json();
      console.log(data);
      setProducts(data);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const myThrottle = (cb, delay) => {
    let last = 0;
    return (...args) => {
      let now = new Date().getTime();
      if (now - last < delay) {
        return;
      }
      last = now;
      return cb(...args);
    };
  };
  const handleScroll = myThrottle(() => {
    //loading is added to prevent the API call when it is already fetching
    if (
      window.innerHeight + document.documentElement.scrollTop + 500 >
        document.documentElement.offsetHeight &&
      !loading &&
      products.limit < products.total
    ) {
      fetchProducts();
    }
  }, 500);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  const { products: allProducts } = products;
  return (
    <div>
      <h1>Infinite Scrolling</h1>
      {allProducts?.length > 0 && (
        <div className="products">
          {allProducts?.map((prod) => {
            return (
              <div className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </div>
            );
          })}
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default App;
