import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/concepts';

// Fetch all concepts
export const getAllConcepts = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

// Add a new concept
export const addConcept = async (concept) => {
  const response = await axios.post(apiUrl, {
    topic: concept.topic,
    explanationEnglish: concept.explanationEnglish,
    explanationBangla: concept.explanationBangla,
    code: concept.code,
    input: concept.input,
    output: concept.output,
    subTopic: concept.subTopic,
  });
  return response.data;
};

// Update a concept
export const updateConcept = async (id, updatedConcept) => {
  const response = await axios.put(`${apiUrl}/${id}`, {
    topic: updatedConcept.topic,
    explanationEnglish: updatedConcept.explanationEnglish,
    explanationBangla: updatedConcept.explanationBangla,
    code: updatedConcept.code,
    input: updatedConcept.input,
    output: updatedConcept.output,
    subTopic: updatedConcept.subTopic,
  });
  return response.data;
};

// Delete a concept
export const deleteConcept = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};
