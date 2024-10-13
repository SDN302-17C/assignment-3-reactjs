import axios from "axios";
import { API_BASE_URL } from "../config/config.server";
import IQuestion from "../../models/Question";

export const getQuestions = async () => {
  const response = await axios.get(`${API_BASE_URL}/questions`);
  return response.data;
};

export const getQuestionById = async (questionID: string) => {
  const response = await axios.get(`${API_BASE_URL}/questions/${questionID}`);
  return response.data;
};

export const postQuestion = async (question: IQuestion) => {
  const response = await axios.post(`${API_BASE_URL}/questions`, question);
  return response.data;
};

export const postQuestionToQuiz = async (
  questionID: string,
  quizID: string
) => {
  const response = await axios.post(
    `${API_BASE_URL}/questions/${questionID}/${quizID}`
  );
  return response.data;
};

export const putQuestion = async (questionID: string, question: IQuestion) => {
  const response = await axios.put(
    `${API_BASE_URL}/questions/${questionID}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionID: string) => {
  const response = await axios.delete(
    `${API_BASE_URL}/questions/${questionID}`
  );
  return response.data;
};