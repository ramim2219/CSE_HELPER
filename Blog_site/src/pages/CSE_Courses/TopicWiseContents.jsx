import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopicWiseContents = ({ topic_id }) => {
    const [contents, setContents] = useState([]);
    const [error, setError] = useState(null);
    const [showSolution, setShowSolution] = useState({});

    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/contents/${topic_id}`);
                setContents(response.data);
            } catch (err) {
                console.error('Error fetching contents:', err);
                setError('Failed to load contents.');
            }
        };

        if (topic_id) {
            fetchContents();
        }
    }, [topic_id]);

    const toggleSolution = (id) => {
        setShowSolution((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {contents.length === 0 && !error ? (
                <p className="text-gray-600 text-center">No contents found for this topic.</p>
            ) : (
                <ul className="space-y-4">
                    {contents.map((content) => (
                        <li key={content.id} className="border p-4 rounded-lg shadow-sm">
                            {/* Exercise */}
                            <p className="font-semibold text-lg">{content.exercise}</p>

                            {/* Show Solution Button */}
                            <button
                                onClick={() => toggleSolution(content.id)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                {showSolution[content.id] ? "Hide Solution" : "Show Solution"}
                            </button>

                            {/* Solution (Toggle) */}
                            {showSolution[content.id] && (
                                <div className="mt-3 bg-gray-100 p-3 rounded-lg">
                                    <p className="text-gray-700">{content.solution}</p>

                                    {/* Full Image in Solution */}
                                    {content.image && (
                                        <img
                                            src={`/images/${content.image}`}
                                            alt="Solution"
                                            className="w-full max-w-full h-auto mt-3" // Allow the image to display at full resolution
                                        />
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TopicWiseContents;
