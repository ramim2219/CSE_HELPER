import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/topics';

// Fetch all topics
export const getAllTopics = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
};
export const getTopicsWithChapterId = async (chapter_id) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/topics/${chapter_id}`);
    console.log("Fetched Topics:", response.data); // Debugging

    // Ensure response is an array
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error("Invalid response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching topics:', error);
    return []; // Return empty array to prevent UI breaking
  }
};

// Add a new topic
export const addTopic = async (topic) => {
  try {
    const response = await axios.post(apiUrl, {
      chapter_id: topic.chapter_id,
      name: topic.name,
      explanation: topic.explanation,  // Add the explanation field
    });
    return response.data;
  } catch (error) {
    console.error('Error adding topic:', error);
    throw error;
  }
};

// Update a topic
export const updateTopic = async (id, updatedTopic) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, {
      chapter_id: updatedTopic.chapter_id,
      name: updatedTopic.name,
      explanation: updatedTopic.explanation,  // Add the explanation field
    });
    return response.data;
  } catch (error) {
    console.error('Error updating topic:', error);
    throw error;
  }
};

// Delete a topic
export const deleteTopic = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting topic:', error);
    throw error;
  }
};
