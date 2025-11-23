import { ListQuestionnaireApi } from "@/api/questionnaire/api";
import { UseSubmitOptions } from "@/api/questionnaire/hook";
import { Button } from "@/components/ui/button";
import { useQuestionnaireResult } from "@/contexts/QuestionnaireResultContext";
import { ListQuestionnaireResponse } from "@/interface/questionnaire/ListQuestionnaire.type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import QuestionDisplay from "./QuestionDisplay";
import QuestionNavigation, { UserAnswer } from "./QuestionNavigation";
import SubmitTestModal from "./SubmitTest";

// Main MCQ Test Component
const MCQTest = () => {
  const [data, setData] = useState<ListQuestionnaireResponse | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Map<number, UserAnswer>>(
    new Map()
  );
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { setResultData } = useQuestionnaireResult();
  const { mutate: submitTest, isPending: isSubmitting } =
    UseSubmitOptions(setResultData);

  const { data: QuestionnaireData, isLoading } = useQuery({
    queryKey: ["questionnaireList"],
    queryFn: () => ListQuestionnaireApi(),
  });

  useEffect(() => {
    if (QuestionnaireData) {
      setData(QuestionnaireData);
      setTimeLeft(QuestionnaireData.total_time * 60);
    }
  }, [QuestionnaireData]);

  // Timer effect
  useEffect(() => {
    if (data && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [data, timeLeft]);

  const currentQuestion =
    data?.questions &&
    data.questions.length > 0 &&
    currentQuestionIndex >= 0 &&
    currentQuestionIndex < data.questions.length
      ? data.questions[currentQuestionIndex]
      : undefined;
  const currentQuestionNumber = currentQuestion?.number || 1;
  const selectedAnswer = userAnswers.get(currentQuestionNumber);

  // Mark question as visited when it becomes current
  useEffect(() => {
    if (currentQuestionNumber) {
      setUserAnswers((prev) => {
        const newAnswers = new Map(prev);
        const current = newAnswers.get(currentQuestionNumber);
        if (!current || !current.visited) {
          newAnswers.set(currentQuestionNumber, {
            questionId: currentQuestionNumber,
            selectedOptionId: current?.selectedOptionId || null,
            markedForReview: current?.markedForReview || false,
            visited: true,
          });
        }
        return newAnswers;
      });
    }
  }, [currentQuestionNumber]);

  const handleOptionChange = (optionId: number) => {
    setUserAnswers((prev) => {
      const newAnswers = new Map(prev);
      const current = newAnswers.get(currentQuestionNumber);
      newAnswers.set(currentQuestionNumber, {
        questionId: currentQuestionNumber,
        selectedOptionId: optionId,
        markedForReview: current?.markedForReview || false,
        visited: true,
      });
      return newAnswers;
    });
  };

  const handleMarkForReview = () => {
    setUserAnswers((prev) => {
      const newAnswers = new Map(prev);
      const current = newAnswers.get(currentQuestionNumber);
      newAnswers.set(currentQuestionNumber, {
        questionId: currentQuestionNumber,
        selectedOptionId: current?.selectedOptionId || null,
        markedForReview: !current?.markedForReview,
        visited: true,
      });
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < (data?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionSelect = (questionNum: number) => {
    const index = data?.questions.findIndex((q) => q.number === questionNum);
    if (index !== undefined && index !== -1) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleSubmitClick = () => {
    setIsSubmitModalOpen(true);
  };

  const handleSubmitTest = () => {
    if (!data) return;

    // Format answers according to API payload - send all questions
    const answers = data.questions.map((question) => {
      const answer = userAnswers.get(question.number);
      return {
        question_id: question.question_id,
        selected_option_id: answer?.selectedOptionId || null,
      };
    });

    submitTest(
      {
        answers,
        totalQuestions: data.questions_count,
        totalMarks: data.total_marks,
      },
      {
        onSuccess: () => {
          setIsSubmitModalOpen(false);
        },
      }
    );
  };

  // Calculate stats for modal
  const questionsAnswered = Array.from(userAnswers.values()).filter(
    (answer) => answer.selectedOptionId !== null
  ).length;

  const markedForReview = Array.from(userAnswers.values()).filter(
    (answer) => answer.markedForReview
  ).length;

  const remainingTimeFormatted = `${String(Math.floor(timeLeft / 60)).padStart(
    2,
    "0"
  )}:${String(timeLeft % 60).padStart(2, "0")}`;

  const isLastQuestion =
    currentQuestionIndex === (data?.questions.length || 0) - 1;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  if (!data || !currentQuestion) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        No data available
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col md:flex-row gap-5 md:h-screen px-3 md:px-0">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-3">
            <QuestionDisplay
              question={currentQuestion}
              selectedOption={selectedAnswer?.selectedOptionId || null}
              onOptionChange={handleOptionChange}
              questionNumber={currentQuestionNumber}
              totalQuestions={data.questions_count}
            />

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              <Button
                onClick={handleMarkForReview}
                className={`${
                  selectedAnswer?.markedForReview
                    ? "bg-purple-800 hover:bg-purple-900"
                    : "bg-purple-700 hover:bg-purple-800"
                } text-white px-6 py-2.5 rounded text-sm md:text-base font-medium transition-colors w-full`}
              >
                Mark for review
              </Button>
              <Button
                onClick={handlePrevious}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-2.5 rounded text-sm md:text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              {isLastQuestion ? (
                <Button
                  onClick={handleSubmitClick}
                  className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-2.5 rounded text-sm md:text-base font-medium transition-colors w-full"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-2.5 rounded text-sm md:text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
                  disabled={currentQuestionIndex === data.questions.length - 1}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-[600px] overflow-y-auto">
          <QuestionNavigation
            totalQuestions={data.questions_count}
            currentQuestion={currentQuestionNumber}
            userAnswers={userAnswers}
            onQuestionSelect={handleQuestionSelect}
            timeLeft={timeLeft}
          />
        </div>
      </div>

      {/* Submit Test Modal */}
      {data && (
        <SubmitTestModal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          onSubmit={handleSubmitTest}
          remainingTime={remainingTimeFormatted}
          totalQuestions={data.questions_count}
          questionsAnswered={questionsAnswered}
          markedForReview={markedForReview}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
};

export default MCQTest;
