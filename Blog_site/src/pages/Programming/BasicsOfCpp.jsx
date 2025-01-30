import React from 'react';
import AccordionList from '../../components/AccordionList';

const BasicsOfCpp = () => {
    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">C++ Basics</h1>

            {/* Basic Concepts Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Basic Concepts</h2>
                <AccordionList
                    title="Datatype Concepts"
                    resources_topicName="Datatype"
                    concepts_subTopic="Datatype" 
                />
                <AccordionList
                    title="Condition Concepts"
                    resources_topicName="Condition"
                    concepts_subTopic="Condition" 
                />
                <AccordionList
                    title="Operator Concepts"
                    resources_topicName="Operator"
                    concepts_subTopic="Operator" 
                />
                <AccordionList
                    title="Loops Concepts"
                    resources_topicName="Loops"
                    concepts_subTopic="Loops" 
                />
                <AccordionList
                    title="Arrays Concepts"
                    resources_topicName="Arrays"
                    concepts_subTopic="Arrays" 
                />
                <AccordionList
                    title="String Concepts"
                    resources_topicName="String"
                    concepts_subTopic="String" 
                />
            </section>

            {/* STL Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">STL (Standard Template Library)</h2>
                <AccordionList
                    title="Vector Concepts"
                    resources_topicName="Vector"
                    concepts_subTopic="Vector" 
                />
                <AccordionList
                    title="Deque Concepts"
                    resources_topicName="Deque"
                    concepts_subTopic="Deque" 
                />
                <AccordionList
                    title="Heap Concepts"
                    resources_topicName="Heap"
                    concepts_subTopic="Heap" 
                />
                <AccordionList
                    title="Map Concepts"
                    resources_topicName="Map"
                    concepts_subTopic="Map" 
                />
                <AccordionList
                    title="Pair Concepts"
                    resources_topicName="Pair"
                    concepts_subTopic="Pair" 
                />
                <AccordionList
                    title="Priority Queue Concepts"
                    resources_topicName="Priority Queue"
                    concepts_subTopic="Priority Queue" 
                />
                <AccordionList
                    title="Queue Concepts"
                    resources_topicName="Queue"
                    concepts_subTopic="Queue" 
                />
                <AccordionList
                    title="Set Concepts"
                    resources_topicName="Set"
                    concepts_subTopic="Set" 
                />
                <AccordionList
                    title="Stack Concepts"
                    resources_topicName="Stack"
                    concepts_subTopic="Stack" 
                />
                <AccordionList
                    title="Tuple Concepts"
                    resources_topicName="Tuple"
                    concepts_subTopic="Tuple" 
                />
            </section>
        </div>
    );
};

export default BasicsOfCpp;
