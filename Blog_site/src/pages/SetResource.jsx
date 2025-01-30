import React, { useState, useEffect } from 'react';
import { addResource, getAllResources, updateResource, deleteResource } from '../utils/Resource';

const SetResource = () => {
    const [resource, setResource] = useState({
        title: '',
        link: '',
        topic: '',
    });
    const [message, setMessage] = useState('');
    const [resourceList, setResourceList] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [editId, setEditId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchResources = async () => {
            const resources = await getAllResources();
            setResourceList(resources);
        };
        fetchResources();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResource((prev) => ({ ...prev, [name]: value }));
    };

    const showMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (resource.title && resource.link && resource.topic) {
            await addResource(resource);
            const updatedResources = await getAllResources();
            setResourceList(updatedResources);
            showMessage('Resource added successfully!');
            setResource({
                title: '',
                link: '',
                topic: '',
            });
        } else {
            showMessage('Please fill in all fields.');
        }
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteResource(deleteId);
            const updatedResources = await getAllResources();
            setResourceList(updatedResources);
            setIsModalOpen(false);
            showMessage('Resource deleted successfully!');
        }
    };

    const handleEdit = async () => {
        if (editId && resource.title && resource.link && resource.topic) {
            await updateResource(editId, resource);
            const updatedResources = await getAllResources();
            setResourceList(updatedResources);
            setIsEditModalOpen(false);
            showMessage('Resource updated successfully!');
            setResource({
                title: '',
                link: '',
                topic: '',
            });
        } else {
            showMessage('Please fill in all fields.');
        }
    };

    return (
        <div className="mt-20 p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold mb-6 text-center">Manage Resources</h1>

            {/* Add Resource Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 mb-6">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Resource Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={resource.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter resource title"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="link" className="block text-sm font-semibold text-gray-700">Link</label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        value={resource.link}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter resource link"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="topic" className="block text-sm font-semibold text-gray-700">Topic</label>
                    <input
                        type="text"
                        id="topic"
                        name="topic"
                        value={resource.topic}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter resource topic"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-md w-full mt-4"
                >
                    Add Resource
                </button>
            </form>

            {message && <p className="text-green-500 text-center mb-4">{message}</p>}

            <h2 className="text-xl font-semibold mb-4 text-center">Current Resources</h2>
            <ul className="bg-white shadow-md rounded p-6">
                {resourceList.map((r) => (
                    <li key={r.id} className="flex justify-between items-center mb-4">
                        <div>
                            <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-medium">{r.title || 'No Title'}</a>
                            <p className="text-gray-500 text-sm">{`Topic: ${r.topic || 'No Topic'}`}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => {
                                    setResource({
                                        title: r.title || '',
                                        link: r.link || '',
                                        topic: r.topic || ''
                                    });
                                    setEditId(r.id);
                                    setIsEditModalOpen(true);
                                }}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setDeleteId(r.id);
                                    setIsModalOpen(true);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
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
                        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this resource?</h3>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Edit */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-md shadow-lg w-full sm:w-3/4 md:w-1/2 max-h-[80vh] overflow-y-auto">
                        <h3 className="text-2xl font-semibold mb-4 text-center">Edit Resource</h3>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={resource.title}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="link" className="block text-sm font-medium">Link</label>
                                <input
                                    type="url"
                                    id="link"
                                    name="link"
                                    value={resource.link}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="topic" className="block text-sm font-medium">Topic</label>
                                <input
                                    type="text"
                                    id="topic"
                                    name="topic"
                                    value={resource.topic}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                            >
                                Save Changes
                            </button>
                        </form>
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SetResource;
