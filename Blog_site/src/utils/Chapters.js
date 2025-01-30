import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/chapters';

// Fetch all chapters
export const getAllChapters = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};

// Fetch chapters by course_id
export const getChaptersByCourseId = async (course_id) => {
  try {
    const response = await axios.get(`${apiUrl}/${course_id}`); // Fetch chapters for a specific course_id
    return response.data;
  } catch (error) {
    console.error('Error fetching chapters for course:', error);
    throw error;
  }
};

// Add a new chapter
export const addChapter = async (chapter) => {
  try {
    const response = await axios.post(apiUrl, {
      course_id: chapter.course_id,
      name: chapter.name,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding chapter:', error);
    throw error;
  }
};

// Update a chapter
export const updateChapter = async (id, updatedChapter) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, {
      course_id: updatedChapter.course_id,
      name: updatedChapter.name,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating chapter:', error);
    throw error;
  }
};

// Delete a chapter
export const deleteChapter = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting chapter:', error);
    throw error;
  }
};
