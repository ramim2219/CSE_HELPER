import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCourses } from '../../utils/Courses';
import { getAllChapters } from '../../utils/Chapters'; 
import { getAllTopics } from '../../utils/Topics';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';

const Courses = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [topics, setTopics] = useState([]);
  const [contents, setContents] = useState({});
  const [openChapters, setOpenChapters] = useState({});

  // Fetch course details by course_id
  const fetchCourse = async () => {
    try {
      const response = await getAllCourses();
      const course = response.find((c) => c.id === parseInt(course_id));
      setCourse(course);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  // Fetch chapters for the specific course
  const fetchChapters = async () => {
    try {
      const response = await getAllChapters();
      const courseChapters = response.filter((chapter) => chapter.course_id === parseInt(course_id));
      setChapters(courseChapters);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  // Fetch all topics
  const fetchTopics = async () => {
    try {
      const response = await getAllTopics();
      setTopics(response);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  // Fetch contents for a given topic_id
  const fetchContentsForTopic = async (topicId) => {
  try {
    const response = await axios.get(`/contents/${topicId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON.");
    }
    const data = await response.json();
    setContents((prev) => ({
      ...prev,
      [topicId]: data,
    }));
  } catch (error) {
    console.error("Error fetching contents:", error);
  }
};

  
  

  // Toggle the visibility of the chapter's topics
  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId], // Toggle the visibility of the chapter's topics
    }));
  };

  useEffect(() => {
    fetchCourse();
    fetchChapters();
    fetchTopics();
  }, [course_id]);

  useEffect(() => {
    // Fetch contents for each topic once topics are available
    topics.forEach((topic) => {
      fetchContentsForTopic(topic.id);
    });
  }, [topics]);

  return (
    <div className="container mx-auto px-6 py-10 mt-20 max-w-7xl">
      {course ? (
        <div className="bg-white shadow-xl rounded-lg p-8 mb-12 border border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-900">{course.title}</h1>
          <p className="text-lg mt-4 text-gray-600">{course.description}</p>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Loading course...</p>
      )}

      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Chapters</h2>
        {chapters.length > 0 ? (
          <ul className="space-y-8">
            {chapters.map((chapter)=>{
              const chapterTopics=topics.filter((topic) =>topic.chapter_id===chapter.id);
              return (
                <li key={chapter.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-semibold text-gray-800">{chapter.name}</span>
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="p-2 text-gray-600 hover:text-blue-500 focus:outline-none transition duration-200"
                    >
                      {openChapters[chapter.id] ? (
                        <FaChevronUp size={20} />
                      ) : (
                        <FaChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  {/* Conditionally display topics if chapter is open */}
                  {openChapters[chapter.id] && chapterTopics.length > 0 ? (
                    <ul className="mt-4 space-y-3">
                      {chapterTopics.map((topic) => (
                        <li key={topic.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-300">
                          <span className="text-lg text-gray-700">{topic.name}</span>
                          <span className="text-sm text-gray-500">Topic</span>

                          {/* Render contents under each topic */}
                          {contents[topic.id] && contents[topic.id].length > 0 ? (
                            <ul className="mt-3 space-y-2">
                              {contents[topic.id].map((content) => (
                                <li key={content.id} className="p-4 bg-gray-200 rounded-lg shadow-sm">
                                  <img
                                    src={`/images/${content.image}`}
                                    alt={content.exercise}
                                    className="w-20 h-20 object-cover rounded-md"
                                  />
                                  <div>
                                    <h4 className="font-semibold text-gray-800">{content.exercise}</h4>
                                    <p className="text-gray-600">{content.solution}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="mt-2 text-sm text-gray-500">No contents available for this topic.</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : openChapters[chapter.id] ? (
                    <p className="mt-4 text-sm text-gray-500">No topics available for this chapter.</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">No chapters available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
