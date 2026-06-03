const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  test: async () => {
    try {
      const response = await fetch(`${API_URL}/test`);
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getAgreements: async () => {
    try {
      const response = await fetch(`${API_URL}/agreements`);
      const data = await response.json();
      return data;
    } catch (error) {
      return { success: false, error: error.message, data: [] };
    }
  },

  getAgreement: async (id) => {
    try {
      const response = await fetch(`${API_URL}/agreements/${id}`);
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  createAgreement: async (agreementData) => {
    try {
      const response = await fetch(`${API_URL}/agreements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agreementData),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateAgreement: async (id, agreementData) => {
    try {
      const response = await fetch(`${API_URL}/agreements/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agreementData),
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteAgreement: async (id) => {
    try {
      const response = await fetch(`${API_URL}/agreements/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      return await response.json();
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};