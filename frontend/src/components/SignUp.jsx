import React from 'react'
import {useState} from  'react'

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

    let [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
    const { email, password } = formData;
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('http://localhost:5000/users/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          console.log(response)
          // if (!response.ok) {
          //   throw new Error('Failed to save data to database');
          // }
    
          console.log('Data saved successfully');
          // Optionally, reset form fields after successful submission
          setFormData({
            email: '',
            password: ''
          });
        } catch (error) {
          console.error('Error:', error.message);
        }
      };

      const handleChange = (event) => {
        console.log("form data", formData)
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };
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
                <img src="/assets/cart1.jpg" style={{width: "185px"}} alt="abc"/>
                <h4 className="mt-1 mb-5 pb-1">We are The ShopCart Team</h4>
                </div>

                <form onSubmit={handleSubmit}>
                        {
                            isLogin ?  <p>Please login to your account</p> :  <p>Create Account</p>
                        }
                        <div className="form-outline mb-4">
                        <input type="email" id="form2Example11" className="form-control" name="email"
                            placeholder="Email address" onChange={handleChange} value={email}/>
                        </div>
    
                        <div className="form-outline mb-4">
                            <input type="password" id="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} value={password} />
                        </div>
                        {
                            isLogin && 
                            <div className="pt-1 mb-3 pb-1">
                                <button type="button" className="btn btn-dark btn-block mx-2">Login</button>
                            </div>
                        }
                        {
                            !isLogin && 
                            <div className="pt-1 mb-3 pb-1">
                                <button type="button" className="btn btn-dark btn-block mx-2" onClick={handleSubmit}>Create Account</button>
                            </div>
                        }
                        {
                            !isLogin && 
                            <div className="d-flex justify-content-left mx-2 mb-4">
                                <p className="mb-0 me-2">Already have an account?</p>
                                <a onClick={()=> {setIsLogin(true)}} href="#!">Login</a>
                            </div>
                        }
                        
                        {
                            isLogin && 
                            <div  className="mb-5 mx-2">
                                <a className="text-muted mt-3" href="#!">Forgot password?</a>
                            </div>
                        }
                        
                        { isLogin && 
                            <div className="d-flex justify-content-left mx-2 mb-4">
                                <p className="mb-0 me-2">Don't have an account?</p>
                                <a onClick={()=> {setIsLogin(false)}} href="#!">Create New</a>
                            </div>
                        
                        }
                        

                    
                        <div className="row">
                                <div className="col-md-12">
                                    <button type="button" className="btn btn-md btn-google btn-outline-dark">
                                        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="sign up with google"/> Signup with Google
                                    </button>

                                </div>
                        </div>

                    
  
                  </form>
  
                </div>
              </div>
              <div className="col-lg-6 d-flex align-items-center" style={gradientStyle}>
                <div className="text-black px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4">Shop Cart</h4>
                  <p className="small mb-0">Enjoy shopping and get anything you want!</p>
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
