import React from 'react';
import icon from './assets/icon.svg';

const Header = () => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img src={icon} alt="logo" className="mr-2" />
            <div>Yearn</div>
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Header;
