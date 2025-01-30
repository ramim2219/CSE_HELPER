import React from 'react';

const CompetitveRoadmap = () => {
  return (
    <div className="mt-20 max-w-4xl mx-auto px-4 py-10">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 fade-in">
        Competitive Programming Roadmap
      </h2>

      {/* Sections */}
      <div className="space-y-8">
        {[
          {
            title: "Understanding the Basics",
            color: "border-blue-500",
            points: [
              "Data Types: Integer, Float, String, etc.",
              "Loops & Conditionals: 'for', 'while', 'if-else' statements.",
              "Functions & Recursion: Understanding how functions work, including recursive functions.",
              "Basic Input/Output: Handling user input and output effectively.",
            ],
          },
          {
            title: "Mastering Data Structures",
            color: "border-green-500",
            points: [
              "Arrays and Strings",
              "Linked Lists (Singly, Doubly)",
              "Stacks and Queues",
              "Hashing (HashMaps, HashSets)",
              "Trees (Binary Trees, Binary Search Trees, AVL Trees)",
              "Graphs (Directed, Undirected, Weighted)",
              "Vectors",
              "Sets",
              "Maps",
              "Tuples",
            ],
          },
          {
            title: "Learning Algorithms",
            color: "border-yellow-500",
            points: [
              "Sorting Algorithms: Merge Sort, Quick Sort, Bubble Sort, etc.",
              "Searching Algorithms: Binary Search, Linear Search.",
              "Graph Algorithms: BFS, DFS, Dijkstra's Algorithm.",
              "Dynamic Programming: Breaking problems into subproblems.",
              "Greedy Algorithms: Choosing the best option at each step.",
              "Divide and Conquer: Breaking a problem down into smaller subproblems.",
            ],
          },
          {
            title: "Problem Solving Practice",
            color: "border-red-500",
            points: [
              "Solve problems daily: Start with easier problems and gradually increase the difficulty.",
              "Participate in contests: Engage in regular coding contests on platforms like Codeforces, LeetCode, and AtCoder.",
              "Review and learn from others' solutions: Analyze other solutions to learn new techniques and optimizations.",
              "Time Management: Practice solving problems under time pressure.",
            ],
          },
          {
            title: "Advanced Topics",
            color: "border-purple-500",
            points: [
              "Number Theory: Prime numbers, GCD, LCM, and modular arithmetic.",
              "Advanced Dynamic Programming: Techniques like DP on Trees, DP with Bitmasking, etc.",
              "Graph Theory: Advanced algorithms such as Floyd-Warshall, Bellman-Ford, and more.",
              "String Matching: Knuth-Morris-Pratt, Z-Algorithm, etc.",
              "Game Theory: Solve problems related to game strategy and combinatorial games.",
            ],
          },
        ].map((section, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-lg shadow-lg border-l-4 ${section.color} fade-in`}
            style={{ animationDelay: `${index * 0.2}s` }} // Stagger effect
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {section.title}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              {section.points.map((point, idx) => (
                <li key={idx} className="text-gray-700">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitveRoadmap;
