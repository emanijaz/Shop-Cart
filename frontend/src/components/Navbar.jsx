export default function Navbar() {
  return(
    <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm py-3">
      <div class="container">
        <a class="navbar-brand fw-bold fs-4" href="/#">ShopCart</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/#">Products</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/#">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/#">Contact</a>
            </li>
          
          </ul>
          {/* <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-primary" type="submit">Search</button>
          </form> */}
          <button type="button" class="btn btn-outline-dark mx-2"><i class="fa fa-sign-in me-1" aria-hidden="true"></i>Login</button>
          <button type="button" class="btn btn-outline-dark me-2"><i class="fa fa-user-plus me-1" aria-hidden="true"></i>Register</button>
          <button type="button" class="btn btn-outline-dark me-2"><i class="fa fa-shopping-cart me-1" aria-hidden="true"></i>Cart(2)</button>

        </div>
      </div>
    </nav>
  );
}