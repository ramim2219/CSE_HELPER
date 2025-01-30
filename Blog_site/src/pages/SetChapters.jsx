import React, { useState, useEffect } from 'react';
import { getAllChapters, addChapter, updateChapter, deleteChapter } from '../utils/Chapters';
import { getAllCourses } from '../utils/Courses';

const SetChapters = () => {
  const [chapters, setChapters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [chapter, setChapter] = useState({ course_id: '', name: '' });
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [confirmation, setConfirmation] = useState({ open: false, action: null, id: null });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedChapters = await getAllChapters();
      setChapters(fetchedChapters);
      const fetchedCourses = await getAllCourses();
      setCourses(fetchedCourses);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChapter((prev) => ({ ...prev, [name]: value }));
  };

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chapter.course_id && chapter.name) {
      if (editId) {
        await updateChapter(editId, chapter);
        showMessage('Chapter updated successfully!');
      } else {
        await addChapter(chapter);
        showMessage('Chapter added successfully!');
      }
      setChapter({ course_id: '', name: '' });
      setEditId(null);
      const updatedChapters = await getAllChapters();
      setChapters(updatedChapters);
    } else {
      showMessage('Please fill in all fields.');
    }
  };

  const handleDelete = async (id) => {
    await deleteChapter(id);
    showMessage('Chapter deleted successfully!');
    const updatedChapters = await getAllChapters();
    setChapters(updatedChapters);
  };

  const confirmAction = (action, id) => {
    setConfirmation({ open: true, action, id });
  };

  const executeConfirmation = async () => {
    const { action, id } = confirmation;
    if (action === 'delete') {
      await handleDelete(id);
    } else if (action === 'edit') {
      const chapterToEdit = chapters.find((c) => c.id === id);
      setChapter({ course_id: chapterToEdit.course_id, name: chapterToEdit.name });
      setEditId(id);
    }
    setConfirmation({ open: false, action: null, id: null });
  };

  return (
    <div className="mt-20 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Chapters</h1>

      {/* Add/Edit Chapter Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="course_id" className="block text-sm font-semibold text-gray-700">
            Course
          </label>
          <select
            id="course_id"
            name="course_id"
            value={chapter.course_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Chapter Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={chapter.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter chapter name"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {editId ? 'Update Chapter' : 'Add Chapter'}
        </button>
      </form>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      <h2 className="text-xl font-bold mb-4">Current Chapters</h2>
      <ul className="bg-white shadow-md rounded p-6">
        {chapters.map((c) => (
          <li key={c.id} className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">{c.name}</h3>
              <p className="text-gray-500 text-sm">
                Course: {courses.find((course) => course.id === c.course_id)?.title}
              </p>
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

export default SetChapters;