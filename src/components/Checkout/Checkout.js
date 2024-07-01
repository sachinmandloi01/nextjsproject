import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { useEffect } from "react";
import { postOrder } from "../../redux/action/Order";
import { useRouter } from "next/router";
const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.cartData);
  const userData = useSelector((state) => state?.login?.userData);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});

  const checkoutSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("Zip code is required"),
  });
  useEffect(() => {
    const setData = {
      name: userData.name,
      email: userData.email,
      address: userData.address,
    };

    setFormData({
      ...formData,
      ...setData,
    });
  }, [userData]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await checkoutSchema.validate(formData, { abortEarly: false });
      const updateData = formData;
      updateData.products = cartItems;
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.qty,
        0
      );
      updateData.total = totalPrice;
      updateData.userId = userData.id;
      dispatch(postOrder(updateData, router));
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Checkout</h1>
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address}</div>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.city ? "is-invalid" : ""}`}
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <div className="invalid-feedback">{errors.city}</div>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.state ? "is-invalid" : ""}`}
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && (
                  <div className="invalid-feedback">{errors.state}</div>
                )}
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.zip ? "is-invalid" : ""}`}
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
                {errors.zip && (
                  <div className="invalid-feedback">{errors.zip}</div>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Place Order
            </button>
          </form>
        </div>
        <div className="col-md-4">
          <h2>Order Summary</h2>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="list-group-item d-flex justify-content-between"
              >
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">{item.description}</small>
                </div>
                <span className="text-muted">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </li>
          </ul>
          <Link href="/cart" className="btn btn-secondary btn-block">
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
