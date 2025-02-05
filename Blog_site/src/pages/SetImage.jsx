import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllTopics } from '../utils/Topics';
import { getAllContents, deleteContent, updateContent } from '../utils/Contents';

const SetImage = () => {
    const [file, setFile] = useState(null);
    const [exercise, setExercise] = useState('');
    const [solution, setSolution] = useState('');
    const [topicId, setTopicId] = useState('');
    const [topics, setTopics] = useState([]);
    const [contents, setContents] = useState([]);
    const [selectedContent, setSelectedContent] = useState(null); // To manage the selected content for editing
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // To manage the modal visibility
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // To manage delete confirmation modal
    const [contentToDelete, setContentToDelete] = useState(null); // Store content id to delete

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getAllTopics();
                setTopics(data);
            } catch (error) {
                console.error('Failed to fetch topics', error);
            }
        };

        const fetchContents = async () => {
            try {
                const data = await getAllContents();
                setContents(data);
            } catch (error) {
                console.error('Failed to fetch contents', error);
            }
        };

        fetchTopics();
        fetchContents();
    }, []);

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && !selectedFile.type.startsWith('image/')) {
            alert('Only image files are allowed!');
            return;
        }
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file || !exercise || !solution || !topicId) {
            alert('Please select a file and provide exercise/solution/topic_id!');
            return;
        }

        const formdata = new FormData();
        formdata.append('image', file);
        formdata.append('exercise', exercise);
        formdata.append('solution', solution);
        formdata.append('topic_id', topicId);

        try {
            const res = await axios.post('http://localhost:5000/upload', formdata);
            alert('Upload successful!');
            console.log(res.data);

            setFile(null);
            setExercise('');
            setSolution('');
            setTopicId('');

            const updatedContents = await getAllContents();
            setContents(updatedContents);
        } catch (err) {
            alert('Failed to upload image. Please try again.');
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (contentToDelete) {
            try {
                await deleteContent(contentToDelete);
                alert('Content deleted successfully!');

                const updatedContents = await getAllContents();
                setContents(updatedContents);

                setIsDeleteModalOpen(false); // Close the modal
            } catch (err) {
                alert('Failed to delete content. Please try again.');
                console.error(err);
            }
        }
    };

    const handleEdit = (content) => {
        setSelectedContent(content);
        setExercise(content.exercise);
        setSolution(content.solution);
        setTopicId(content.topic_id);
        setIsEditModalOpen(true); // Open the edit modal
    };

    const handleUpdate = async () => {
        if (!file && !exercise && !solution && !topicId) {
            alert('Please select a file or provide the necessary details to update!');
            return;
        }

        const formdata = new FormData();
        if (file) {
            formdata.append('image', file);
        }
        formdata.append('exercise', exercise);
        formdata.append('solution', solution);
        formdata.append('topic_id', topicId);

        try {
            const res = await axios.put(`http://localhost:5000/content/${selectedContent.id}`, formdata);
            alert('Content updated successfully!');
            console.log(res.data);

            setIsEditModalOpen(false); // Close the edit modal
            setSelectedContent(null);
            setFile(null);
            setExercise('');
            setSolution('');
            setTopicId('');

            const updatedContents = await getAllContents();
            setContents(updatedContents);
        } catch (err) {
            alert('Failed to update content. Please try again.');
            console.error(err);
        }
    };

    // Cancel editing and reset fields
    const handleCancelEdit = () => {
        setIsEditModalOpen(false); // Close the modal
        setSelectedContent(null);
        setExercise('');
        setSolution('');
        setTopicId('');
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 mt-20">
            {/* Upload/Update Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Upload Image</h2>
                <div className="flex justify-center items-center mb-6">
                    <input
                        type="file"
                        onChange={handleFile}
                        className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Exercise</label>
                    <textarea
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Solution</label>
                    <textarea
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Topic</label>
                    <select
                        value={topicId}
                        onChange={(e) => setTopicId(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
                    >
                        <option value="">Select a Topic</option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={topic.id}>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-between">
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete?</h3>
                        <div className="flex justify-between">
                            <button
                                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                                onClick={handleDelete}
                            >
                                Confirm
                            </button>
                            <button
                                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                                onClick={() => setIsDeleteModalOpen(false)} // Close modal
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Content Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-2xl font-semibold text-center mb-6">Edit Content</h3>
                        <div className="flex justify-center items-center mb-6">
                            <input
                                type="file"
                                onChange={handleFile}
                                className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Exercise</label>
                            <textarea
                                value={exercise}
                                onChange={(e) => setExercise(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Solution</label>
                            <textarea
                                value={solution}
                                onChange={(e) => setSolution(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Topic</label>
                            <select
                                value={topicId}
                                onChange={(e) => setTopicId(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full text-gray-700"
                            >
                                <option value="">Select a Topic</option>
                                {topics.map((topic) => (
                                    <option key={topic.id} value={topic.id}>
                                        {topic.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <button
                                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleUpdate}
                            >
                                Update
                            </button>
                            <button
                                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                                onClick={handleCancelEdit} // Cancel editing
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Content List */}
            <div className="w-full bg-white p-6 rounded-lg shadow-lg mt-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-2">All Contents</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contents.map((content) => (
                        <div
                            key={content.id}
                            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-50"
                        >
                            <img
                                src={`images/${content.image}`}
                                alt="Content"
                                className="w-full h-40 rounded-md object-cover mb-4"
                            />
                            <div>
                                <p className="text-gray-800 font-medium text-lg mb-2 truncate">
                                    <strong>Exercise:</strong> {content.exercise}
                                </p>
                                <p className="text-gray-600 text-sm mb-2 truncate">
                                    <strong>Solution:</strong> {content.solution}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    <strong>Topic ID:</strong> {content.topic_id}
                                </p>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleEdit(content)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setContentToDelete(content.id);
                                        setIsDeleteModalOpen(true); // Show delete confirmation modal
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SetImage;
