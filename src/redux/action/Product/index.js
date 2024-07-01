import axios from "axios";
import showToaster from "../../../components/Toaster/Toaster";
import { productsData } from "../../reducer/Product";
export const getProduct = () => async (dispatch) => {
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    .then((response) => {
      dispatch(productsData(response.data));
    })
    .catch((err) => {
      showToaster(
        "error",
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something Went Wrong"
      );
      console.warn("Something Went Wrong", err);
    });
};
export const addProduct = (data, token) => async (dispatch) => {
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/products`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      dispatch(getProduct());
      showToaster("success", "product added successfully");
    })
    .catch((err) => {
      showToaster(
        "error",
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something Went Wrong"
      );
      console.warn("Something Went Wrong", err);
    });
};
export const updateProduct = (data, id, token) => async (dispatch) => {
  await axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      dispatch(getProduct());

      showToaster("success", "product updatd successfully");
    })
    .catch((err) => {
      showToaster(
        "error",
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something Went Wrong"
      );

      console.warn("Something Went Wrong", err);
    });
};
export const deleteProduct = (id, token) => async (dispatch) => {
  await axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      dispatch(getProduct());

      showToaster("success", "item deleted");
    })
    .catch((err) => {
      showToaster(
        "error",
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something Went Wrong"
      );
      console.warn("Something Went Wrong", err);
    });
};
