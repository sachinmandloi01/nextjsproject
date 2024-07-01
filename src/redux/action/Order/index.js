import axios from "axios";
import showToaster from "../../../components/Toaster/Toaster";
import { cartData, userOrderData, allOrderData } from "../../reducer/Cart";

export const postOrder = (data, router) => async (dispatch) => {
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, data)
    .then((response) => {
      dispatch(cartData([]));
      router.push("/");
      showToaster("success", "Your Order Has Been Successfully Submitted");
    })
    .catch((err) => {
      showToaster(
        "error",
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something Went Wrong"
      );
      console.warn("Something Went Wrong");
    });
};
export const getOrderByUserId = (id, token) => async (dispatch) => {
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/orders/orderByUser/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      dispatch(userOrderData(response.data));
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

export const getAllOrder = (token) => async (dispatch) => {
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      dispatch(allOrderData(response.data));
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
