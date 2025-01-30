import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, LinkIcon } from '@heroicons/react/24/solid';
import { getAllConcepts } from '../utils/Concept';  // Import Concepts service
import { getAllResources } from '../utils/Resource'; // Import Resources service

const AccordionList2 = ({ title, resources_topicName, concepts_subTopic }) => {
  const [showList, setShowList] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [conceptData, setConceptData] = useState([]);
  const [resourceData, setResourceData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});  // New state to track checked items

  const handleToggleList = () => {
    setShowList((prev) => !prev);
  };

  const handleToggleDetails = (item) => {
    setExpandedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleCheckItem = (concept) => {
    setCheckedItems((prev) => ({
      ...prev,
      [concept.topic]: !prev[concept.topic],  // Toggle the checkbox state
    }));
  };

  const fetchConcepts = async () => {
    try {
      const allConcepts = await getAllConcepts();
      const filteredConcepts = allConcepts.filter(
        (concept) => concept.subTopic === concepts_subTopic
      );
      setConceptData(filteredConcepts);
    } catch (error) {
      console.error("Error fetching concepts data:", error);
    }
  };

  const fetchResources = async () => {
    try {
      const allResources = await getAllResources();
      const filteredResources = allResources.filter(
        (resource) => resource.topic === resources_topicName
      );
      setResourceData(filteredResources);
    } catch (error) {
      console.error("Error fetching resources data:", error);
    }
  };

  useEffect(() => {
    fetchConcepts();
    fetchResources();
  }, [concepts_subTopic, resources_topicName]);

  return (
    <div className="container mx-auto p-0">
      <div className="relative bg-white shadow-md rounded-lg border border-gray-300">
        {/* Accordion Header */}
        <button
          onClick={handleToggleList}
          className="w-full bg-blue-600 text-white p-4 rounded-t-lg hover:bg-blue-700 transition duration-200 flex items-center justify-between"
        >
          <span className="text-lg font-bold">{title}</span>
          <span className={`transform transition-transform ${showList ? 'rotate-180' : ''}`}>
            {showList ? (
              <ChevronUpIcon className="w-6 h-6 text-white" />
            ) : (
              <ChevronDownIcon className="w-6 h-6 text-white" />
            )}
          </span>
        </button>

        {/* Accordion Body */}
        {showList && (
          <div className="bg-gray-50 p-4 rounded-b-lg">
            {/* Concepts List */}
            <div className="divide-y divide-gray-200">
              {conceptData.map((concept, index) => (
                <div key={index} className="py-3">
                  <div
                    className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => handleToggleDetails(concept.topic)}
                  >
                    <div className="flex items-center space-x-2">
                      {/* Checkbox for each concept */}
                      <input
                        type="checkbox"
                        checked={checkedItems[concept.topic] || false}
                        onChange={() => handleCheckItem(concept)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="text-gray-800 font-medium">{concept.topic}</span>
                    </div>
                    <span
                      className={`transform transition-transform ${
                        expandedItems.includes(concept.topic) ? 'rotate-180' : ''
                      }`}
                    >
                      {expandedItems.includes(concept.topic) ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                      )}
                    </span>
                  </div>

                  {/* Expanded Details */}
                  {expandedItems.includes(concept.topic) && (
                    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                      <p className="text-gray-700 mb-2">
                        <strong>Explanation (English):</strong> {concept.explanationEnglish}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Explanation (Bangla):</strong> {concept.explanationBangla}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <strong>Code:</strong>
                        <pre className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                          <code className="text-sm text-gray-800">{concept.code}</code>
                        </pre>
                      </p>

                      <p className="text-gray-700">
                        <strong>Input:</strong> {concept.input}
                      </p>
                      <p className="text-gray-700">
                        <strong>Output:</strong> {concept.output}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Resources Section */}
            {resourceData.length > 0 && (
              <div className="pt-4 border-t border-gray-300">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Resources</h3>
                <ul className="space-y-2">
                  {resourceData.map((resource, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <LinkIcon className="w-5 h-5 text-blue-500" />
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline hover:text-blue-600 transition duration-200"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionList2;
