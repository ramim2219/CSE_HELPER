export const getPost = async (id) => {
  const posts = [
    { id: 1, title: 'How to Start a Blog', content: 'Learn how to start your own blog from scratch.' },
    { id: 2, title: '10 Tips for Web Development', content: 'These tips will help you become a better web developer.' },
    { 
      id: 3, 
      title: 'Complete Competitive Programming Guideline', 
      content: `
        ### Roadmap to Mastering Competitive Programming

        Competitive Programming (CP) is a fascinating discipline that helps you develop problem-solving and algorithmic skills. It is not just about solving problems quickly but also about learning how to think critically and improve the efficiency of your solutions. Here's a structured roadmap to help you become proficient in CP:

        #### 1. **Understanding the Basics**
        Before diving into problem-solving, it's crucial to have a strong foundation in programming. Ensure you're comfortable with at least one programming language (C++, Java, Python) and learn the following:

        - **Data Types**: Integer, Float, String, etc.
        - **Loops & Conditionals**: 'for', 'while', 'if-else' statements.
        - **Functions & Recursion**: Understanding how functions work, including recursive functions.
        - **Basic Input/Output**: Handling user input and output effectively.

        #### 2. **Mastering Data Structures**
        Data structures are the backbone of competitive programming. Understanding how to use them efficiently is key to solving problems quickly. Focus on the following:

        - **Arrays** and **Strings**
        - **Linked Lists** (Singly, Doubly)
        - **Stacks** and **Queues**
        - **Hashing** (HashMaps, HashSets)
        - **Trees** (Binary Trees, Binary Search Trees, AVL Trees)
        - **Graphs** (Directed, Undirected, Weighted)

        #### 3. **Learning Algorithms**
        Once you're comfortable with basic data structures, move on to learning algorithms that help you solve complex problems. Key algorithms to focus on include:

        - **Sorting Algorithms**: Merge Sort, Quick Sort, Bubble Sort, etc.
        - **Searching Algorithms**: Binary Search, Linear Search.
        - **Graph Algorithms**: BFS, DFS, Dijkstra's Algorithm.
        - **Dynamic Programming**: Understanding the importance of breaking problems into subproblems.
        - **Greedy Algorithms**: Always choosing the best available option at each step.
        - **Divide and Conquer**: Breaking a problem down into smaller subproblems.

        #### 4. **Problem Solving Practice**
        Practice is key to excelling in CP. Here are some strategies to improve your problem-solving skills:

        - **Solve problems daily**: Start with easier problems and gradually increase the difficulty.
        - **Participate in contests**: Engage in regular coding contests on platforms like Codeforces, LeetCode, and AtCoder.
        - **Review and learn from others' solutions**: After solving a problem, analyze other solutions to learn new techniques and optimizations.
        - **Time Management**: During contests, practice solving problems under time pressure.

        #### 5. **Advanced Topics**
        As you gain more experience, you can explore advanced topics that will give you an edge in competitive programming:

        - **Number Theory**: Prime numbers, GCD, LCM, and modular arithmetic.
        - **Advanced Dynamic Programming**: Learn advanced techniques like DP on Trees, DP with Bitmasking, etc.
        - **Graph Theory**: Advanced algorithms such as Floyd-Warshall, Bellman-Ford, and more.
        - **String Matching**: Knuth-Morris-Pratt, Z-Algorithm, etc.
        - **Game Theory**: Solve problems related to game strategy and combinatorial games.

        #### 6. **Resources for Learning**
        - **Books**: "Introduction to Algorithms" by Cormen, Leiserson, Rivest, and Stein.
        - **Online Platforms**: Codeforces, LeetCode, AtCoder, HackerRank, Codechef.
        - **Videos**: Follow tutorials on YouTube and Coursera for a visual understanding.
        - **Communities**: Join coding communities like Stack Overflow, Reddit, and competitive programming forums for discussions and advice.

        #### 7. **Mindset for Success**
        - **Perseverance**: CP requires time and effort. Don't be discouraged by initial failures. Keep practicing and you'll improve.
        - **Analytical Thinking**: Focus on understanding the problem deeply before jumping into coding.
        - **Learn from Mistakes**: Mistakes are a part of learning. Analyze errors and work on improving your approach.

        With consistent effort and a structured approach, you can master competitive programming and achieve success in coding competitions. Keep challenging yourself, and remember, the journey is just as rewarding as the destination.

        **Happy Coding!**
      `
    },
  ];
  return posts.find(post => post.id === parseInt(id));
};
