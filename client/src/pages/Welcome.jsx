import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Logo from '../img/Example-Logo.png';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import './Welcome.css';
import { Link } from "react-router-dom";
import Footer from '../components/Footer';

const Welcome = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [img1, img2, img3];
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const verifyCookie = async () => {
      setIsLoading(true);
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
      setIsSignedIn(status);
      setIsLoading(false);
      return status
        ? null
        : (removeCookie("token"), navigate("/welcome"));
      
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Login = () => {
    navigate("/login");
  };

  const Signup = () => {
    navigate("/signup");
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  const NavigationDots = ({ currentImageIndex, setCurrentImageIndex, imagesLength }) => {
    return (
      <div className="navigation-dots">
        {Array.from({ length: imagesLength }).map((_, index) => (
          <button
            key={index}
            className={`navigation-dot ${currentImageIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
   // Clean up function
   return () => {
    clearInterval(timer);
  };
}, [currentImageIndex]);
  if(isLoading) return <div>Loading...</div>;
  return (
    <>
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
    <div className="slider">
      <div className="slider-side left" onClick={prevImage} onMouseEnter={() => setShowPrevButton(true)} onMouseLeave={() => setShowPrevButton(false)}>
        {showPrevButton && <button className="slider-button prev">&lt;</button>}
      </div>
      <img src={images[currentImageIndex]} className="full-width-image" alt="Slideshow" />    
        <div className="slider-side right" onClick={nextImage}
         onMouseEnter={() => setShowNextButton(true)} 
        onMouseLeave={() => setShowNextButton(false)}>
        {showNextButton && <button className="slider-button next">&gt;</button>}
      </div>
    </div>
    <NavigationDots currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} imagesLength={images.length} />
    <h1 className="welcome">Welcome</h1>
      <p className="welcome-info">Welcome to the customer portal for Goodwill Sacramento Valley & Northern Nevada! This site is designed to provide you, our customers and donors, access to tools and information to make your donating experience even better. Thank you for changing lives for good!</p>
      <Footer/>
    </>
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
  
export default Welcome;