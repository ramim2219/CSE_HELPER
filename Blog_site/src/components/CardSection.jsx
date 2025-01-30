import React from 'react';
import 'aos/dist/aos.css';

const CardSection = ({ title, data }) => {
  return (
    <div className="container mt-5">
      <section className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-indigo-800 mb-12" data-aos="fade-up">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {data.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h5 className="text-xl font-semibold mb-4">{item.title}</h5>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <a
                href={item.link}
                className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CardSection;