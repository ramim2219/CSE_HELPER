import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './components/Contact';
import CompetitveRoadmap from './pages/Programming/CompetitveRoadmap';
import BasicsOfCpp from './pages/Programming/BasicsOfCpp';
import TopicList from './pages/Programming/TopicList';
import SetProblem from './pages/SetProblem';
import SetConcept from './pages/SetConcept';
import SetResource from './pages/SetResource';
import SetCourses from './pages/SetCourses';
import SetChapters from './pages/SetChapters';
import SetTopics from './pages/SetTopics';
import SetImage from './pages/SetImage';
import Courses from './pages/CSE_Courses/Courses';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Basics-Of-Cpp" element={<BasicsOfCpp />} />
        <Route path="/Topic-List" element={<TopicList />} />
        <Route path="/set-problem" element={<SetProblem />} />
        <Route path="/set-concept" element={<SetConcept />} />
        <Route path="/set-resource" element={<SetResource />} />
        <Route path="/set-Courses" element={<SetCourses />} />
        <Route path="/set-Chapters" element={<SetChapters />} />
        <Route path="/set-Topics" element={<SetTopics />} />
        <Route path="/set-Image" element={<SetImage />} />
        <Route path="/courses/:course_id" element={<Courses />}  />
        <Route path="/competitive-programming-roadmap" element={<CompetitveRoadmap />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
