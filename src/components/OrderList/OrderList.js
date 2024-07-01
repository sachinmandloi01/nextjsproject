// pages/products.js
import { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/action/Product";
import { getAllOrder } from "../../redux/action/Order";
const productSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  image: Yup.mixed().required("A file is required"),
});
const Myorder = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state?.product?.productsData);
  const userData = useSelector((state) => state?.login?.userData);
  const userOrders = useSelector((state) => state?.cart?.allOrders);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setForm({ ...form, image: file });
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);
  };
  useEffect(() => {
    if (userData?.access_token) {
      dispatch(getAllOrder(userData?.access_token));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    setProducts(productData);
  }, [productData]);
  const handleClose = () => {
    setShow(false);
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", image: "" });
    setPreviewUrl(null);
    setErrors({});
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productSchema.validate(form, { abortEarly: false });
      if (editingProduct !== null) {
        const formData = new FormData();
        formData.append("image", form.image);
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("description", form.description);
        const editId = form._id;
        dispatch(updateProduct(formData, editId));
      } else {
        const formData = new FormData();
        formData.append("image", form.image);
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("description", form.description);
        dispatch(addProduct(formData));
      }
      handleClose();
    } catch (validationErrors) {
      const errorMessages = {};
      validationErrors.inner.forEach((error) => {
        errorMessages[error.path] = error.message;
      });
      setErrors(errorMessages);
    }
  };

  const handleEdit = (index) => {
    setEditingProduct(index);
    setForm(products[index]);
    setPreviewUrl(
      `${process.env.NEXT_PUBLIC_API_URL}/uploads/${products[index].image}`
    );
    handleShow();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    //setProducts(products.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="container mt-5">
      <h1>Order</h1>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {userOrders?.length > 0 &&
            userOrders.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.address}</td>
                <td>${product.total}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct !== null ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
                //required
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter product description"
                value={form.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductPrice" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter product price"
                value={form.price}
                onChange={handleChange}
                isInvalid={!!errors.price}
                // required
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductImage" className="mt-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                name="image"
              />
              {previewUrl && (
                <div className="mb-3">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="img-thumbnail"
                  />
                </div>
              )}
              {errors.image && (
                <div className="text-danger mt-3">{errors.image}</div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              {editingProduct !== null ? "Update Product" : "Add Product"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Myorder;
