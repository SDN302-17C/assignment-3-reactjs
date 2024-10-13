import axios from "axios";
import { API_BASE_URL } from "../config/config.server";
import IUser from "../../models/User";

export const register = async (userData: IUser) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, ...filteredValues } = userData;
  const response = await axios.post(
    `${API_BASE_URL}/auth/register`,
    filteredValues
  );
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  const data = await response.data;
  return data.token;
};

