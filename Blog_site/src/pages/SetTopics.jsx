import React, { useState, useEffect } from 'react';
import { getAllTopics, addTopic, updateTopic, deleteTopic } from '../utils/Topics';
import { getAllChapters } from '../utils/Chapters';

const SetTopics = () => {
  const [topics, setTopics] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [topic, setTopic] = useState({ chapter_id: '', name: '', explanation: '' });
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);
  const [confirmation, setConfirmation] = useState({ open: false, action: null, id: null });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTopics = await getAllTopics();
      setTopics(fetchedTopics);
      const fetchedChapters = await getAllChapters();
      setChapters(fetchedChapters);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTopic((prev) => ({ ...prev, [name]: value }));
  };

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (topic.chapter_id && topic.name && topic.explanation) {
      if (editId) {
        await updateTopic(editId, topic);
        showMessage('Topic updated successfully!');
      } else {
        await addTopic(topic);
        showMessage('Topic added successfully!');
      }
      setTopic({ chapter_id: '', name: '', explanation: '' });
      setEditId(null);
      const updatedTopics = await getAllTopics();
      setTopics(updatedTopics);
    } else {
      showMessage('Please fill in all fields.');
    }
  };

  const handleDelete = async (id) => {
    await deleteTopic(id);
    showMessage('Topic deleted successfully!');
    const updatedTopics = await getAllTopics();
    setTopics(updatedTopics);
  };

  const confirmAction = (action, id) => {
    setConfirmation({ open: true, action, id });
  };

  const executeConfirmation = async () => {
    const { action, id } = confirmation;
    if (action === 'delete') {
      await handleDelete(id);
    } else if (action === 'edit') {
      const topicToEdit = topics.find((t) => t.id === id);
      setTopic({ chapter_id: topicToEdit.chapter_id, name: topicToEdit.name, explanation: topicToEdit.explanation });
      setEditId(id);
    }
    setConfirmation({ open: false, action: null, id: null });
  };

  return (
    <div className="mt-20 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Topics</h1>

      {/* Add/Edit Topic Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="chapter_id" className="block text-sm font-semibold text-gray-700">
            Chapter
          </label>
          <select
            id="chapter_id"
            name="chapter_id"
            value={topic.chapter_id}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a chapter</option>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Topic Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={topic.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter topic name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="explanation" className="block text-sm font-semibold text-gray-700">
            Explanation
          </label>
          <textarea
            id="explanation"
            name="explanation"
            value={topic.explanation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter topic explanation"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {editId ? 'Update Topic' : 'Add Topic'}
        </button>
      </form>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      <h2 className="text-xl font-bold mb-4">Current Topics</h2>
      <ul className="bg-white shadow-md rounded p-6">
        {topics.map((t) => (
          <li key={t.id} className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="text-gray-500 text-sm">
                Chapter: {chapters.find((chapter) => chapter.id === t.chapter_id)?.name}
              </p>
              {t.explanation && <p className="text-gray-700 text-sm mt-2">{t.explanation}</p>} {/* Display explanation */}
            </div>
            <div>
              <button
                onClick={() => confirmAction('edit', t.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => confirmAction('delete', t.id)}
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

export default SetTopics;
