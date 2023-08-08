import React from 'react';
import './header.css';
const Header = () => {
  return (
    <header>
      <div className="profile">

      </div>
      <div className="dropdown">
        <button className="dropbtn">Menu</button>
        <div className="dropdown-content">
          <a href="#">To Team Page</a>
          <a href="#">Log Out</a>
        </div>
      </div>
    </header>
  );
};

export default Header;