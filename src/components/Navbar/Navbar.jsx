import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom'; // for redirecting to search results
import { Link } from 'react-router-dom';


const Navbar = () => {
  const navRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false); // Toggle search bar visibility
  const [searchTerm, setSearchTerm] = useState(''); // Store search term
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add('nav-dark');
        } else {
          navRef.current.classList.remove('nav-dark');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setShowSearch(false);
    }
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        <ul>
        <li><Link to="/">Home</Link></li>
  <li><Link to="/tv-shows">TV Shows</Link></li>
  <li><Link to="/movies">Movies</Link></li>
  <li><Link to="/new-popular">New & Popular</Link></li>
  <li><Link to="/my-list">My List</Link></li>
  <li><Link to="/languages">Browse by Languages</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        {showSearch && (
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
            <button type="submit">Go</button>
          </form>
        )}
        <img
          src={search_icon}
          alt="Search Icon"
          className="icons"
          onClick={() => setShowSearch(!showSearch)}
        />
        <p><Link to="/">Children</Link></p>
        <img src={bell_icon} alt="Notifications Icon" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Dropdown Icon" />
          <div className="dropdown">
            <p onClick={() => { logout(); }}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

