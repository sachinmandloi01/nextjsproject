import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { resetLogin } from "../redux/reducer/Login";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartDatas = useSelector((state) => state?.cart?.cartData);
  const userData = useSelector((state) => state?.login?.userData);
  const logout = () => {
    //showToaster(success, logoutSuccess);
    dispatch(resetLogin());
    localStorage.clear();
    setTimeout(async () => {
      (await router.push("/")) && router.reload();
    }, 1000);
  };
  const pathToAllow = ["/product-list", "/order-list", "/profile", "/question"];

  if (userData?.role === 1 && !pathToAllow?.includes(router.route)) {
    router.push("/product-list");
  }
  const pathToAllow1 = ["/myorders", "/cart", "/checkout"];

  if (userData?.role === 2 && !pathToAllow1?.includes(router.route)) {
    router.push("/");
  }
  return (
    <>
      <header className="p-3 border-bottom bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-3 text-center">
              <Link href="/">
                <img alt="logo" src="../../images/logo.webp" />
              </Link>
            </div>
            <div className="col-md-5">
              <form action="#" className="search">
                <div className="input-group">
                  <input
                    id="search"
                    name="search"
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    required
                  />
                  <label className="visually-hidden" htmlFor="search"></label>
                  <button
                    className="btn btn-primary text-white"
                    type="submit"
                    aria-label="Search"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-4">
              {(userData?.role !== 1 || !userData) && (
                <div className="position-relative d-inline me-3">
                  <Link href="/cart" className="btn btn-primary">
                    <i className="bi bi-cart3"></i>
                    <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                      {cartDatas?.length}
                    </div>
                  </Link>
                </div>
              )}
              {userData?.access_token && (
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-circle border me-3"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Profile"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-fill text-light"></i>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" href="/profile">
                        <i className="bi bi-person-square"></i> My Profile
                      </Link>
                    </li>

                    {userData?.role === 2 && (
                      <li>
                        <Link className="dropdown-item" href="/myorders">
                          <i className="bi bi-list-check text-primary"></i> My
                          Orders
                        </Link>
                      </li>
                    )}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li onClick={() => logout()}>
                      <i className="bi bi-door-closed-fill text-danger"></i>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
              {/* <Link to="/account/signin">Sign In</Link> |{" "}
            <Link to="/account/signup"> Sign Up</Link> */}
            </div>
          </div>
        </div>
      </header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            E-Commerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              {!userData?.access_token && (
                <li className="nav-item">
                  <Link className="nav-link" href="/signin">
                    Sign In
                  </Link>
                </li>
              )}
              {userData?.role === 1 && (
                <li className="nav-item">
                  <Link className="nav-link" href="/product-list">
                    Product list
                  </Link>
                </li>
              )}
              {userData?.role === 1 && (
                <li className="nav-item">
                  <Link className="nav-link" href="/order-list">
                    Order
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
