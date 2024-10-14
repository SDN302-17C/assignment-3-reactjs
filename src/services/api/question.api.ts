import axios from "axios";
import IQuestion from "../../models/Question";
import { API_BASE_URL } from "../config/config.server";

export const getQuestions = async () => {
  const response = await axios.get(`${API_BASE_URL}/questions`);
  return response.data;
};

export const getQuestionById = async (questionID: string) => {
  const response = await axios.get(`${API_BASE_URL}/questions/${questionID}`);
  return response.data;
};

export const postQuestion = async (question: IQuestion, token: string | null) => {
  const response = await axios.post(`${API_BASE_URL}/questions`, question, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postQuestionToQuiz = async (
  questionID: string,
  quizID: string,
  token: string
) => {
  const response = await axios.post(
    `${API_BASE_URL}/questions/${questionID}/${quizID}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const putQuestion = async (
  questionID: string,
  question: IQuestion,
  token: string
) => {
  const response = await axios.put(
    `${API_BASE_URL}/questions/${questionID}`,
    question,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteQuestion = async (questionID: string, token: string) => {
  const response = await axios.delete(`${API_BASE_URL}/questions/${questionID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};