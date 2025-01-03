import React, {useEffect, useState} from 'react';
import Logo from '../img/Goodwill-Logo.png'; // replace with the path to your logo file
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import './Home.css';
import Footer from '../components/Footer';
const Receipt = require('../models/Receipt_id');
const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [receiptIdInput, setReceiptIdInput] = useState('');
    const [receipts, setReceipts] = useState([]);
    const [receiptNotFound, setReceiptNotFound] = useState(false);
    const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
    const [donationType, setDonationType] = useState('');
    const [isCashDonationModalOpen, setIsCashDonationModalOpen] = useState(false);
    const [cashAmountInput, setCashAmountInput] = useState('');
    const [isOtherDonationModalOpen, setIsOtherDonationModalOpen] = useState(false);
    const [otherAmountInput, setOtherAmountInput] = useState('');
    const [selectedDate, setSelectedDate] = useState(() => {
      const date = new Date();
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      return date;
    });
    const items = [
      { name: '2pc Suit', min: 10, max: 96 },
      { name: 'Blouse', min: 4, max: 9 },
      { name: 'Dress', min: 6, max: 28 },
      { name: 'Handbag', min: 2, max: 10 },
      { name: 'Hat', min: 1, max: 9 },
      { name: 'Pants', min: 4, max: 23 },
      { name: 'Shoes', min: 3, max: 30 },
      { name: 'Sweater', min: 4, max: 13 },
    ];
    function DonationForm() {
      const [selectedItems, setSelectedItems] = useState({});
    
      const handleChange = (item, event) => {
        setSelectedItems({
          ...selectedItems,
          [item.name]: event.target.value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedItems);
      };
    }
    useEffect(() => {
      const fetchReceipts = async () => {
        try {
          const { data: userData } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/current_user`,
            { withCredentials: true }
          );
           console.log("User: ", userData.user);
           setReceipts(userData.user.user_receipts);
           console.log("User Receipts: ", userData.user.user_receipts);
          console.log("Receipts: ", receipts);

        } catch (error) {
          console.error("Error" + error);
        }
      };
    
      fetchReceipts();
    }, []);

    const handleModalSubmit = async () => {
      
      try {
        console.log("Receipt ID Input: ", receiptIdInput);
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/receipt_ids`,
          { params: { id: receiptIdInput }, withCredentials: true }
        );
        if (data) {
          const { data: user } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/current_user`,
            { withCredentials: true }
          );
          const userInfo = user.user;
          console.log("Response: ", userInfo); //data is the new receipt information 
          console.log("User Info: ", userInfo._id);
          console.log("New Receipt: ", data);
          const {data: {user: updatedUser}} = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/users/${userInfo._id}`,
            { newReceipt: data, userInfo },
            { withCredentials: true }
          );
          
          console.log("User Data: ", updatedUser);

          //const user = userData.user;
          //user.user_receipts.push(userData);
          console.log(`Sending to axios: ${process.env.REACT_APP_BASE_URL}/users/${user.user._id}`);
          console.log("User id: ", user.user._id);
          console.log("User Receipts: ", user.user.user_receipts);
          setReceipts(prevReceipts => [...prevReceipts, data]);
          console.log("Receipts: ", receipts);
          console.log("User Receipts Updated in database");
          setIsModalOpen(false);
          setReceiptIdInput('');
        } else {
          console.log("Can't find receipt id");
          setReceiptNotFound(true);
        }
      } catch (error) {
        setReceiptNotFound(true);
        console.error(error);
      }
    };

    const openDonationModal = () => {
      setIsDonationModalOpen(true);
    };
    
    const closeDonationModal = () => {
      setIsDonationModalOpen(false);
    };

    const handleDonationTypeClick = (type) => {
      setDonationType(type);
      if (type === 'Receipt') {
        setIsModalOpen(true);
      } else if (type === 'Cash Donation') {
        setIsCashDonationModalOpen(true);
      } else if(type === 'Other'){
        setIsOtherDonationModalOpen(true);
      }
      setIsDonationModalOpen(false);
    };

    const updateDonationValue = async (id, e) => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_URL}/api/receipt`,
          { params: {donation_value: e.target.value , id: id}},
          { withCredentials: true }
        );
        console.log("Response" + response.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    const handleAddNewDonation = () => {
      setIsModalOpen(true);
    };

    const Logout = () => {
        removeCookie("token");
        navigate("/welcome");
      };

      const EditAccount = () => {
        navigate("/edit-account");
      };

      useEffect(() => {
        const verifyCookie = async () => {
          if (!cookies.token) {
            navigate("/welcome");
          }
          const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}`,
            {},
            { withCredentials: true }
          );
          const { status, user } = data;
          setUsername(user);
          return status
            ? toast(`Hello ${user}`, {
                position: "top-right",
              })
            : (removeCookie("token"), navigate("/welcome"));
        };
        const currentUserData = axios.get(
          `${process.env.REACT_APP_BASE_URL}/current_user`,
          { withCredentials: true }
        );
        console.log(currentUserData); // Log the data to see what you're getting
      
        verifyCookie();
      }, [cookies, navigate, removeCookie]);

      const handleCashDonationSubmit = async () => {
        // Handle the form submission here
        const { data: user } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/current_user`,
          { withCredentials: true }
        );
        const userInfo = user.user;
        console.log("Response: ", userInfo); //data is the new receipt information 
        console.log("User Info: ", userInfo._id);
        const userId = userInfo._id;
        
        const amount = cashAmountInput;
        console.log("Amount: ", amount);
        const date = new Date(selectedDate);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        console.log("Formatted Date: ", formattedDate); 
        

          const receipt_id= 'Cash Donation'; // replace with actual unique id
          const timestamp= formattedDate;
          const store_number= null; // replace with actual store number
          const donation_value= amount;
        

        try {
          const response = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/create_receipt`,
            { receipt_id, timestamp, store_number, donation_value, userId },
            { withCredentials: true }
          );
          const { data: userData } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/current_user`,
            { withCredentials: true }
          );
           console.log("User: ", userData.user);
           setReceipts(userData.user.user_receipts);
           setSelectedDate(new Date());
          setIsCashDonationModalOpen(false);
          setCashAmountInput('');

        } catch (error) {
          console.error("Error creating receipt: ", error);
        }
          
      };
      
      const handleOtherDonationSubmit = async () => {
        const { data: user } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/current_user`,
          { withCredentials: true }
        );
        const userInfo = user.user;
        console.log("Response: ", userInfo); //data is the new receipt information 
        console.log("User Info: ", userInfo._id);
        const userId = userInfo._id;
        
        const amount = otherAmountInput;
        console.log("Amount: ", amount);
        const date = new Date(selectedDate);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        console.log("Formatted Date: ", formattedDate); 
        

          const receipt_id= 'Other'; // replace with actual unique id
          const timestamp= formattedDate;
          const store_number= null; // replace with actual store number
          const donation_value= amount;
        

        try {
          const response = await axios.put(
            `${process.env.REACT_APP_BASE_URL}/api/create_receipt`,
            { receipt_id, timestamp, store_number, donation_value, userId },
            { withCredentials: true }
          );
          const { data: userData } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/current_user`,
            { withCredentials: true }
          );
           console.log("User: ", userData.user);
           setReceipts(userData.user.user_receipts);
          setIsOtherDonationModalOpen(false);
          setOtherAmountInput('');
          setSelectedDate(new Date());
        } catch (error) {
          console.error("Error creating receipt: ", error);
        }
      };
      
    return (
    <body>          
    <div style={{ 
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
        <div >
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
        </div>
        <div className="content">
            <table className="center-table">
                <thead>
                    <tr>
                        <th>Receipt ID</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Donation Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {receipts.map((receipt, index) => (
                  <tr key={index}>
                    <td className="border-top">{receipt.receipt_id}</td>
                    <td className="border-top">{receipt.timestamp}</td>
                    <td className="border-top">{receipt.store_number}</td>
                    <td className="border-top">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>$</span>
                      <input 
                        type="number" 
                        style={{
                          width: '90%',
                          marginLeft: '10px',
                          appearance: 'textfield',
                          WebkitAppearance: 'none',
                          border: 'none'
                        }}
                        value={receipt.donation_value} 
                        onChange={(e) => updateDonationValue(receipt.receipt_id, e)}
                      />
                    </div>
                  </td>
                  <td className="border-top"></td>
                  </tr>
                ))}
                </tbody>
            </table>
            <div className="button-container">
            <button className="yellow-button" onClick={openDonationModal}>Add New Donation</button>
            </div>
            {isDonationModalOpen && (
  <div className="modal1" onClick={closeDonationModal}>
    <div className="modal-content1" onClick={e => e.stopPropagation()}>
    <button className="close-button1" onClick={() => closeDonationModal}>X</button>
      <h2 style={{ textAlign: 'center' }}>Donation Type</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <button className="modal-button" onClick={() => handleDonationTypeClick('Receipt')} style={{ fontSize: '16px' }}>Receipt</button>
      <button className="modal-button" onClick={() => handleDonationTypeClick('Cash Donation')} style={{ fontSize: '16px' }}>Cash Donation</button>
      <button className="modal-button" onClick={() => handleDonationTypeClick('Other')} style={{ fontSize: '16px' }}>Other</button>      </div>
    </div>
  </div>
)}
            {isModalOpen && (
  <div className="modal" onClick={() => setIsModalOpen(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="close-button" onClick={() => setIsModalOpen(false)}>X</button>
      <h2 style={{ textAlign: 'center' }}>Add New Donation</h2>
      <div className="input-group">
        <label htmlFor="receiptIdInput" style={{ marginRight: '10px', alignItems: 'center' }}>Receipt ID:</label>    
        <input
          id="receiptIdInput"
          value={receiptIdInput}
          onChange={e => setReceiptIdInput(e.target.value)}
        />
      </div>
      {receiptNotFound && <p style={{ color: 'red', marginBottom: '3%' }}>Receipt ID Not Found</p>}      
      <button className="yellow-modal-button" onClick={handleModalSubmit}>Submit</button>
    </div>
  </div>
)}
{isCashDonationModalOpen && (
  <div className="modal1" onClick={() => setIsCashDonationModalOpen(false)}>
<div className="modal-content1" onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0px' }}>
  <button className="close-button1" onClick={() => setIsCashDonationModalOpen(false)}>X</button>
  <h2 style={{ textAlign: 'center' }}>Cash Donation</h2>
  <div className="input-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0px' }}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    <label htmlFor="dateInput" style={{ fontSize: '16px', marginRight: '5px' }}>Donation Date:</label>    
    <input
      style = {{fontSize: '16px', alignItems: 'center'}}
      type="date"
      id="dateInput"
      value={selectedDate.toISOString().substr(0, 10)}
      onChange={e => {
        const date = new Date(e.target.value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        // Check whether the date is valid
        if (isNaN(date)) {
          alert('Invalid date');
          return;
        }
        // Check whether the date is in the future
        const now = new Date();
        now.setHours(0, 0, 0, 0);  // Set the time to 00:00:00.000
        if (date > now) {
          alert('The date cannot be in the future');
          return;
        }
        setSelectedDate(date);
      }}
    />
    </div>
  </div>
  <div className="input-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '0px' }}>
  <label htmlFor="cashAmountInput" style={{ marginRight: '5px', fontSize: '16px', alignItems: 'center' }}>Cash Amount: $</label>    
  <input
    id="cashAmountInput"
    value={cashAmountInput}
    style={{ fontSize: '16px' }}
    onChange={e => {
      // Ignore non-numeric input
      if (!isNaN(e.target.value)) {
        setCashAmountInput(e.target.value);
      }
      }}  
      />
  </div>
  <button className="yellow-modal-button" onClick={handleCashDonationSubmit} style={{ marginTop: '5px', alignSelf: 'center', borderRadius: '5px' }}>Submit</button>
</div>
</div>
)}

{isOtherDonationModalOpen && (
  <div className="modal1" onClick={() => setIsOtherDonationModalOpen(false)}>
<div className="modal-content1" onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>      
<button className="close-button1" onClick={() => setIsOtherDonationModalOpen(false)}>X</button>
      <h2 style={{ textAlign: 'center' }}>Other Donation</h2>
      <div className="input-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0px' }}>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    <label htmlFor="dateInput" style={{ fontSize: '16px', marginRight: '5px' }}>Donation Date:</label>    
    <input
      style = {{fontSize: '16px', alignItems: 'center'}}
      type="date"
      id="dateInput"
      value={selectedDate.toISOString().substr(0, 10)}
      onChange={e => {
        const date = new Date(e.target.value);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        // Check whether the date is valid
        if (isNaN(date)) {
          alert('Invalid date');
          return;
        }
        // Check whether the date is in the future
        const now = new Date();
        now.setHours(0, 0, 0, 0);  // Set the time to 00:00:00.000
        if (date > now) {
          alert('The date cannot be in the future');
          return;
        }
        setSelectedDate(date);
      }}
    />
    </div>
  </div>  
  <div className="input-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '0px' }}>
  <label htmlFor="cashAmountInput" style={{ marginRight: '5px', fontSize: '16px' }}>Donation Value: $</label>    
  <input
    id="otherAmountInput"
    value={otherAmountInput}
    onChange={e => setOtherAmountInput(e.target.value)}
  />
  </div>
      <form onSubmit={handleSubmit}>
      {items.map((item) => (
        <div key={item.name}>
          <label>{item.name}</label>
          <select onChange={(event) => handleChange(item, event)}>
            <option value="">Select price</option>
            {[...Array(item.max - item.min + 1)].map((_, i) => (
              <option key={i} value={item.min + i}>
                ${item.min + i}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  <button className="yellow-modal-button" onClick={handleOtherDonationSubmit} style={{ marginTop: '50px', alignSelf: 'center', borderRadius: '5px' }}>Submit</button>    </div>
  </div>
)}
<Footer style={{ 
  position: 'fixed', 
  left: 0, 
  bottom: 0, 
  width: '100%', 
}}/>
  </div>    
  </body>
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
  };
  
  const buttonHoverStyle = {
    opacity: 0.8, /* Opacity when hovered over */
  };

export default Home;