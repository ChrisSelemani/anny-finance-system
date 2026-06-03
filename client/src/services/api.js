// // const API_URL = 'http://localhost:5000/api';

// // export const api = {
// //   // ... other methods
  
// //   deleteAgreement: async (id) => {
// //     const response = await fetch(`${API_URL}/agreements/${id}`, {
// //       method: 'DELETE',
// //       credentials: 'include', // Important for cookie auth
// //     });
// //     return response.json();
// //   },
// // };

// const API_URL = 'http://localhost:5000/api';

// export const api = {
//   // Test connection
//   test: async () => {
//     try {
//       const response = await fetch(`${API_URL}/test`);
//       return await response.json();
//     } catch (error) {
//       console.error('Test error:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // Get all agreements
//   getAgreements: async () => {
//     try {
//       const response = await fetch(`${API_URL}/agreements`);
//       const data = await response.json();
//       console.log('getAgreements response:', data);
//       return data;
//     } catch (error) {
//       console.error('getAgreements error:', error);
//       return { success: false, error: error.message, data: [] };
//     }
//   },

//   // Get single agreement
//   getAgreement: async (id) => {
//     try {
//       const response = await fetch(`${API_URL}/agreements/${id}`);
//       return await response.json();
//     } catch (error) {
//       console.error('getAgreement error:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // Create agreement
//   createAgreement: async (agreementData) => {
//     try {
//       console.log('Creating agreement with data:', agreementData);
//       const response = await fetch(`${API_URL}/agreements`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(agreementData),
//       });
//       const data = await response.json();
//       console.log('createAgreement response:', data);
//       return data;
//     } catch (error) {
//       console.error('createAgreement error:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // Update agreement
//   updateAgreement: async (id, agreementData) => {
//     try {
//       const response = await fetch(`${API_URL}/agreements/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(agreementData),
//       });
//       return await response.json();
//     } catch (error) {
//       console.error('updateAgreement error:', error);
//       return { success: false, error: error.message };
//     }
//   },

//   // Delete agreement
//   deleteAgreement: async (id) => {
//     try {
//       const response = await fetch(`${API_URL}/agreements/${id}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });
//       return await response.json();
//     } catch (error) {
//       console.error('deleteAgreement error:', error);
//       return { success: false, error: error.message };
//     }
//   },
// };



const API_URL = 'http://localhost:5000/api';

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