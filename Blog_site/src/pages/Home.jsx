import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import cardData from '../utils/cardData';
import { getAllCourses } from './../utils/Courses'; // Import the getAllCourses function
import CardSection from './../components/CardSection';
import CardCse from './../components/CardCse';

const Home = () => {
  const [courses, setCourses] = useState([]); // State for courses

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Fetch courses
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data); // Set fetched courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="bg-gray-50 font-sans mt-20"> {/* Add mt-20 to avoid overlapping */}
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-32 text-center flex flex-col items-center justify-center"
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold leading-tight mb-6 tracking-wide">
            Welcome to My Blog
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Sharing my knowledge and experiences on Competitive Programming, CSE Core Topics, and more!
          </p>
          <a
            href="#featured"
            className="bg-yellow-400 text-gray-800 py-4 px-10 rounded-full font-semibold hover:bg-yellow-500 transition duration-300 shadow-lg"
            data-aos="zoom-in"
          >
            Explore Posts
          </a>
        </div>

        {/* Bottom Wave Decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-[100px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C300,60 900,60 1200,0 L1200,120 L0,120 Z"
              className="fill-current text-gray-50"
            ></path>
          </svg>
        </div>
      </section>

      {/* Competitive Programming Section */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-center items-center">
            <CardSection title="Competitive Programming Resources" data={cardData} />
          </div>
        </div>
      </section>

      {/* Computer Science And Engineering Courses Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-center items-center">
            {/* Render courses dynamically */}
            <CardCse title="Computer Science And Engineering Courses" data={courses} />
          </div>
        </div>
      </section>

      {/* Set Problem and Concept Section */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2
            className="text-4xl font-bold text-indigo-800 mb-8"
            data-aos="fade-up"
          >
            Get Involved
          </h2>
          <p
            className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Contribute by setting problems and concepts to help others enhance their skills.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/set-problem"
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Set Problems
            </Link>
            <Link
              to="/set-concept"
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Set Concepts
            </Link>
            <Link
              to="/set-resource"
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Set Resources
            </Link>
            <Link
              to="/set-Courses"
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Set Courses
            </Link>
            <Link
              to="/set-Chapters"
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Set Chapters
            </Link>
            <Link
              to="/set-Topics"
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Set Topics
            </Link>
            <Link
              to="/set-Image"
              className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-lg"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Set Contents
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
