import React, { useEffect, useState } from 'react';
import { getTopicsWithChapterId } from '../../utils/Topics';
import TopicWiseContents from './TopicWiseContents';

const TopicsBasedId = ({ chapter_id }) => {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState(null);
    const [openTopics, setOpenTopics] = useState({}); // Track open/closed topics

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                console.log(`Fetching topics for chapter_id: ${chapter_id}`);
                const response = await getTopicsWithChapterId(chapter_id);

                console.log("API Response:", response); // Debugging log

                if (Array.isArray(response)) {
                    setTopics(response);
                } else {
                    setError('Invalid response format.');
                }
            } catch (error) {
                console.error('Error fetching topics:', error);
                setError('Failed to fetch topics.');
            }
        };

        if (chapter_id) {
            fetchTopics();
        }
    }, [chapter_id]);

    const toggleTopic = (topicId) => {
        setOpenTopics((prev) => ({
            ...prev,
            [topicId]: !prev[topicId], // Toggle open state
        }));
    };

    return (
        <div className="mt-4">
            {error && <p className="text-red-500 text-center">{error}</p>}
            {topics.length === 0 && !error ? (
                <p className="text-gray-600 text-center">No topics found for this chapter.</p>
            ) : (
                <div className="max-w-3xl mx-auto">
                    {topics.map((topic) => (
                        <div key={topic.id} className="bg-white rounded-lg shadow-md border border-gray-200 mb-3">
                            {/* Topic Header - Clickable */}
                            <button
                                onClick={() => toggleTopic(topic.id)}
                                className="w-full text-left p-4 flex justify-between items-center text-lg font-semibold text-gray-900 focus:outline-none"
                            >
                                {topic.name}
                                <span className={`transform transition-transform ${openTopics[topic.id] ? 'rotate-180' : 'rotate-0'}`}>
                                    ▼
                                </span>
                            </button>

                            {/* Topic Explanation (Dropdown Content) */}
                            {openTopics[topic.id] && (
                                <div className="p-4 bg-gray-50 border-t border-gray-200">
                                    <p className="text-gray-700 leading-relaxed">{topic.explanation}</p>
                                    <TopicWiseContents topic_id={topic.id}/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopicsBasedId;
