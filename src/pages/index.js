import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/action/Product";
import { cartData } from "../redux/reducer/Cart";
export default function Home() {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state?.product?.productsData);
  let cartDatas = useSelector((state) => state?.cart?.cartData);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const addToCart = (product) => {
    const productToAdd = { ...product, qty: 1 };
    let updatedCartDatas = cartDatas ? [...cartDatas] : [];

    const existingProductIndex = updatedCartDatas.findIndex(
      (item) => item._id === productToAdd._id
    );

    if (existingProductIndex >= 0) {
      updatedCartDatas = updatedCartDatas.map((item, index) =>
        index === existingProductIndex ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCartDatas.push(productToAdd);
    }

    dispatch(cartData(updatedCartDatas));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Products</h1>
      <div className="row">
        {productData?.length > 0 &&
          productData?.map((product) => (
            <div className="col-md-4 mb-4" key={product._id}>
              <div className="card h-100">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.image}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">${product.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
