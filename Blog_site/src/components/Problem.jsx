import React, { useState, useEffect } from 'react';
import { getAllProblems } from '../utils/Problems'; // Adjust path as per your project structure
import ProblemList from './ProblemList';

const Problem = ({ TopicName }) => {
    const [problems, setProblems] = useState([]);
    const [groupedProblems, setGroupedProblems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch problems when component mounts or TopicName changes
    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);
                const allProblems = await getAllProblems();

                // Ensure API returns a valid array
                if (!Array.isArray(allProblems)) {
                    throw new Error('Invalid response format: Expected an array of problems');
                }

                // Filter problems by the provided TopicName
                const filteredProblems = allProblems.filter(
                    (problem) => problem.TopicName === TopicName
                );

                setProblems(filteredProblems);
            } catch (err) {
                console.error('Error fetching problems:', err);
                setError('Failed to load problems. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, [TopicName]); // Refetch problems if TopicName changes

    // Group problems by topic (e.g., Arrays, Loops, etc.)
    useEffect(() => {
        const groupByTopic = () => {
            const grouped = problems.reduce((acc, problem) => {
                if (!acc[problem.TopicName]) {
                    acc[problem.TopicName] = [];
                }
                acc[problem.TopicName].push(problem);
                return acc;
            }, {});

            setGroupedProblems(grouped);
        };

        groupByTopic();
    }, [problems]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : Object.keys(groupedProblems).length === 0 ? (
                <p>No problems available under "{TopicName}".</p>
            ) : (
                <div>
                    {Object.keys(groupedProblems).map((topic) => (
                        <ProblemList key={topic} topic={topic} problems={groupedProblems[topic]} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Problem;
