import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/contents';

// Fetch all contents
export const getAllContents = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching contents:', error);
    throw new Error('Failed to fetch contents');
  }
};

// Edit content by ID
export const updateContent = async (id, updatedData, imageFile = null) => {
  const formData = new FormData();
  formData.append('exercise', updatedData.exercise);
  formData.append('solution', updatedData.solution);
  formData.append('topic_id', updatedData.topic_id);
  if (imageFile) {
    formData.append('image', imageFile);
  }

  try {
    const response = await axios.put(`http://localhost:5000/content/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating content:', error);
    throw new Error('Failed to update content');
  }
};

// Delete content by ID
export const deleteContent = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:5000/content/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting content:', error);
    throw new Error('Failed to delete content');
  }
};
