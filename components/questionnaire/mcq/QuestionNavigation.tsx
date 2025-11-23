import Timer from "./Timer";

export interface UserAnswer {
  questionId: number;
  selectedOptionId: number | null;
  markedForReview: boolean;
  visited?: boolean;
}

const QuestionNavigation = ({
  totalQuestions,
  currentQuestion,
  userAnswers,
  onQuestionSelect,
  timeLeft,
}: {
  totalQuestions: number;
  currentQuestion: number;
  userAnswers: Map<number, UserAnswer>;
  onQuestionSelect: (questionNum: number) => void;
  timeLeft: number;
}) => {
  const getQuestionStatus = (questionNum: number) => {
    const answer = userAnswers.get(questionNum);
    if (answer?.markedForReview && answer?.selectedOptionId !== null)
      return "answered-marked";
    if (answer?.markedForReview) return "marked";
    if (
      answer?.selectedOptionId !== null &&
      answer?.selectedOptionId !== undefined
    )
      return "answered";
    // If visited but not answered, show as not-attended (red)
    if (answer?.visited) return "not-attended";
    // If not visited, show as initial (white)
    return "initial";
  };

  const getStatusColor = (status: string, isActive: boolean) => {
    if (isActive && status === "answered-marked")
      return "bg-green-500 text-white border-2 border-purple-600";
    if (isActive && status === "answered")
      return "bg-green-500 text-white border-2 border-green-600";
    if (isActive) return "bg-green-500 text-white border-2 border-green-600";

    switch (status) {
      case "answered":
        return "bg-green-500 text-white";
      case "not-attended":
        return "bg-red-500 text-white";
      case "marked":
        return "bg-purple-600 text-white";
      case "answered-marked":
        return "bg-green-500 text-white border-2 border-purple-600";
      case "initial":
        return "bg-white text-gray-700 border border-gray-300";
      default:
        return "bg-white text-gray-700 border border-gray-300";
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="">Question No. Sheet:</span>
        <div className="flex items-center gap-2">
          <span className="">Remaining Time:</span>
          <Timer timeLeft={timeLeft} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-10 gap-2 mb-4">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => {
          const status = getQuestionStatus(num);
          const isActive = num === currentQuestion;
          return (
            <button
              key={num}
              onClick={() => onQuestionSelect(num)}
              className={`h-9 rounded text-sm font-medium transition-all ${getStatusColor(
                status,
                isActive
              )}`}
            >
              {num}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs pt-3 border-t">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600">Attended</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">Not Attended</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-purple-600 rounded"></div>
          <span className="text-gray-600">Marked For Review</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-purple-800 rounded"></div>
          <span className="text-gray-600">Answered and Marked For Review</span>
        </div>
      </div>
    </div>
  );
};
export default QuestionNavigation;
