import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const appName = "Pisto WellPoint";

  return (
    <footer className="bg-green-900 text-white mt-1">
      <div className="w-full mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-3">{appName}</h2>
          <p className="text-sm">
            Connecting patients with verified doctors. Trusted healthcare at
            your fingertips.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/contact-admin" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Find a Doctor
              </Link>
            </li>
               <li>
              <Link to="/" className="hover:underline">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">Email: support@pistowellpoint.com</p>
          <p className="text-sm">Phone: +254 712 345 678</p>
          <p className="text-sm">Location: Nairobi, Kenya</p>
        </div>
      </div>
      <div className="text-center text-sm bg-green-800 py-4">
        &copy; {new Date().getFullYear()} {appName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
