"use client";
import ResultPage from "@/components/questionnaire/result/ResultQuestionnaire";
import { useQuestionnaireResult } from "@/contexts/QuestionnaireResultContext";

const page = () => {
  const {
    marksObtained,
    totalMarks,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    notAttendedQuestions,
  } = useQuestionnaireResult();

  return (
    <div>
      <ResultPage
        marksObtained={marksObtained}
        totalMarks={totalMarks}
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        notAttendedQuestions={notAttendedQuestions}
      />
    </div>
  );
};

export default page;
