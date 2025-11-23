import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Answer, AnswersPayload, SubmitQuestionnaireApi } from "./api";
import { Response } from "@/interface/Error/CustomError";
import { toast } from "sonner";

export interface SetResultDataCallback {
  (data: {
    marksObtained: number;
    totalMarks: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    notAttendedQuestions: number;
  }): void;
}
interface SubmitResponse {
  success: boolean;
  exam_history_id: number;
  score: number;
  correct: number;
  wrong: number;
  not_attended: number;
  submitted_at: string;
  details: Detail[];
}

interface Detail {
  question_id: number;
  selected_option_id: null | number;
  correct_option_id: number;
  is_correct: boolean | null;
  status: string;
}
export const UseSubmitOptions = (setResultData?: SetResultDataCallback) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: {
      answers: Answer[];
      totalQuestions: number;
      totalMarks: number;
    }) => {
      return await SubmitQuestionnaireApi(data.answers);
    },
    onSuccess: (data: SubmitResponse, variables) => {
      if (data.success) {
        // Store result data in context
        if (setResultData) {
          setResultData({
            marksObtained: data.score,
            totalMarks: variables.totalMarks,
            totalQuestions: variables.totalQuestions,
            correctAnswers: data.correct,
            incorrectAnswers: data.wrong,
            notAttendedQuestions: data.not_attended,
          });
        }
        toast.success("Test submitted successfully");
        router.push("/questionnaire/result");
      } else {
        toast.error("Error occured");
      }
    },
    onError: (error: Response) => {
      const errorData = error.message;
      toast.error(errorData);
    },
  });
};
