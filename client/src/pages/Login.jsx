import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Logo from '../img/Goodwill-Logo.png';
import Footer from '../components/Footer';
import './Login.css';
import Signup from "./Signup";
import UserContext from '../context/UserContext';


const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const Login = () => {
    navigate("/login");
  };

  const Signup = () => {
    navigate("/signup");
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setUser(data.user);
          navigate("/");
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log("Submit Error" + error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
<div className="signin-container">
<nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '100%', 
            backgroundColor: 'white', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1000 
        }}>      
    <div className="nav-logo">
      <img src={Logo} alt="Goodwill" style={{ width: '300px', cursor: 'pointer', margin: '5px 0 0 5px' }} onClick={() => navigate('/')} />
    </div>
    <div>
      <button 
        style={buttonStyle} 
        onMouseEnter={(e) => e.target.style.opacity = buttonHoverStyle.opacity} 
        onMouseLeave={(e) => e.target.style.opacity = buttonStyle.opacity} 
        onClick={Login}
      >
        Sign In
      </button>
      <button 
        style={buttonStyle} 
        onMouseEnter={(e) => e.target.style.opacity = buttonHoverStyle.opacity} 
        onMouseLeave={(e) => e.target.style.opacity = buttonStyle.opacity} 
        onClick={Signup}
      >
        Sign Up
      </button>
    </div>
  </nav>
    <h2 className="signin-title">Login Account</h2>
    <form className="signin-form" onSubmit={handleSubmit}>
      <div>
        <label className="signin-label" htmlFor="email">Email: </label>
        <input
          className="signin-input"
          type="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={handleOnChange}
        />
      </div>
      <div>
        <label className="signin-label" htmlFor="password">Password: </label>
        <input
          className="signin-input"
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={handleOnChange}
        />
      </div>
        <button className="submit-button" type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
    </div>
  );
};

const buttonStyle = {       
    backgroundColor: '#0053A0', /* Blue background */
    border: 'none', /* Remove borders */
    color: '#FFFFFF',
    padding: '10px 20px',
    textAlign: 'center', /* Centered text */
    textDecoration: 'none', /* Remove underline */
    display: 'inline-block', /* Get it to display inline */
    fontSize: '14px',
    margin: '4px 2px', /* Some margin */
    cursor: 'pointer', /* Add a mouse pointer on hover */
    borderRadius: '25px', /* Rounded corners */
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', /* Add a subtle shadow */
    transition: 'background-color 0.3s ease, color 0.3s ease', /* Add a smooth transition */
    position: 'relative', /* Add position relative */
    top: '0px', /* Move down 10px */
    left: '0px', /* Move to the left 5px */
    marginRight: '15px', /* Add 5px of space between buttons */
    opacity: 1, /* Initial opacity */
    justifyContent: 'end',
  };
  
  const buttonHoverStyle = {
    opacity: 0.8, /* Opacity when hovered over */
  };
  
export default Login;
