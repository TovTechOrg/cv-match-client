import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import logo from '../../assets/dark logo new colors.png'
import logo2 from '../../assets/pythiamatch_by_tovtech_logo.jpg'
const Footer: React.FC = () => {
  return (
    <footer className="text-white py-5" style={{backgroundColor:'#02014d'}}>
      <div className="container">
        <div className="row">
          {/* Logo Column */}
          <div className="col-md-3 mb-4 mb-md-0">
            <div className="mb-3">
              <img 
                src={logo2}
                alt="Company Logo" 
                height="200"
                width='200' 
                className="d-inline-block"
                style={{position:'absolute',left:'200px'}}
              />
            </div>
          </div>

          {/* Company Column */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              <li className="mb-2"><a href="/gallery" className="text-white text-decoration-none">Gallery</a></li>
              <li className="mb-2"><a href="/projects" className="text-white text-decoration-none">Projects</a></li>
              <li className="mb-2"><a href="/timeline" className="text-white text-decoration-none">Timeline</a></li>
            </ul>
          </div>
         
          {/* Apps Pages Column */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Apps Pages</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/calendar" className="text-white text-decoration-none">Calendar</a></li>
              <li className="mb-2"><a href="/gallery" className="text-white text-decoration-none">Gallery</a></li>
              <li className="mb-2"><a href="/chat" className="text-white text-decoration-none">Chat</a></li>
              <li className="mb-2"><a href="/deals" className="text-white text-decoration-none">Deals</a></li>
              <li className="mb-2"><a href="/kanban-board" className="text-white text-decoration-none">Kanban Board</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="col-md-3">
            <h5 className="text-uppercase mb-4">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/faq" className="text-white text-decoration-none">FAQ</a></li>
              <li className="mb-2"><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="row mt-5">
          <div className="col-12 d-flex justify-content-end">
            <a href="#" className="text-white me-3">
              <div className="d-flex justify-content-center align-items-center rounded-circle border border-white" style={{ width: '36px', height: '36px' }}>
                <Facebook  size={16} />
              </div>
            </a>
            <a href="#" className="text-white me-3">
              <div className="d-flex justify-content-center align-items-center rounded-circle border border-white" style={{ width: '36px', height: '36px' }}>
                <Twitter  size={16} />
              </div>
            </a>
            <a href="#" className="text-white me-3">
              <div className="d-flex justify-content-center align-items-center rounded-circle border border-white" style={{ width: '36px', height: '36px' }}>
                <Instagram  size={16} />
              </div>
            </a>
            <a href="#" className="text-white me-3">
              <div className="d-flex justify-content-center align-items-center rounded-circle border border-white" style={{ width: '36px', height: '36px' }}>
                <Linkedin  size={16} />
              </div>
            </a>
            <a href="#" className="text-white">
              <div className="d-flex justify-content-center align-items-center rounded-circle border border-white" style={{ width: '36px', height: '36px' }}>
                <Youtube  size={16} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;