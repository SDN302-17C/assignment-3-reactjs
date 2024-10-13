import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../config/config.server";
import IQuiz from "../../models/Quiz";
import IQuestion from "../../models/Question";

export const getQuizzes = async () => {
  const response = await axios.get(`${API_BASE_URL}/quizzes`);
  return response.data;
};

export const getQuizById = async (quizID: string) => {
  const response = await axios.get(`${API_BASE_URL}/quizzes/${quizID}`);
  return response.data;
};

export const getQuestionsInQuiz = async (quizID: string, keyword: string) => {
  const response = await axios.get(
    `${API_BASE_URL}/quizzes/${quizID}/populate/${keyword}`
  );
  return response.data;
};

export const postQuiz = async (quiz: IQuiz) => {
  const response = await axios.post(`${API_BASE_URL}/quizzes`, quiz);
  return response.data;
};

export const postQuestionInQuiz = async (
  quizID: string,
  question: IQuestion
) => {
  const response = await axios.post(
    `${API_BASE_URL}/quizzes/${quizID}/question`,
    question
  );
  return response.data;
};

export const postManyQuestionsInQuiz = async (
  quizID: string,
  questions: IQuestion[]
) => {
  const sanitizedQuestions = questions.map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ _id, ...rest }) => rest
  );

  try {
    const response = await axios.post(
      `${API_BASE_URL}/quizzes/${quizID}/questions`,
      sanitizedQuestions
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        console.error("API error:", axiosError.response.data);
        console.error("Status:", axiosError.response.status);
      } else if (axiosError.request) {
        console.error("API error: No response received:", axiosError.request);
      } else {
        console.error("Error setting up request:", axiosError.message);
      }
    } else {
      console.error("Unexpected error:", error);
    }

    throw error;
  }
};

export const putQuiz = async (quizID: string, quiz: IQuiz) => {
  const response = await axios.put(`${API_BASE_URL}/quizzes/${quizID}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizID: string) => {
  const response = await axios.delete(`${API_BASE_URL}/quizzes/${quizID}`);
  return response.data;
};