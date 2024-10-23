
import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold">Bayer Healthcare</h1>
        <nav className="mt-4">
          <ul className="flex space-x-6">
            {/* Link to Home page */}
            <li>
              <Link href="/" passHref>
                <span className="hover:text-blue-300 cursor-pointer">Home</span>
              </Link>
            </li>

            {/* Link to Health Topics */}
            <li>
              <Link href="/health-topics" passHref>
                <span className="hover:text-blue-300 cursor-pointer">Health Topics</span>
              </Link>
            </li>

            {/* Link to Resources */}
            <li>
              <Link href="/resources" passHref>
                <span className="hover:text-blue-300 cursor-pointer">Resources</span>
              </Link>
            </li>

            {/* Link to About Us */}
            <li>
              <Link href="/about" passHref>
                <span className="hover:text-blue-300 cursor-pointer">About Us</span>
              </Link>
            </li>

            {/* Link to Contact */}
            <li>
              <Link href="/contact" passHref>
                <span className="hover:text-blue-300 cursor-pointer">Contact</span>
              </Link>
            </li>
            <li>
              <a href="/login" className="hover:text-blue-300">
                Login
              </a>
            </li>
            <li>
              <a href="/appointment" className="hover:text-blue-300">
                appointment
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
