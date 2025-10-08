import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/students";

export default {
  getAll() {
    return axios.get(API_URL);
  },
  create(data) {
    return axios.post(API_URL, data);
  },
  update(id, data) {
    return axios.put(`${API_URL}/${id}`, data);
  },
  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  },
};
