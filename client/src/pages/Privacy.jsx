import React, {useEffect, useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import './Privacy.css'
import Footer from '../components/Footer';
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { set } from 'mongoose';
import Logo from '../img/Example-Logo.png';

function Privacy() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const buttonRef = useRef(null);
    const footerRef = useRef(null);

    const [isCookie, setIsCookie] = useState(false);

    const Logout = () => {
        removeCookie("token");
        navigate("/");
      };
    
      const Login = () => {
        navigate("/login");
      };
    
      const Signup = () => {
        navigate("/signup");
      };
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const verifyCookie = async () => {
          if (!cookies.token) {
            setIsCookie(false);
          }
          const { data } = await axios.post(
            `${process.env.REACT_APP_BASE_URL}`,
            {},
            { withCredentials: true }
          );
          const { status, user } = data;
          setUsername(user);
          if(status) {
             toast(`Hello ${user}`, {
                position: "top-right",
              });
              setIsCookie(true);
            } else {
            removeCookie("token");
            setIsCookie(false);
            }
        }
        verifyCookie();
        } , [cookies, navigate, removeCookie]);


    return (
    <>
    {!isCookie ? (
        <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '100%', 
            backgroundColor: 'white', 
            top: 0, 
            left: 0, 
            right: 0, 
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
) : (
    <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%', 
        backgroundColor: 'white', 
        top: 0, 
        left: 0, 
        right: 0, 
    }}>      
  <div className="nav-logo">
    <img src={Logo} alt="Goodwill" style={{ width: '300px', cursor: 'pointer', margin: '5px 0 0 5px' }} onClick={() => navigate('/')} />
    </div>
    <div>
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
)}
        <h1 className="open">SACRAMENTO VALLEY & NORTHERN NEVADA. PRIVACY POLICY</h1>
        <div>
            <h4>Introduction & Scope</h4>
            <h5>Example Company Sacramento Valley & Northern Nevada (herein referred to as “Example Company Sacramento Valley & Northern Nevada,” “we,” “us,” or “our”), respects the privacy of our donors and web site visitors and are committed to protecting personal information entrusted to us. This document describes our policy related to the gathering and disseminating of information obtained from users of our services.
This Privacy Policy applies to Example Company Sacramento Valley & Northern Nevada’s hard copy publications and its web site located at www.examplesacto.org (“Site” or “Web Site”). The policy relates to information we collect, including personally identifiable information as well as information that does not identify donors and Web Site users personally. If Our Web Site contains links to third-party web sites for the convenience of its visitors. This policy does not apply to web sites owned or operated by other organizations, companies, or individuals, as these third-parties may have their own privacy policies related to the information they collect from you.</h5>
        </div>
        <div>
            <h4>Types of Personally Identifiable Information Collected & How It May Be Used</h4>
            <h5>Example Company Sacramento Valley & Northern Nevada collects and stores the personally identifiable information of its donors, donors, and others who have contacted or requested information from Example Company Sacramento Valley & Northern Nevada. Such information may include names, addresses, telephone numbers, and email addresses. We do not share personal information—such as names, mailing addresses, telephone numbers, or email addresses—with anyone, except to the extent necessary to process transactions and provide access to, or information about, Example Company Sacramento Valley & Northern Nevada’s information and services. Example Company Sacramento Valley & Northern Nevada takes practical measures to protect the personal information we collect and does not disclose this information to third-parties for their marketing or fundraising purposes.</h5>
        </div>
        <div>
            <h4>Names</h4>
            <h5>Example Company Sacramento Valley & Northern Nevada collects first and/or last names voluntarily provided to us by donors, donors, visitors to our Web Site, and others who have requested information from us, or who have contacted us via phone, postal mail, email, or our Web Contact Form located at www.examplecfl.org. We may use these names to process transactions and provide access to, or information about, Example Company Sacramento Valley & Northern Nevada’s information and services, or for the purpose of contacting donors, donors, and others about their online user accounts, donorship information, tax receipts for donations, renewal notices, donor alerts, and occasional fundraising efforts.</h5>
        </div>
        <div>
            <h4>Email Addresses</h4>
            <h5>Example Company Sacramento Valley & Northern Nevada collects email addresses voluntarily provided to us by donors, donors, visitors to our Web Site, and others who have requested information from us, or who have contacted us via phone, postal mail, email, or our Web Contact Form located at www.examplesacto.org. In accordance with our Terms of Use, Example Company Sacramento Valley & Northern Nevada donors and others who choose to create online accounts to gain access to restricted content on our Site are required to provide us with a current email address.
We may use the email addresses we have collected to communicate with Example Company Sacramento Valley & Northern Nevada donors and others who have voluntarily provided their email addresses to us. Such communications are typically regarding online user accounts, donorship information, tax receipts for online donations, renewal notices, donor alerts, and occasional fundraising efforts.</h5>
        </div>
        <div>
            <h4>Mailing Addresses</h4>
            <h5>Example Company Sacramento Valley & Northern Nevada collects mailing addresses voluntarily provided to us by our donors. We may also use these addresses to send tax receipts for offline donations; donorship renewal reminders; and information related to Example Company Sacramento Valley & Northern Nevada news, announcements, and fundraising efforts.</h5>
        </div>
        <div>
            <h4>Credit Cards & Highly Sensitive Information</h4>
            <h5>Example Company Sacramento Valley & Northern Nevada does not store highly sensitive information, such as credit card data, from our visitors or donors.</h5>
        </div>
        <div>
            <h4>Types of Non-Personally Identifiable Information Collected & How It May Be Used</h4>
            <h5>We may collect non-personally identifiable information from you when you visit and interact with our Web Site. This is information that is commonly collected by web site operators. Example Company Sacramento Valley & Northern Nevada uses this information, such as tracking the number of unique site visitors and the browsers and other technology they use to access our Web Site, in order to optimize the Site’s functionality and enhance user experience. This may include the proxy address of your Internet service provider (ISP) and your Internet protocol (IP) address; the query in the request; the version and name of your web browser; data related to sent or received cookies (described below); the uniform resource locator (URL) that was used to request access to our server; the pages accessed by users on our Site; and other commonly collected environmental variables.</h5>
        </div>
        <div>
            <h4>Log Files</h4>
            <h5>Log files consist of information sent to our Web Site by Web Site visitors’ computers. Like many web site operators, our Web Site servers collect and store non-personally identifiable information from anyone who visits the Example Company Sacramento Valley & Northern Nevada Web Site. The data in these log files is used in aggregate to analyze site traffic, trends, and clicks, which enables us to administer and improve our Web Site. Data stored in log files may include information about site visitors’ IP addresses, browsers, ISPs, operating systems, standard web log data, and other information.</h5>
        </div>
        <div>
            <h4>Cookies</h4>
            <h5>Cookies are pieces of numeric data stored on your computer. Many web sites, including Example Company Sacramento Valley & Northern Nevada, use them to identify a unique visitor returning to the web site. Example Company Sacramento Valley & Northern Nevada can only detect cookies placed on your computer by our own Web Site. Cookies are not linked to any personally identifiable information. Web site users have the option of disabling cookies by adjusting their browser settings. Be aware, however, that disabling cookies may affect your ability to access certain portions of our Web Site. If this occurs, the problem can generally be remedied by re-enabling cookies and refreshing your browser.</h5>
        </div>
        <div>
            <h4>Aggregated Data</h4>
            <h5>Aggregated data is information we may gather and compile that is non-personally identifiable or linked to specific users of our Web Site. There are no restrictions under this Policy that restrict our right to aggregate this information, which we may share with third-parties and use in various ways, such as to understand the interests or popular content accessed by our Web Site visitors as a group.</h5>
        </div>
        <div>
            <h4>User IDs & Passwords</h4>
            <h5>Example Company Sacramento Valley & Northern Nevada donors and others who choose to create online accounts to gain access to restricted content on our Site have unique user IDs and passwords. The email address voluntarily provided to Example Company Sacramento Valley & Northern Nevada upon creation of an online account is the user ID, and users choose their own passwords.
Users should not share their passwords with third-parties, should not store their passwords on shared computers, and should always log out of their accounts when finished using our Web Site. Passwords are the property of private users, and in the interest of privacy and security Example Company Sacramento Valley & Northern Nevada will not disclose passwords to anyone.</h5>
        </div>
        <div>
            <h4>Information Security</h4>
        </div>
        <div>
            <h4>Protection of Data from Loss</h4>
            <h5>Example Company Sacramento Valley & Northern Nevada has implemented physical and electronic security measures to protect against the loss, misuse, or alteration of information we receive from donors to Example Company Sacramento Valley & Northern Nevada and users of the Example Company Sacramento Valley & Northern Nevada Web Site. While no security measures are perfect or impenetrable, Example Company Sacramento Valley & Northern Nevada takes practical measures to safeguard the information of its Web Site users.</h5>
        </div>
        <div>
            <h4>Information Sharing and Third-Party Usage</h4>
            <h5>Example Company Sacramento Valley & Northern Nevada respects the privacy of its donors and Site visitors, and is dedicated to protecting personal information entrusted with us. We do not share personal information—such as name, mailing address, telephone number, or email address—with anyone, except to the extent necessary to process transactions and provide access to, or information about, Example Company Sacramento Valley & Northern Nevada’s information and services. Example Company Sacramento Valley & Northern Nevada does not disclose this information to third-parties for their marketing or fundraising purposes.</h5>
        </div>
        <div>
            <h4>Use of Content</h4>
            <h5>Information published by Example Company Sacramento Valley & Northern Nevada on its Web Site or in its hard copy is provided for general informational purposes only and is not intended, nor should it be construed, to be legal advice or a legal opinion. Reasonable efforts are made to ensure that the information contained in Example Company Sacramento Valley & Northern Nevada’s Web Site is as accurate as possible. However, some information may be historical or archived information, and omissions and errors may occur due to technological limitations or for other reasons. Example Company Sacramento Valley & Northern Nevada expressly disclaims all liability for the consequences to any person related to any act or omission committed based upon the reliance, in whole or in part, on any of the contents of the Web Site or other published information.</h5>
        </div>
        <div>
            <h4>Updating Your Information or Questions About Privacy Policy</h4>
            <h5>In order to update your contact information with Example Company Sacramento Valley & Northern Nevada, or if you have questions about our Privacy Policy, please use the Contact Form located at www.examplesacto.org.</h5>
        </div>
        <div>
            <h4>Changes to the Policy</h4>
            <h5>Example Company Sacramento Valley & Northern Nevada reserves the right, at its sole discretion, and without notice, to modify or replace any part of this Policy at any time. It is your responsibility to check this Policy periodically for changes, which will be noted in a “Change Log” included in this document. Normally we will not notify users when a minor change is made to this Policy. If a major change is made to the Policy, Example Company Sacramento Valley & Northern Nevada will put a notice on our Web Site at www.examplecfl.org, and/or send an email announcement to users who have provided us with an email address.</h5>
        </div>
        <div>
            <h4>Opt-Out</h4>
            <h5>Donors are able to Opt-Out of communications from Example Company Sacramento Valley & Northern Nevada upon request. Please use the unsubscribe option.</h5>
        </div>
        <button 
          style={scrollStyle} 
          onClick={() => window.scrollTo(0, 0)}
        >
          Back to Top ↑
        </button>
        <Footer/>
      </>
    );
}

const scrollStyle = {
    offset: '50px',
    backgroundColor: '#0053A0', /* Blue background */
    border: 'none', /* Remove borders */
    color: '#FFFFFF',
    padding: '10px 20px',
    textAlign: 'center', /* Centered text */
    textDecoration: 'none', /* Remove underline */
    display: 'flex', /* Get it to display inline */
    fontSize: '14px',
    margin: '4px 2px', /* Some margin */
    cursor: 'pointer', /* Add a mouse pointer on hover */
    borderRadius: '25px', /* Rounded corners */
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)', /* Add a subtle shadow */
    transition: 'background-color 0.3s ease, color 0.3s ease', /* Add a smooth transition */
    position: 'sticky', /* Add position relative */
    top: '0px', /* Move down 10px */
    left: '50%', 
    transform: 'translate(-50%, -50%)', // Adjust for the button's own width and height
    bottom: '-20px',
    alignSelf: 'end',
    scrollBehavior: 'smooth',
    marginRight: '10px', /* Add 5px of space between buttons */
    opacity: 1, /* Initial opacity */
    justifyContent: 'center'
}
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
  

export default Privacy;    