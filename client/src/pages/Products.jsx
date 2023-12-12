import { useState, useEffect } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      setProducts(data.response);
    } catch (error) {
      setLoading(false);
      if (error.name === "AbortError") {
        setError("La solicitud fue abortada. ¿La API está disponible?");
      } else {
        setError(`Error al cargar productos: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Products</h1>
      {loading ? <p className="text-center">Cargando...</p> : null}
{error && <p className="text-center text-red-500">{error}</p>}
      {products && products.map((product) => (
        <div key={product._id} className="border p-3 my-2">
          <p className="text-xl font-semibold">{product.title}</p>
          <p className="text-lg">{product.description}</p>
          <p className="text-lg">Price: {product.price}</p>
          <p className="text-lg">Stock: {product.stock}</p>
          <p className="text-lg">Category: {product.category}</p>
          <p className="text-lg">Owner: {product.owner}</p>
          <p className="text-lg">Code: {product.code}</p>
          <p className="text-lg">Thumbnail: {product.thumbnail}</p>
        </div>
      ))}
    </div>
  );
}
