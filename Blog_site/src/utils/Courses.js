import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/courses';

// Fetch all courses
export const getAllCourses = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

// Fetch a course by its ID
export const getCoursesWithId = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};

// Add a new course
export const addCourse = async (course) => {
  const response = await axios.post(apiUrl, {
    title: course.title, // Changed from name to title
    description: course.description,
  });
  return response.data;
};

// Update a course
export const updateCourse = async (id, updatedCourse) => {
  const response = await axios.put(`${apiUrl}/${id}`, {
    title: updatedCourse.title, // Changed from name to title
    description: updatedCourse.description,
  });
  return response.data;
};

// Delete a course
export const deleteCourse = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};
