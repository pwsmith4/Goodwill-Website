import React, {useEffect, useState} from 'react';
import Logo from '../img/Goodwill-Logo.png'; // replace with the path to your logo file
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import './Home.css';
import Footer from '../components/Footer';

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

    useEffect(() => {
      const fetchReceipts = async () => {
        try {
          const { data: userData } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/current_user`,
            { withCredentials: true }
          );
          const user = userData.user;
          console.log("User: ", user);
          const receiptPromises = user.receipts.map(receiptId =>
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/id`, {
              params: { id: receiptId },
              withCredentials: true
            })
          );
          
          const receiptResponses = await Promise.all(receiptPromises);
          
          const receipts = receiptResponses.map(response => response.data);
            setReceipts(receipts);
        } catch (error) {
          console.error("Error" + error);
        }
      };
    
      fetchReceipts();
    }, []);

    const handleModalSubmit = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/receipt_ids`,
          { params: { id: receiptIdInput }, withCredentials: true }
        );
        console.log(data);
        if (data) {
          console.log("Response: ", data);
          setReceipts(prevReceipts => [...prevReceipts, data]);
          setReceiptNotFound(false);

          const { data: userData } = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/current_user`,
            { withCredentials: true }
          );
          console.log("User Data: ", userData);
          const user = userData.user;
          user.receipts.push(data);
          console.log(`Sending to axios: ${process.env.REACT_APP_BASE_URL}/users/${user._id}`);
          console.log("User: ", user);
          await axios.put(
            `${process.env.REACT_APP_BASE_URL}/users/${user._id}`,
            {receipts: user.receipts},
            { withCredentials: true }
          );
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
        console.log(response.data);
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
                        defaultValue={receipt.donation_value} 
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
        <button className="modal-button" onClick={() => handleDonationTypeClick('Receipt')}>Receipt</button>
        <button className="modal-button" onClick={() => handleDonationTypeClick('Cash Donation')}>Cash Donation</button>
        <button className="modal-button" onClick={() => handleDonationTypeClick('Other')}>Other</button>
      </div>
    </div>
  </div>
)}
            {isModalOpen && (
  <div className="modal" onClick={() => setIsModalOpen(false)}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="close-button" onClick={() => setIsModalOpen(false)}>X</button>
      <h2 style={{ textAlign: 'center' }}>Add New Donation</h2>
      <div className="input-group">
        <label htmlFor="receiptIdInput" style={{ marginRight: '10px' }}>Receipt ID:</label>    
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
    <div className="modal-content1" onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button className="close-button1" onClick={() => setIsCashDonationModalOpen(false)}>X</button>
      <h2 style={{ textAlign: 'center' }}>Cash Donation</h2>
      <div className="input-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  <label htmlFor="cashAmountInput" style={{ marginRight: '10px' }}>Cash Amount:</label>    
  <input
    id="cashAmountInput"
    value={cashAmountInput}
    onChange={e => setCashAmountInput(e.target.value)}
  />
  </div>
  <button className="yellow-modal-button" onClick={handleCashDonationSubmit} style={{ marginTop: '50px' }}>Submit</button>
    </div>
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