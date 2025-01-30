import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/problems';

// Fetch all problems
export const getAllProblems = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

// Add a new problem
export const addProblem = async (problem) => {
  const response = await axios.post(apiUrl, {
    Name: problem.Name,
    Link: problem.Link,
    Type: problem.Type,
    TopicName: problem.TopicName,
    Explanation: problem.Explanation,
    Code: problem.Code,
    Video_link: problem.Video_link,
  });
  return response.data;
};

// Update a problem
export const updateProblem = async (id, updatedProblem) => {
  const response = await axios.put(`${apiUrl}/${id}`, {
    Name: updatedProblem.Name,
    Link: updatedProblem.Link,
    Type: updatedProblem.Type,
    TopicName: updatedProblem.TopicName,
    Explanation: updatedProblem.Explanation,
    Code: updatedProblem.Code,
    Video_link: updatedProblem.Video_link,
  });
  return response.data;
};

// Delete a problem
export const deleteProblem = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};
