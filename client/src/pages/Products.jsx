import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess, signOutUserStart, deleteUserStart } from "../redux/user/userSlice";

export default function Product() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { currentUser, setCurrentUser, loading, error } = useSelector((state) => state.user);

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products function
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      // Restablecer el estado del usuario después de la eliminación
      setCurrentUser(null);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      // Restablecer el estado del usuario después de cerrar sesión
      setCurrentUser(null);
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleAddtoCart = async (productId) => {
    try {
      // Verificar si hay un usuario autenticado
      if (!currentUser) {
        // Puedes manejar la falta de usuario según tus necesidades
        console.error("No user is currently authenticated");
        return;
      }

      // Verificar si el usuario tiene un carrito asignado
      if (!currentUser.cartId) {
        // Puedes manejar la falta de carrito según tus necesidades
        console.error("User does not have a cart assigned");
        console.log(currentUser.cartId);
        return;
      }

      const response = await fetch(`/api/carts/${currentUser.cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding to cart:", errorData.message);
        // Puedes manejar el mensaje de error según tus necesidades
      }

      // Actualizar los datos del usuario después de agregar al carrito
      const userDataResponse = await fetch(`/api/auth/${currentUser._id}`);
      const userData = await userDataResponse.json();
      dispatch(setCurrentUser(userData));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Products</h1>
      {loading ? <p className="text-center">Loading...</p> : null}
      {error && <p className="text-center text-red-500">{error}</p>}
      {products &&
        products.map((product) => (
          <div key={product._id} className="border p-3 my-2">
            <p className="text-xl font-semibold">{product.title}</p>
            <p className="text-lg">{product.description}</p>
            <p className="text-lg">Price: {product.price}</p>
            <p className="text-lg">Stock: {product.stock}</p>
            <p className="text-lg">Category: {product.images}</p>
            <button onClick={() => handleAddtoCart(product._id)}>
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  );
}


