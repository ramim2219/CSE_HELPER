import React, { useState, useEffect } from 'react';
import { addProblem, getAllProblems, updateProblem, deleteProblem } from '../utils/Problems';

const SetProblem = () => {
  const [problem, setProblem] = useState({ 
    Name: '', 
    Link: '', 
    Type: '', 
    TopicName: '', 
    Explanation: '',  // Added
    Code: '',         // Added
    Video_link: ''    // Added
  });
  const [message, setMessage] = useState('');
  const [problemList, setProblemList] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [editId, setEditId] = useState(''); // ID of the problem being edited
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal for editing a problem

  // Fetch problems when the component loads
  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await getAllProblems();
      setProblemList(problems);
    };
    fetchProblems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem((prev) => ({ ...prev, [name]: value }));
  };

  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 3000); // Hide message after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (problem.Name && problem.Link && problem.Type && problem.TopicName) {
      await addProblem(problem); // Assuming addProblem is async
      const updatedProblems = await getAllProblems(); // Re-fetch the list of problems
      setProblemList(updatedProblems);
      showMessage('Problem added successfully!');
      setProblem({ 
        Name: '', 
        Link: '', 
        Type: '', 
        TopicName: '', 
        Explanation: '',  // Reset Explanation
        Code: '',         // Reset Code
        Video_link: ''    // Reset Video_link
      });
    } else {
      showMessage('Please fill in all fields.');
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteProblem(deleteId); // Assuming deleteProblem is async
      const updatedProblems = await getAllProblems(); // Re-fetch the list of problems after deletion
      setProblemList(updatedProblems);
      setIsModalOpen(false);
      showMessage('Problem deleted successfully!');
    }
  };

  const handleEdit = async () => {
    if (editId && problem.Name && problem.Link && problem.Type && problem.TopicName) {
      await updateProblem(editId, problem); // Assuming updateProblem is async
      const updatedProblems = await getAllProblems(); // Re-fetch the list of problems after update
      setProblemList(updatedProblems);
      setIsEditModalOpen(false);
      showMessage('Problem updated successfully!');
      setProblem({ 
        Name: '', 
        Link: '', 
        Type: '', 
        TopicName: '', 
        Explanation: '',  // Reset Explanation
        Code: '',         // Reset Code
        Video_link: ''    // Reset Video_link
      });
    } else {
      showMessage('Please fill in all fields.');
    }
  };

  return (
    <div className="mt-20 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Problems</h1>

      {/* Add Problem Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="Name" className="block text-sm font-semibold text-gray-700">Problem Name</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={problem.Name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter problem name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Link" className="block text-sm font-semibold text-gray-700">Problem Link</label>
          <input
            type="text"
            id="Link"
            name="Link"
            value={problem.Link}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter problem link"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="Type" className="block text-sm font-semibold text-gray-700">Problem Type</label>
          <input
            type="text"
            id="Type"
            name="Type"
            value={problem.Type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter problem type"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="TopicName" className="block text-sm font-semibold text-gray-700">Topic Name</label>
          <input
            type="text"
            id="TopicName"
            name="TopicName"
            value={problem.TopicName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter topic name"
          />
        </div>

        {/* New Explanation Field */}
        <div className="mb-4">
          <label htmlFor="Explanation" className="block text-sm font-semibold text-gray-700">Explanation</label>
          <textarea
            id="Explanation"
            name="Explanation"
            value={problem.Explanation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter problem explanation"
          />
        </div>

        {/* New Code Field */}
        <div className="mb-4">
          <label htmlFor="Code" className="block text-sm font-semibold text-gray-700">Code</label>
          <textarea
            id="Code"
            name="Code"
            value={problem.Code}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter solution code"
          />
        </div>

        {/* New Video Link Field */}
        <div className="mb-4">
          <label htmlFor="Video_link" className="block text-sm font-semibold text-gray-700">Video Link</label>
          <input
            type="text"
            id="Video_link"
            name="Video_link"
            value={problem.Video_link}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter video link"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Add Problem
        </button>
      </form>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      <h2 className="text-xl font-bold mb-4">Current Problems</h2>
      <ul className="bg-white shadow-md rounded p-6">
        {problemList.map((p) => (
          <li key={p.id} className="flex justify-between items-center mb-4">
            <div>
              <a href={p.Link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {p.Name}
              </a>
              <p className="text-gray-500 text-sm">{`Type: ${p.Type}, Topic: ${p.TopicName}`}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  setProblem({ 
                    Name: p.Name, 
                    Link: p.Link, 
                    Type: p.Type, 
                    TopicName: p.TopicName,
                    Explanation: p.Explanation, 
                    Code: p.Code, 
                    Video_link: p.Video_link
                  });
                  setEditId(p.id);
                  setIsEditModalOpen(true);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDeleteId(p.id);
                  setIsModalOpen(true);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal for Delete */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this problem?</h3>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modal for Edit */}
      {isEditModalOpen && (
        <div className="mt-20 fixed inset-0 z-20 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-3/4 sm:w-1/2 lg:w-1/3 max-h-[80vh] overflow-y-auto">
            {/* Modal content */}
            <h3 className="text-lg font-semibold mb-4">Edit Problem</h3>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label htmlFor="Name" className="block text-sm font-semibold text-gray-700">Problem Name</label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={problem.Name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter problem name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Link" className="block text-sm font-semibold text-gray-700">Problem Link</label>
                <input
                  type="text"
                  id="Link"
                  name="Link"
                  value={problem.Link}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter problem link"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Type" className="block text-sm font-semibold text-gray-700">Problem Type</label>
                <input
                  type="text"
                  id="Type"
                  name="Type"
                  value={problem.Type}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter problem type"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="TopicName" className="block text-sm font-semibold text-gray-700">Topic Name</label>
                <input
                  type="text"
                  id="TopicName"
                  name="TopicName"
                  value={problem.TopicName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter topic name"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Explanation" className="block text-sm font-semibold text-gray-700">Explanation</label>
                <textarea
                  id="Explanation"
                  name="Explanation"
                  value={problem.Explanation}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter problem explanation"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Code" className="block text-sm font-semibold text-gray-700">Code</label>
                <textarea
                  id="Code"
                  name="Code"
                  value={problem.Code}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter solution code"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="Video_link" className="block text-sm font-semibold text-gray-700">Video Link</label>
                <input
                  type="text"
                  id="Video_link"
                  name="Video_link"
                  value={problem.Video_link}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter video link"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              >
                Save Changes
              </button>
            </form>
            <button
              onClick={() => {
                setIsEditModalOpen(false);
                setProblem({
                  Name: '',
                  Link: '',
                  Type: '',
                  TopicName: '',
                  Explanation: '', // Reset Explanation
                  Code: '', // Reset Code
                  Video_link: '' // Reset Video_link
                });
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-600 transition-all"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default SetProblem;
