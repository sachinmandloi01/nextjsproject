import axios from "axios";
import { userProfileData } from "../../reducer/Login";
import showToaster from "../../../components/Toaster/Toaster";
export const postRegistration = (data, router) => async (dispatch) => {
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/user`, data)
    .then((response) => {
      router.push("/signin");
      showToaster("success", "Your Account Has Been Created Successfully");
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

export const postLogin = (data, router) => async (dispatch) => {
  await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data)
    .then((response) => {
      dispatch(userProfileData(response.data));
      showToaster("success", "Logged In Successfully");
      response?.data?.role === 1
        ? router.push("/product-list")
        : response?.data?.role === 3
        ? router.push("/product-list")
        : router.push("/");
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
