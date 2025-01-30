import React, { useState, useEffect } from 'react';
import { addConcept, getAllConcepts, updateConcept, deleteConcept } from '../utils/Concept';

const SetConcept = () => {
    const [concept, setConcept] = useState({
        topic: '',
        explanationEnglish: '',
        explanationBangla: '',
        code: '',
        input: '',
        output: '',
        subTopic: '',
    });
    const [message, setMessage] = useState('');
    const [conceptList, setConceptList] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [editId, setEditId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Fetch concepts when the component loads
    useEffect(() => {
        const fetchConcepts = async () => {
            const concepts = await getAllConcepts();
            //console.log(concepts);
            setConceptList(concepts);
            //console.log(conceptList);
        };
        fetchConcepts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConcept((prev) => ({ ...prev, [name]: value }));
    };

    const showMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (concept.topic && concept.explanationEnglish && concept.explanationBangla && concept.code) {
            await addConcept(concept);
            const updatedConcepts = await getAllConcepts();
            setConceptList(updatedConcepts);
            showMessage('Concept added successfully!');
            setConcept({
                topic: '',
                explanationEnglish: '',
                explanationBangla: '',
                code: '',
                input: '',
                output: '',
                subTopic: '',
            });
        } else {
            showMessage('Please fill in all fields.');
        }
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteConcept(deleteId);
            const updatedConcepts = await getAllConcepts();
            setConceptList(updatedConcepts);
            setIsModalOpen(false);
            showMessage('Concept deleted successfully!');
        }
    };

    const handleEdit = async () => {
        if (editId && concept.topic && concept.explanationEnglish && concept.explanationBangla && concept.code) {
            await updateConcept(editId, concept);
            const updatedConcepts = await getAllConcepts();
            setConceptList(updatedConcepts);
            setIsEditModalOpen(false);
            showMessage('Concept updated successfully!');
            setConcept({
                topic: '',
                explanationEnglish: '',
                explanationBangla: '',
                code: '',
                input: '',
                output: '',
                subTopic: '',
            });
        } else {
            showMessage('Please fill in all fields.');
        }
    };

    return (
        <div className="mt-20 p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold mb-6 text-center">Manage Concepts</h1>

            {/* Add Concept Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 mb-6">
                <div className="mb-4">
                    <label htmlFor="topic" className="block text-sm font-semibold text-gray-700">Concept Topic</label>
                    <input
                        type="text"
                        id="topic"
                        name="topic"
                        value={concept.topic}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter topic name"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="explanationEnglish" className="block text-sm font-semibold text-gray-700">Explanation (English)</label>
                    <textarea
                        id="explanationEnglish"
                        name="explanationEnglish"
                        value={concept.explanationEnglish}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter explanation in English"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="explanationBangla" className="block text-sm font-semibold text-gray-700">Explanation (Bangla)</label>
                    <textarea
                        id="explanationBangla"
                        name="explanationBangla"
                        value={concept.explanationBangla}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter explanation in Bangla"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="code" className="block text-sm font-semibold text-gray-700">Code</label>
                    <textarea
                        id="code"
                        name="code"
                        value={concept.code}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter code example"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="output" className="block text-sm font-semibold text-gray-700">Output</label>
                    <textarea
                        id="output"
                        name="output"
                        value={concept.output}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter code example"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="subTopic" className="block text-sm font-semibold text-gray-700">subTopic</label>
                    <textarea
                        id="subTopic"
                        name="subTopic"
                        value={concept.subTopic}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter code example"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-3 rounded-md w-full mt-4"
                >
                    Add Concept
                </button>
            </form>
            
            {message && <p className="text-green-500 text-center mb-4">{message}</p>}
            
            <h2 className="text-xl font-semibold mb-4 text-center">Current Concepts</h2>
            <ul className="bg-white shadow-md rounded p-6">
            {conceptList.map((c) => (
                <li key={c.id} className="flex justify-between items-center mb-4">
                    <div>
                        <a href={c.Link} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-medium">{c.topic || 'No Name'}</a>
                        <p className="text-gray-500 text-sm">{`Topic: ${c.subTopic || 'No Topic'}`}</p>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => {
                                setConcept({
                                    topic: c.topic || '',
                                    explanationEnglish: c.explanationEnglish || '',
                                    explanationBangla: c.explanationBangla || '',
                                    code: c.code || '',
                                    input: c.input || '',
                                    output: c.output || '',
                                    subTopic: c.subTopic || ''
                                });
                                setEditId(c.id);
                                setIsEditModalOpen(true);
                            }}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                setDeleteId(c.id);
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
                        <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this concept?</h3>
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
            {/* Modal for Edit */}
            {isEditModalOpen && (
                <div className="mt-20 fixed inset-0 z-20 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Concept</h3>
                    <form onSubmit={handleEdit} className="space-y-6">
                        
                        <div className="space-y-2">
                        <label htmlFor="topic" className="block text-sm font-medium text-gray-600">Concept Topic</label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            value={concept.topic}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter topic name"
                        />
                        </div>

                        <div className="space-y-2">
                        <label htmlFor="explanationEnglish" className="block text-sm font-medium text-gray-600">Explanation (English)</label>
                        <textarea
                            id="explanationEnglish"
                            name="explanationEnglish"
                            value={concept.explanationEnglish}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter explanation in English"
                            rows="4"
                        />
                        </div>

                        <div className="space-y-2">
                        <label htmlFor="explanationBangla" className="block text-sm font-medium text-gray-600">Explanation (Bangla)</label>
                        <textarea
                            id="explanationBangla"
                            name="explanationBangla"
                            value={concept.explanationBangla}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter explanation in Bangla"
                            rows="4"
                        />
                        </div>

                        <div className="space-y-2">
                        <label htmlFor="code" className="block text-sm font-medium text-gray-600">Code</label>
                        <textarea
                            id="code"
                            name="code"
                            value={concept.code}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter code example"
                            rows="4"
                        />
                        </div>

                        <div className="space-y-2">
                        <label htmlFor="output" className="block text-sm font-medium text-gray-600">Output</label>
                        <textarea
                            id="output"
                            name="output"
                            value={concept.output}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter output"
                            rows="4"
                        />
                        </div>

                        <div className="space-y-2">
                        <label htmlFor="subTopic" className="block text-sm font-medium text-gray-600">SubTopic</label>
                        <textarea
                            id="subTopic"
                            name="subTopic"
                            value={concept.subTopic}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            placeholder="Enter subtopic details"
                            rows="4"
                        />
                        </div>

                        <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-md w-full sm:w-auto mt-4 hover:bg-blue-700 transition-all"
                        >
                            Update Concept
                        </button>
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-600 transition-all"
                        >
                            Cancel
                        </button>
                        </div>
                    </form>
                    </div>
                </div>
            )}


        </div>
    );
};

export default SetConcept;
