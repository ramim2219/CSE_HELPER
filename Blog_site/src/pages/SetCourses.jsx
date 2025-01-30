import React, { useState, useEffect } from 'react';
import { getAllCourses, addCourse, updateCourse, deleteCourse } from '../utils/Courses';

const SetCourses = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({ title: '', description: '' }); // Changed name to title
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState({ open: false, action: null, id: null });

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getAllCourses();
      setCourses(fetchedCourses);
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (course.title && course.description) { // Changed name to title
      if (editId) {
        await updateCourse(editId, course);
        showMessage('Course updated successfully!');
      } else {
        await addCourse(course);
        showMessage('Course added successfully!');
      }
      setCourse({ title: '', description: '' }); // Changed name to title
      setEditId(null);
      setIsModalOpen(false);
      const updatedCourses = await getAllCourses();
      setCourses(updatedCourses);
    } else {
      showMessage('Please fill in all fields.');
    }
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    showMessage('Course deleted successfully!');
    const updatedCourses = await getAllCourses();
    setCourses(updatedCourses);
  };

  const confirmAction = (action, id) => {
    setConfirmation({ open: true, action, id });
  };

  const executeConfirmation = async () => {
    const { action, id } = confirmation;
    if (action === 'delete') {
      await handleDelete(id);
    } else if (action === 'edit') {
      const courseToEdit = courses.find((c) => c.id === id);
      setCourse({ title: courseToEdit.title, description: courseToEdit.description }); // Changed name to title
      setEditId(id);
      setIsModalOpen(true);
    }
    setConfirmation({ open: false, action: null, id: null });
  };

  return (
    <div className="mt-20 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>

      {/* Add/Edit Course Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700"> {/* Changed name to title */}
            Course Title {/* Changed name to title */}
          </label>
          <input
            type="text"
            id="title" 
            name="title" 
            value={course.title} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter course title" 
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
            Course Description
          </label>
          <textarea
            id="description"
            name="description"
            value={course.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter course description"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {editId ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      <h2 className="text-xl font-bold mb-4">Current Courses</h2>
      <ul className="bg-white shadow-md rounded p-6">
        {courses.map((c) => (
          <li key={c.id} className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">{c.title}</h3> {/* Changed name to title */}
              <p className="text-gray-500 text-sm">{c.description}</p>
            </div>
            <div>
              <button
                onClick={() => confirmAction('edit', c.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => confirmAction('delete', c.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Confirmation Modal */}
      {confirmation.open && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-3/4 sm:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="mb-6">This action cannot be undone.</p>
            <div className="flex justify-end">
              <button
                onClick={executeConfirmation}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmation({ open: false, action: null, id: null })}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetCourses;
