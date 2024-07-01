import { useSelector, useDispatch } from "react-redux";
// import { setQty, removeItem } from '../cartSlice';
import Link from "next/link";
import { useEffect } from "react";
import { cartData } from "../../redux/reducer/Cart";
import { useRouter } from "next/router";
const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartDatas = useSelector((state) => state?.cart?.cartData);
  const handleQtyChange = (e, id) => {
    const qty = parseInt(e.target.value);
    let cartItems = cartDatas.map((item) =>
      item._id === id ? { ...item, qty: qty } : item
    );
    dispatch(cartData(cartItems));
  };
  const handleRemove = (id) => {
    let cartItems = cartDatas.filter((item) => item._id !== id);
    dispatch(cartData(cartItems));
  };
  const handleCheckout = () => {
    router.push("/checkout");
  };
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Shopping Cart</h1>
      {cartDatas.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link href="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartDatas.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.qty}
                      min="1"
                      onChange={(e) => handleQtyChange(e, item._id)}
                    />
                  </td>
                  <td>${(item.price * item.qty).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemove(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-success"
            onClick={() => handleCheckout()}
            type="button"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
