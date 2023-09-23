import React from 'react';

const Footer = () => {
  return (
    <footer className="bd-footer bg-dark text-white text-center py-3">
      <div className="con">
        <span>&copy; {new Date().getFullYear()} Resource One. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;