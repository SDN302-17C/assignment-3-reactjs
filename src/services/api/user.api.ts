import axios from "axios";
import { API_BASE_URL } from "../config/config.server";
import IUser from "../../models/User";

export const getUsers = async (token: string | null) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (userID: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const postUser = async (user: IUser, token: string | null) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting user:", error);
    throw error;
  }
};

export const putUser = async (user: Partial<IUser>, token: string | null) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${user._id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userID: string, token: string | null) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};