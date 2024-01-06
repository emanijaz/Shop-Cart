import React from 'react'

const gradientStyle = {
    background: '#fccb90',

    background: '-webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',

    background: 'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
};

const gradientForm = {
    '@media (min-width: 768px)': {
        height: '100vh !important'
    },
    background: "#eee"
        
}
export default function SignUp() {
  return (
    <div><section className="h-100" style={gradientForm}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-10">
          <div className="card rounded-3 text-black">
            <div className="row g-0">
              <div className="col-lg-6">
                <div className="card-body p-md-5 mx-md-4">
  
                  <div className="text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{width: "185px"}} alt="abc"/>
                    <h4 className="mt-1 mb-5 pb-1">We are The ShopCart Team</h4>
                  </div>
  
                  <form>
                    <p>Please login to your account</p>
  
                    <div className="form-outline mb-4">
                      <input type="email" id="form2Example11" className="form-control"
                        placeholder="Email address" />
                      {/* <label className="form-label" for="form2Example11">Username</label> */}
                    </div>
  
                    <div className="form-outline mb-4">
                      <input type="password" id="form2Example22" className="form-control" placeholder="Password" />
                      {/* <label className="form-label" for="form2Example22">Password</label> */}
                    </div>
  
                    <div className="pt-1 mb-3 pb-1">
                    <button type="button" className="btn btn-dark btn-block mx-2">Login</button>
                    </div>
                    <div  className="mb-5 mx-2">
                      <a className="text-muted mt-3" href="#!">Forgot password?</a>

                    </div>
  
                    <div className="d-flex justify-content-left mx-2 mb-4">
                      <p className="mb-0 me-2">Don't have an account?</p>
                      <a href="#!">Create New</a>
                    </div>

                   
                    <div class="row">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-md btn-google btn-outline-dark">
                                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="sign up with google"/> Signup with Google
                                </button>

                            </div>
                    </div>

                    
  
                  </form>
  
                </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center" style={gradientStyle}>
                <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4">We are more than just a company</h4>
                  <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}
