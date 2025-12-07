import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Service untuk sensor data
export const sensorService = {
  getCurrentData: async () => {
    const response = await axios.get(`${API_BASE_URL}/sensors/current`);
    return response.data.data;
  },

  getLuxHistory: async () => {
    const response = await axios.get(`${API_BASE_URL}/sensors/history/lux`);
    return response.data.data;
  },

  getRpmHistory: async () => {
    const response = await axios.get(`${API_BASE_URL}/sensors/history/rpm`);
    return response.data.data;
  },
};

// Service untuk plant info
export const plantService = {
  getPlantInfo: async () => {
    const response = await axios.get(`${API_BASE_URL}/plant-info`);
    return response.data.data;
  },
};
