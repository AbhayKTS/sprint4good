import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 20000,
});

export const generateIdeas = async (payload) => {
  const { data } = await api.post('/generate-ideas', payload);
  return data;
};

export const generatePlan = async (payload) => {
  const { data } = await api.post('/generate-plan', payload);
  return data;
};

export const saveIdea = async (payload) => {
  const { data } = await api.post('/save-idea', payload);
  return data;
};

export const sendFeedback = async (payload) => {
  const { data } = await api.post('/feedback', payload);
  return data;
};

export default api;
