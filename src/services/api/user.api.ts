import axios from "axios";
import { API_BASE_URL } from "../config/config.server";
import IUser from "../../models/User";

export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const getUserById = async (userID: string) => {
  const response = await axios.get(`${API_BASE_URL}/users/${userID}`);
  return response.data;
};

export const postUser = async (user: IUser) => {
  const response = await axios.post(`${API_BASE_URL}/users`, user);
  return response.data;
};

export const putUser = async (user: IUser) => {
  const response = await axios.put(`${API_BASE_URL}/users`, user);
  return response.data;
};

export const deleteUser = async (userID: string) => {
  const response = await axios.delete(`${API_BASE_URL}/users/${userID}`);
  return response.data;
};