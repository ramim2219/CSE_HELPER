import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCoursesWithId } from '../../utils/Courses';
import { getChaptersByCourseId } from '../../utils/Chapters';
import TopicsBasedId from './TopicsBasedId';

const Courses = () => {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loadingChapters, setLoadingChapters] = useState(true);
  const [error, setError] = useState(null);
  const [openChapters, setOpenChapters] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCoursesWithId(course_id);
        setCourse(response);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to fetch course details.');
      }
    };

    const fetchChapters = async () => {
      try {
        const response = await getChaptersByCourseId(course_id);
        setChapters(response);
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setError('Failed to fetch chapters.');
      } finally {
        setLoadingChapters(false);
      }
    };

    fetchCourse();
    fetchChapters();
  }, [course_id]);

  const toggleChapter = (chapterId) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId], // Toggle open state
    }));
  };

  return (
    <div className="container mx-auto px-6 py-12 mt-20">
      {/* Error Message */}
      {error && (
        <div className="text-center bg-red-100 text-red-600 p-4 rounded-lg max-w-2xl mx-auto shadow">
          {error}
        </div>
      )}

      {/* Course Details */}
      {!course ? (
        <div className="text-center text-gray-600 text-lg">Loading course details...</div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">{course.title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">{course.description}</p>
        </div>
      )}

      {/* Chapters Section */}
      <div className="mt-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Course Chapters</h2>

        {loadingChapters ? (
          <p className="text-gray-500 text-lg text-center">Loading chapters...</p>
        ) : chapters.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">No chapters found for this course.</p>
        ) : (
          <div className="max-w-4xl mx-auto">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="bg-gray-50 rounded-lg shadow-md border border-gray-200 mb-4">
                {/* Chapter Header - Clickable */}
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full text-left p-5 flex justify-between items-center text-lg font-semibold text-gray-900 focus:outline-none"
                >
                  {chapter.name}
                  <span className={`transform transition-transform ${openChapters[chapter.id] ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                  </span>
                </button>

                {/* Chapter Topics (Dropdown Content) */}
                {openChapters[chapter.id] && (
                  <div className="p-5 bg-white border-t border-gray-200">
                    <TopicsBasedId chapter_id={chapter.id} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
