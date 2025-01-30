import React from 'react';

const Contact = () => {
  return (
    <div className="mt-20 container mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-indigo-900">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Feel free to reach out! We're here to help and answer any questions you may have.
        </p>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-8">
        {/* Email */}
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-indigo-800 text-2xl mr-4">
            <i className="fas fa-envelope"></i>
          </span>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Email:</span> 
            <a href="mailto:shafayetullah200119@gmail.com" className="text-indigo-600 hover:underline ml-2">
              shafayetullah200119@gmail.com
            </a>
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center mb-4 md:mb-0">
          <span className="text-indigo-800 text-2xl mr-4">
            <i className="fas fa-phone"></i>
          </span>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Phone:</span> 
            <a href="tel:+8801829742139" className="text-indigo-600 hover:underline ml-2">
              +880 1829 742139
            </a>
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">Follow Me</h2>
        <div className="flex justify-center space-x-6">
          {/* Add your actual links here */}
          <a 
            href="https://github.com/MishkatIT" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-800 hover:text-indigo-600 text-2xl"
          >
            <i className="fab fa-github"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/shafayet-ullah-ramim/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-800 hover:text-indigo-600 text-2xl"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a 
            href="https://twitter.com/yourtwitterhandle" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-800 hover:text-indigo-600 text-2xl"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a 
            href="https://www.facebook.com/yourfacebookhandle" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-800 hover:text-indigo-600 text-2xl"
          >
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
