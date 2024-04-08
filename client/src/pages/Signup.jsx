import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import './Signup.css';
import Login from "./Login";
import Logo from '../img/Goodwill-Logo.png';
import Footer from '../components/Footer';
import { states } from "../components/states";

  const Signup = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipcode: "",
      phoneNumber: "",
    });
    const { email, password, firstName, lastName, streetAddress, streetAddress2, city, state, zipcode, phoneNumber } = inputValue;
    
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    
    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setInputValue({
        ...inputValue,
        [name]: value,
      });
    };

    const handleError = (err) =>
      toast.error(err, {
        position: "bottom-left",
      });
    const handleSuccess = (msg) =>
      toast.success(msg, {
        position: "bottom-right",
      });

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!firstName || !email || !password || !phoneNumber) {
        handleError('Please fill in all required fields: First Name, Email, Password, Phone Number');
        setIsFormInvalid(true); // Set isFormInvalid to true
        window.scrollTo(0, 0); // Scroll to top
        return;
      }

      setIsFormInvalid(false); // Set isFormInvalid to false

      try {
        function joinUrl(base, path) {
          return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
        }
        const { data } = await axios.post(
          joinUrl(process.env.REACT_APP_BASE_URL, 'signup'),
          {
            ...inputValue,
          },
          { withCredentials: true }
        );
        const { success, message } = data;
        if (success) {
          handleSuccess(message);
            navigate("/");
        } else {
          handleError(message);
        }
      } catch (error) {
        console.log("Error: " +error);
      }
      setInputValue({
        ...inputValue,
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        streetAddress: "",
        streetAddress2: "",
        city: "",
        state: "",
        zipcode: "",
        phoneNumber: "",
      });
    };

    const Login = () => {
      navigate("/login");
    };

    const Signup = () => {
      navigate("/signup");
    };

    return (
      <div className="signup-container">
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
    {isFormInvalid && <div className="error-message">Fill Out All Required Fields</div>}
        <h2 className="signup-title">Create Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
            <label className="signup-label" htmlFor="firstName">First Name: </label>
            <input
              className="signup-input"
              type="firstName"
              name="firstName"
              value={firstName}
              placeholder="Enter your first name"
              onChange={handleOnChange}
            />
              <span className="required-text">*required</span>
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="lastName">Last Name: </label>
            <input
              className="signup-input"
              type="lastName"
              name="lastName"
              value={lastName}
              placeholder="Enter your last name"
              onChange={handleOnChange}
            />
          <span className="required-text">*required</span>
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="phoneNumber">Phone Number: </label>
            <input
              className="signup-input"
              type="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Enter your phone number"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="email">Email: </label>
            <input
              className="signup-input"
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
              <span className="required-text">*required</span>
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="password">Password: </label>
            
            <input
              className="signup-input"
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
              <span className="required-text">*required</span>
            </div>
            
            <div className="separate">
            <h1>Address</h1>
          </div>
            <div className="input-group">
            <label className="signup-label" htmlFor="streetAddress">Street Address: </label>
            <input
              className="signup-input"
              type="streetAddress"
              name="streetAddress"
              value={streetAddress}
              placeholder="Enter your street address"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="streetAddress2">Address Line 2: </label>
            <input
              className="signup-input"
              type="streetAddress2"
              name="streetAddress2"
              value={streetAddress2}
              placeholder="Enter your Address Line 2"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="city">City: </label>
            <input
              className="signup-input"
              type="city"
              name="city"
              value={city}
              placeholder="Enter your city"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="state">State: </label>
            <select
              className="signup-input"
              name="state"
              value={state}
              onChange={handleOnChange}
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group">
          <label className="signup-label" htmlFor="zipcode">Zipcode: </label>
          <input
            className="signup-input"
            type="zipcode"
            name="zipcode"
            value={zipcode}
            placeholder="Enter your zipcode"
            onChange={handleOnChange}
          />
      
          </div>
          <button className="submit-button" type="submit">Submit</button>
          <span>
            Already have an account? <Link to={"/login"}>Login</Link>
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

  export default Signup;

