import React from 'react';
import Problem from '../../components/Problem';

const TopicList = () => {
    return (
        <div className="mt-20"> {/* Add sufficient margin-top to clear the navbar */}
            {/* Beginner Problems Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Beginner Problems</h2>
                <Problem TopicName="Data type - Conditions" />
                <Problem TopicName="Loops" />
                <Problem TopicName="Arrays" />
                <Problem TopicName="String" />
                <Problem TopicName="Functions" />
                <Problem TopicName="Math" />
                <Problem TopicName="Recursion" />
                <Problem TopicName="General Easy" />
            </div>

            {/* Advanced Problems Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Advanced Problems</h2>
                <Problem TopicName="General Medium" />
                <Problem TopicName="Binary Search" />
                <Problem TopicName="Prefix Sum" />
            </div>

            {/* Expert Problems Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Expert Problems</h2>
                <Problem TopicName="General Hard" />
            </div>
        </div>
    );
};

export default TopicList;
