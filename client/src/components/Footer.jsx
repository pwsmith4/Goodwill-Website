import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div className="actions-container">
      <div className="about-us">
        <h2>About us</h2>
        <h3 className="about-us-text">While most people recognize us as a retail thrift chain, that is only a portion of our mission. Our stores provide revenue to help fund a comprehensive network of outreach programs and serve as job training sites.</h3>
      </div>
      <div className="links">
        <h2>Links</h2>
        <h3><Link to="/Privacy">Privacy Policy</Link></h3>
      </div>
      <div className="get-in-touch">
        <h2>Main Company Website</h2>
        <h3><a href="https://google.com" target="_blank" rel="noopener noreferrer">Example Website</a></h3>
      </div>
    </div>
  );
}
export default Footer;