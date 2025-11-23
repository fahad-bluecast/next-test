import { ListQuestionnaireResponse } from "@/interface/questionnaire/ListQuestionnaire.type";
import { axiosInstance } from "@/service/axios";
import { AxiosError } from "axios";
export interface AnswersPayload {
  answers: Answer[];
}
export interface Answer {
  question_id: number;
  selected_option_id: number | null;
}
export const ListQuestionnaireApi = async () => {
  try {
    const response = await axiosInstance.get<ListQuestionnaireResponse>(
      `question/list`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error;
    }
    throw error;
  }
};

export const SubmitQuestionnaireApi = async (data: Answer[]) => {
  try {
    const formData = new FormData();
    formData.append("answers", JSON.stringify(data));
    const response = await axiosInstance.post(`answers/submit`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error;
    }
    throw error;
  }
};
