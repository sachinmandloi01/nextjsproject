import axios from "axios";

import showToaster from "../../../components/Toaster/Toaster";
import { cartData } from "../../reducer/Cart";
export const getCart = () => async (dispatch) => {
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/cart`)
    .then((response) => {
      dispatch(cartData(response.data));

      showToaster("success", "Logged In Successfully");
    })
    .catch((err) => {
      console.warn("Something Went Wrong", err);
    });
};
