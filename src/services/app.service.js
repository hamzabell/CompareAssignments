import axios from "axios";

const API_URL = "https://ba82ecec-f2a5-4cab-a4a7-4f3b8a744b92.mock.pstmn.io";

export default {
  compareTexts: async (studentA, studentB) => {
    try {
      const result = await axios.post(`${API_URL}//compare`, {
        studentA,
        studentB,
      });
      return result.data;
    } catch (error) {
      return error;
    }
  },
  rerun: async (id) => {
    try {
      const result = await axios.post(`${API_URL}//re-run/${id}`, {});
      return result.data;
    } catch (error) {
      return error;
    }
  },
  history: async () => {
    try {
      const result = await axios.get(`${API_URL}//history`);
      return result.data;
    } catch (err) {
      return err;
    }
  },
};
