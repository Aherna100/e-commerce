import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-center py-3">
      <p>
        &copy; {new Date().getFullYear()} MyCommercePage. All rights reserved.
      </p>
      <p>
        Address: 123 Main Street, City, State, ZIP
      </p>
      <p>
        Phone: 123-456-7890 | Email: info@mycommercepage.com
      </p>
    </footer>
  );
};

export default Footer;
