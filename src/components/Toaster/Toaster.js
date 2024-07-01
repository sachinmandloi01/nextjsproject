import toast from "react-hot-toast";

const showToaster = (type, message, time) => {
  if (type === "success") {
    return toast.success(message, {
      duration: time === undefined ? 1500 : 4000,
      style: {
        width: "295px",
        color: "green",
        fontSize: "15px",
        fontWeight: "600",
        padding: "10px",
        border: "1px solid white",
        whiteSpace: "nowrap",
      },
    });
  } else if (type === "error") {
    return toast.error(message, {
      duration: 1000,
      style: {
        width: "295px",
        color: "red",
        fontSize: "15px",
        fontWeight: "600",
        padding: "10px",
        border: "1px solid red",
      },
    });
  }
};

export default showToaster;
