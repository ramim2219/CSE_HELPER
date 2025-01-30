import React from 'react';

const About = () => {
  return (
    <div className="container mt-20 mx-auto p-8 bg-white rounded-lg shadow-lg">
      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Profile Image */}
        <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
          <img
            src="/images/profile.jpeg" // Replace with the actual image path
            alt="Shafayet Ullah Ramim"
            className="rounded-full w-48 h-48 object-cover shadow-md border-4 border-indigo-200"
          />
        </div>

        {/* Introduction and Purpose */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">
            About Me
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Hello! I’m 
            <span className="font-semibold text-indigo-800"> Shafayet Ullah Ramim</span>, a 
            <span className="font-semibold text-indigo-800"> Computer Science and Engineering</span> 
            student at Premier University, Chittagong. With graduation on the horizon, 
            I am driven by a passion for simplifying complex concepts and empowering others 
            to achieve their goals in the field of Computer Science.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            My journey also includes participating in competitive programming competitions. 
            Notably, I participated in the prestigious 
            <span className="font-semibold text-indigo-800"> ICPC Onsite Contest 2024</span>, 
            where I successfully solved two challenging problems, honing my problem-solving 
            and teamwork skills.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            I’ve created this blog to serve as a resource hub for students, professionals, 
            and anyone curious about exploring core topics in CSE. Whether it’s understanding 
            key concepts or mastering 
            <span className="font-semibold text-indigo-800"> Competitive Programming</span>, 
            this blog is my way of giving back to the community.
          </p>
        </div>
      </div>

      {/* Separator */}
      <hr className="my-8 border-gray-300" />

      {/* Mission Section */}
      <div>
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          My mission is to make learning an engaging and empowering experience by breaking 
          down complex topics into digestible, actionable insights. This blog aims to bridge 
          the gap between theoretical knowledge and practical implementation, focusing on:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
          <li>
            Providing a clear roadmap for mastering 
            <span className="font-semibold text-indigo-800"> Competitive Programming</span>.
          </li>
          <li>
            Exploring foundational concepts in 
            <span className="font-semibold text-indigo-800"> Computer Science and Engineering</span>.
          </li>
          <li>
            Sharing strategies, resources, and tips for academic and professional growth.
          </li>
        </ul>
      </div>

      {/* Closing Section */}
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          Thank you for visiting my blog. I hope the content here serves as a 
          valuable resource in your journey. If you have questions, feedback, 
          or suggestions, feel free to get in touch. Let’s grow and succeed together!
        </p>
        <p className="text-lg text-indigo-800 font-semibold mt-4">
          Let’s connect and inspire each other to achieve new heights.
        </p>
      </div>
    </div>
  );
};

export default About;
