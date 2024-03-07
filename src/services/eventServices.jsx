import API from "../config/axiosConfig";

export const get = (id) => {
  id = id || "";
  return API.get(`events/${id}`);
};

export const add = (body) => {
  return API.post(`events`, body);
};

export const editEvent = async (id, event) => {
  return await API.put(`events/${id}`, event);
};

export const deleteEvent = async (id) => {
  return await API.delete(`events/${id}`);
};
