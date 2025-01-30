import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const ProblemList = ({ topic, problems }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null); // Track which problem's dropdown is open

    const toggleDropdown = () => {
        setExpanded((prevState) => !prevState);
    };

    // Handle dropdown toggle for individual problem
    const toggleProblemDropdown = (problemId) => {
        setSelectedProblem((prev) => (prev === problemId ? null : problemId));
    };

    // Function to copy code to clipboard
    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            alert('Code copied to clipboard!');
        }).catch((err) => {
            console.error('Error copying text: ', err);
        });
    };

    return (
        <div className="mb-0.5">
            {/* Button to toggle the dropdown for topics */}
            <button
                onClick={toggleDropdown}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 w-full text-left flex items-center justify-between shadow-md"
            >
                <span className="text-xl font-semibold tracking-tight">{topic}</span>
                <span className={`transform transition duration-300 ${expanded ? 'rotate-180' : ''}`}>
                    {expanded ? (
                        <ChevronUpIcon className="w-5 h-5 text-white" />
                    ) : (
                        <ChevronDownIcon className="w-5 h-5 text-white" />
                    )}
                </span>
            </button>

            {/* List of problems */}
            {expanded && (
                <ul className="bg-white shadow-xl rounded-lg border border-gray-200 mt-4 p-4 space-y-4 max-h-96 overflow-y-auto">
                    {problems.map((problem, index) => (
                        <li key={problem.id} className="rounded-lg border border-gray-200 shadow-sm bg-gray-50 hover:bg-gray-100 transition duration-300">
                            <div className="flex items-center justify-between p-3">
                                <span className="mr-3 text-blue-600 font-semibold text-lg">{index + 1}.</span>
                                <a
                                    href={problem.Link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-700 transition duration-200 text-lg font-medium"
                                >
                                    {problem.Name}
                                </a>

                                {/* Toggle button for Show Solution / Hide Solution */}
                                <button
                                    onClick={() => toggleProblemDropdown(problem.id)}
                                    className="ml-4 text-blue-500 hover:text-blue-700 transition duration-200 font-medium"
                                >
                                    {selectedProblem === problem.id ? 'Hide Solution' : 'Show Solution'}
                                </button>
                            </div>

                            {/* Problem-specific dropdown */}
                            {selectedProblem === problem.id && (
                                <div className="p-4 border-t border-gray-300 bg-gray-100 rounded-b-lg">
                                    <ul className="space-y-4">
                                        {/* Explanation */}
                                        <li>
                                            <h4 className="text-lg font-medium text-gray-700">Explanation</h4>
                                            <p className="text-gray-600">{problem.Explanation || 'No explanation available.'}</p>
                                        </li>

                                        {/* Code */}
                                        <li>
                                            <h4 className="text-lg font-medium text-gray-700">Code</h4>
                                            <div className="relative">
                                                <pre className="bg-gray-900 text-white p-3 rounded-md">{problem.Code || 'No code available.'}</pre>
                                                <button
                                                    onClick={() => copyToClipboard(problem.Code)}
                                                    className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </li>

                                        {/* Play button (links to Video_Link) */}
                                        <li>
                                            <h4 className="text-lg font-medium text-gray-700">Video</h4>
                                            {problem.Video_link ? (
                                                <button
                                                    onClick={() => window.open(problem.Video_link, '_blank')}
                                                    className="bg-blue-500 text-white p-2 text-sm rounded-lg hover:bg-blue-600 transition duration-200 w-full text-center"
                                                >
                                                    Play Video
                                                </button>
                                            ) : (
                                                <p className="text-gray-600">No video available.</p>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProblemList;
