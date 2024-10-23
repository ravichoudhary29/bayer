import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold">Bayer Healthcare</h1>
        <nav className="mt-4">
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="hover:text-blue-300">
                Home
              </a>
            </li>
            <li>
              <a href="#health-topics" className="hover:text-blue-300">
                Health Topics
              </a>
            </li>
            <li>
              <a href="#resources" className="hover:text-blue-300">
                Resources
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-blue-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
