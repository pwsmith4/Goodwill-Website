import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Logo from '../img/Goodwill-Logo.png';
import axios from "axios";
import { useCookies } from "react-cookie";
import './EditAccount.css';
import UserContext from '../context/UserContext';
import {states} from '../components/states';

const EditAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
    const [streetAddress2, setStreetAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const { user, setUser } = useContext(UserContext);

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
    newPassword: "",
    newPassword2: "",
  });

  const Logout = () => {
    removeCookie("token");
    navigate("/welcome");
  };

  const EditAccount = () => {
    navigate("/edit-account");
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/current_user`,
          { withCredentials: true }
        );
        console.log("user: ", response.data.user);

        setUser(response.data.user);
        setInputValue({
          firstName: response.data.user.firstName || "",
          lastName: response.data.user.lastName || "",
          email: response.data.user.email || "",
          phoneNumber: response.data.user.phoneNumber || "",
          streetAddress: response.data.user.streetAddress || "",
          streetAddress2: response.data.user.streetAddress2 || "",
          city: response.data.user.city || "",
          state: response.data.user.state || "",
          zipcode: response.data.user.zipcode || "",
          password: response.data.user.password || "",
        });
        setPassword(response.data.user.password);
      } catch (error) {
        console.error(`HTTP error! status: ${error.message}`);
      }
    };
  
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMTTING: " + user);
    if (newPassword !== newPassword2) {
      alert("Passwords do not match!");
      return;
    }

    if (!inputValue.firstName || !inputValue.email || !inputValue.phoneNumber) {
      setIsFormInvalid(true);
      console.log("Form is invalid: " + inputValue.firstName + " " + inputValue.email + " " + inputValue.password + " " + inputValue.phoneNumber + " " + inputValue.streetAddress + " " + inputValue.city + " " + inputValue.state + " " + inputValue.zipcode);
      window.scrollTo(0, 0);
      return;
    }

    setIsFormInvalid(false);
      // Update the user's information

      try {
        const updateData = {
          firstName: inputValue.firstName,
          lastName: inputValue.lastName,
          email: inputValue.email,
          phoneNumber: inputValue.phoneNumber,
          streetAddress: inputValue.streetAddress,
          streetAddress2: inputValue.streetAddress2,
          city: inputValue.city,
          state: inputValue.state,
          zipcode: inputValue.zipcode,
          userId: user._id,
          password
        };
      
        if (newPassword) {
          updateData.password = newPassword;
        }
          
      
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/update_account`,
          updateData,
          { withCredentials: true }
        );
      
        if (data.message !== "User information updated successfully") {
          throw new Error(`Error: ${data.message}`);
        }
        setUser(data.user);
        navigate("/");
      
      } catch (error) {
        console.error(`HTTP error! status: ${error.message}`);
      }
    };

  return (
    <div className='signup-container'>
      <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      width: '100%', 
      backgroundColor: 'white', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0
    }}>    
        <div className="nav-logo">
            <img src={Logo} alt="Goodwill" style={{ width: '300px', cursor: 'pointer', margin: '5px 0 0 5px' }} onClick={() => navigate('/')} />
        </div>
        <div>
        <button 
                style={buttonStyle} 
                onMouseEnter={(e) => e.target.style.opacity = buttonHoverStyle.opacity} 
                onMouseLeave={(e) => e.target.style.opacity = buttonStyle.opacity} 
                onClick={EditAccount}
              >
                Edit Account
              </button>
            <button 
                style={buttonStyle} 
                onMouseEnter={(e) => e.target.style.opacity = buttonHoverStyle.opacity} 
                onMouseLeave={(e) => e.target.style.opacity = buttonStyle.opacity} 
                onClick={Logout}
              >
                Logout
              </button>
        </div>
        </nav>
      {isFormInvalid && <div className="error-message">Fill Out All Required Fields</div>}
      <h2 className="signup-title">Edit Account Info</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
            <label className="signup-label" htmlFor="firstName">First Name: </label>
            <input
              className="signup-input"
              type="text"
              name="firstName"
              value={inputValue.firstName}
              placeholder="Enter your first name"
              onChange={handleOnChange}
            />
              <span className="required-text">(Required)</span>
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="lastName">Last Name: </label>
            <input
              className="signup-input"
              type="lastName"
              name="lastName"
              value={inputValue.lastName}
              placeholder="Enter your last name"
              onChange={handleOnChange}
            />
          <span className="not-required-text">        </span>
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="phoneNumber">Phone Number: </label>
            <input
              className="signup-input"
              type="phoneNumber"
              name="phoneNumber"
              value={inputValue.phoneNumber}
              placeholder="Enter your phone number"
              onChange={handleOnChange}
            />
              <span className="required-text">(Required)</span>
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="email">Email: </label>
            <input
              className="signup-input"
              type="text"
              name="email"
              value={inputValue.email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
              <span className="required-text">(Required)</span>
          </div>            
            <div className="separate">
            <h1>Address</h1>
          </div>
            <div className="input-group">
            <label className="signup-label" htmlFor="streetAddress">Street Address: </label>
            <input
              className="signup-input"
              type="text"
              name="streetAddress"
              value={inputValue.streetAddress}
              placeholder="Enter your street address"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="streetAddress2">Address Line 2: </label>
            <input
              className="signup-input"
              type="text"
              name="streetAddress2"
              value={inputValue.streetAddress2}
              placeholder="Enter your Address Line 2"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="city">City: </label>
            <input
              className="signup-input"
              type="text"
              name="city"
              value={inputValue.city}
              placeholder="Enter your city"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-group">
            <label className="signup-label" htmlFor="state">State: </label>
            <select
              className="signup-input"
              name="state"
              value={inputValue.state}
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
            value={inputValue.zipcode}
            placeholder="Enter your zipcode"
            onChange={handleOnChange}
          />
          </div>
          <h1 className="password-title">Update Password</h1>
          <div className='input-group'>
          <label className="signup-label" htmlFor="zipcode">Update Password: </label>
          <input
            className="signup-input"
            type="password"
            name="newPassword"
            value={newPassword}
            placeholder="Enter your new password"
            onChange={(e) => setNewPassword(e.target.value)}
            />
          
          </div>
          <div className='input-group'>
          <label className="signup-label" htmlFor="zipcode">Confirm Password: </label>
          <input
            className="signup-input"
            type="password"
            name="newPassword2"
            value={newPassword2}
            placeholder="Re-enter your new password"
            onChange={(e) => setNewPassword2(e.target.value)}
            />
          </div>
          <button className="submit-button" type="submit">Submit</button>
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

export default EditAccount;