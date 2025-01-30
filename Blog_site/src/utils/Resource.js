import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/resources';

// Fetch all resources
export const getAllResources = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

// Add a new resource
export const addResource = async (resource) => {
  const response = await axios.post(apiUrl, {
    title: resource.title,
    link: resource.link,
    topic: resource.topic,
  });
  return response.data;
};

// Update a resource
export const updateResource = async (id, updatedResource) => {
  const response = await axios.put(`${apiUrl}/${id}`, {
    title: updatedResource.title,
    link: updatedResource.link,
    topic: updatedResource.topic,
  });
  return response.data;
};

// Delete a resource
export const deleteResource = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};
