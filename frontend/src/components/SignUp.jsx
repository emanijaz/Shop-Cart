import React from 'react'
import {useState} from  'react'
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

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

    let [existingAccount, setExistingAccount] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const { login, register, googleLogin } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
      });
    const { email, password, username } = formData;
    
    const handleSubmit = async (event) => {
      if(!existingAccount){
        event.preventDefault();
        try {
          if (email && password && username) {
            const success = await register(email, password, username);
            if(success){

              setAlertMessage('Registration successful');
              setAlertSeverity('success');
              setShowAlert(true);
              setTimeout(() => {
              setAlertMessage('');
              setShowAlert(false);
              setAlertSeverity('');
              navigate('/'); // Redirect to homepage after 2 seconds
              }, 2000);
            }
            else{
              setAlertMessage('Couldnt create account, Retry');
              setAlertSeverity('error');
              setShowAlert(true);
            }
          }
          
        } catch (error) {
          setAlertMessage('Couldnt create account, Retry');
          setAlertSeverity('error');
          setShowAlert(true);
        } finally {
          setTimeout(() => {
            setAlertMessage('');
            setShowAlert(false);
            setAlertSeverity('');
          }, 2000);
        }
      }
      else{  // login
        event.preventDefault();
        try {

          if (email && password) {
            const success = await login(email, password);
            if(success){
              setAlertMessage('Login successful');
              setAlertSeverity('success');
              setShowAlert(true);
              setTimeout(() => {
              setAlertMessage('');
              setShowAlert(false);
              setAlertSeverity('');
              navigate('/'); // Redirect to homepage after 2 seconds
              }, 2000);
            }
            else{
              setAlertMessage('Login Unsuccessful');
              setAlertSeverity('error');
              setShowAlert(true);
            }
          }
          
          } catch (error) {
            setAlertMessage('Login Unsuccessful');
            setAlertSeverity('error');
            setShowAlert(true);
          } finally {
            setTimeout(() => {
              setAlertMessage('');
              setShowAlert(false);
              setAlertSeverity('');
            }, 2000);
          }
      }
    };

    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    };

    const handleGoogleLoginSuccess = async googleData => {  
      const success = await googleLogin(googleData)
      if(success){
        setAlertMessage('Login successful');
        setAlertSeverity('success');
        setShowAlert(true);
        setTimeout(() => {
        setAlertMessage('');
        setShowAlert(false);
        setAlertSeverity('');
        navigate('/'); // Redirect to homepage after 2 seconds
        }, 2000);
      }
      else{
        setAlertMessage('Login Unsuccessful');
        setAlertSeverity('error');
        setShowAlert(true);
      }
    }

    const handleGoogleLoginFailure = () => {
      setAlertMessage('Login Failed, please Retry');
      setAlertSeverity('error');
      setShowAlert(true);
    }


    return (
      <div>
      <section className="h-100" style={gradientForm}>
      {showAlert && (
            <Alert severity={alertSeverity}>{alertMessage}</Alert>    

      )}
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
                  <form >
                          {
                              existingAccount ?  <p>Please login to your account</p> :  <p>Create Account</p>
                          }
                          <div className="form-outline mb-4">
                          <input type="email" id="form2Example11" className="form-control" name="email"
                              placeholder="Email address" onChange={handleChange} value={email}/>
                          </div>
      
                          <div className="form-outline mb-4">
                              <input type="password" id="password" className="form-control" name="password" placeholder="Password" onChange={handleChange} value={password} />
                          </div>
                          <div>
                              <input type="text" id="form2Example11" className="form-control" name="username"
                              placeholder="Username" onChange={handleChange} value={username}/>
                          </div>
                          {
                              existingAccount && 
                              <div className="pt-1 mb-3 pb-1 mt-3">
                                  <button type="button" className="btn btn-dark btn-block mx-2" onClick={handleSubmit}>Login</button>
                              </div>
                          }
                          {
                              !existingAccount && 
                              <div className="pt-1 mb-3 pb-1 mt-3">
                                  <button type="button" className="btn btn-dark btn-block mx-2" onClick={handleSubmit}>Create Account</button>
                              </div>
                          }
                          {
                              !existingAccount && 
                              <div className="d-flex justify-content-left mx-2 mb-4">
                                  <p className="mb-0 me-2">Already have an account?</p>
                                  <a onClick={()=> {setExistingAccount(true)}} href="#!">Login</a>
                              </div>
                          }
                          
                          {
                              existingAccount && 
                              <div  className="mb-5 mx-2">
                                  <a className="text-muted mt-3" href="#!">Forgot password?</a>
                              </div>
                          }
                          
                          { existingAccount && 
                              <div className="d-flex justify-content-left mx-2 mb-4">
                                  <p className="mb-0 me-2">Don't have an account?</p>
                                  <a onClick={()=> {setExistingAccount(false)}} href="#!">Create New</a>
                              </div>
                          
                          }
                          { existingAccount && 
                            <div className="row">
                                    <div className="col-md-12">
                                        {/* <button type="button" className="btn btn-md btn-google btn-outline-dark">
                                            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="sign up with google"/> Signin with Google
                                        </button> */}
                                        <GoogleLogin
                                            clientId="189093438619-aqjp61l48qrbsv6okstcldm0a5bnoii0.apps.googleusercontent.com"
                                            buttonText="Log in with Google"
                                            onSuccess={handleGoogleLoginSuccess}
                                            onFailure={handleGoogleLoginFailure}
                                            cookiePolicy={'single_host_origin'}
                                        />

                                    </div>
                            </div>
                          }
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
