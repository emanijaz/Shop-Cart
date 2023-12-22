import React from "react";

export default function Footer() {
  return (
    <footer className="bg-body-tertiary text-center">
      <hr/>
      <div class="container p-4">
        <section className="mb-4 ">
          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i class="fa fa-brands fa-facebook"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i class="fa fa-brands fa-instagram"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i class="fa fa-brands fa-twitter"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i class="fa fa-brands fa-google"></i>
          </a>

          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i class="fa fa-brands fa-linkedin"></i>
          </a>
          <a
            data-mdb-ripple-init
            className="btn btn-outline btn-floating m-1"
            href="#!"
            role="button"
          >
            <i class="fa fa-brands fa-github"></i>
          </a>
        </section>

        <section >
          <form>
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                </p>
              </div>
              <div className="col-md-5 col-12">
                <div data-mdb-input-init className="form-outline mb-4">
                  <input
                    type="email"
                    id="form5Example24"
                    className="form-control"
                    value="Email Address"
                  />
                </div>
              </div>
              <div className="col-auto">
                <button type="button" class="btn btn-outline-dark mb-4">Subscribe</button>
              </div>
            </div>
          </form>
        </section>
        <section className="mb-4">
          <p>
                            Welcome to ShopCart, your one-stop destination for all things trendy and fashionable. 
                            We are passionate about providing you with high-quality products that not only enhance 
                            your style but also fit seamlessly into your lifestyle. At ShopCart, we believe in the power of fashion to express individuality and 
                            boost confidence. Our carefully curated collection brings you the latest trends, timeless 
                            classics, and everything in between.
          </p>
        </section>
        <section>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">MENU</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a className="text-body" href="#!">
                  <i class="fa fa-solid fa-house-user mx-2"></i>Home
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                  <i class="fa fa-solid fa-info mx-2"></i>About
                  </a>
                </li>
                
                <li>
                  <a className="text-body" href="#!">
                  <i class="fa fa-brands fa-envira mx-2"></i> Gallery
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">CONTACT</h5>

              <ul className="list-unstyled mb-0">
                <li>
                  <a className="text-body" href="#!">
                  <i class="fa fa-solid fa-phone mx-2"></i>Phone
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                  <i class="fa fa-solid fa-address-book mx-2"></i>Address
                  </a>
                </li>
                <li>
                  <a className="text-body" href="#!">
                  <i class="fa fa-solid fa-envelope mx-2"></i>Email
                  </a>
                </li>
                
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              
            </div>
          </div>
        </section>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2020 Copyright SHOPCART
        
      </div>
    </footer>
  );
}
