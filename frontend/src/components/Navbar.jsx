import { Link } from "react-router-dom";
export default function Navbar() {
  return(
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm py-3">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="/#">ShopCart</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/#">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/#">Contact</a>
            </li>
          
          </ul>
          {/* <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-primary" type="submit">Search</button>
          </form> */}
          <button type="button" className="btn btn-outline-dark mx-2"><i className="fa fa-sign-in me-1" aria-hidden="true"></i>Login</button>
          <button type="button" className="btn btn-outline-dark me-2"><i className="fa fa-user-plus me-1" aria-hidden="true"></i>Register</button>
          <button type="button" className="btn btn-outline-dark me-2">
            <Link to="/cart">
            <i className="fa fa-shopping-cart me-1" aria-hidden="true"></i>Cart(2)
            </Link>
          </button>

        </div>
      </div>
    </nav>
  );
}