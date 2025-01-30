import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllTopics } from '../utils/Topics'; // Import the function to get topics
import { getAllContents, deleteContent } from '../utils/Contents'; // Import the function to get contents and delete content

const SetImage = () => {
    const [file, setFile] = useState(null);
    const [exercise, setExercise] = useState('');
    const [solution, setSolution] = useState('');
    const [topicId, setTopicId] = useState('');
    const [topics, setTopics] = useState([]);
    const [contents, setContents] = useState([]);

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
    
            // Reset all input fields
            setFile(null);
            setExercise('');
            setSolution('');
            setTopicId('');
    
            // Refresh contents after successful upload
            const updatedContents = await getAllContents(); // Fetch the updated contents
            setContents(updatedContents);
        } catch (err) {
            alert('Failed to upload image. Please try again.');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this content?')) {
            try {
                await deleteContent(id);
                alert('Content deleted successfully!');
                
                // Refresh the content list after deletion
                const updatedContents = await getAllContents();
                setContents(updatedContents);
            } catch (err) {
                alert('Failed to delete content. Please try again.');
                console.error(err);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 mt-20">
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
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={handleUpload}
                    >
                        Upload
                    </button>
                </div>
            </div>
            {/* Display all contents */}
            <div className="w-full bg-white p-6 rounded-lg shadow-lg mt-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-2">
                    All Contents
                </h3>
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
                                    onClick={() => handleDelete(content.id)}
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
