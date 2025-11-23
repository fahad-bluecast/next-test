import { Question } from "@/interface/questionnaire/ListQuestionnaire.type";
import { useState } from "react";
import ComprehensiveParagraphModal from "./ParagraphModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Question Display Component
const QuestionDisplay = ({
  question,
  selectedOption,
  onOptionChange,
  questionNumber,
  totalQuestions,
}: {
  question: Question;
  selectedOption: number | null;
  onOptionChange: (optionId: number) => void;
  questionNumber: number;
  totalQuestions: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className=" flex flex-col gap-2">
      {/* Question Header */}

      <div className="flex items-center justify-between">
        <h2 className="text-base font-normal ">Ancient Indian History MCQ</h2>
        <span className="text-sm  bg-white rounded p-1 shadow">
          {String(questionNumber).padStart(2, "0")}/
          {String(totalQuestions).padStart(3, "0")}
        </span>
      </div>
      <div className="bg-white rounded shadow p-2">
        {/* Comprehension Paragraph */}
        {question.comprehension && (
          <div className="mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2 hover:bg-cyan-700 transition-colors"
            >
              <span>📄</span>
              Read Comprehensive Paragraph
              <span>▶</span>
            </button>
            <ComprehensiveParagraphModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              content={question.comprehension}
            />
          </div>
        )}

        {/* Question */}
        <div className="mb-6">
          <p className="text-sm ">
            {question.number}. {question.question}
          </p>

          {/* Question Image */}
          {question.image && (
            <div className="mb-4">
              <img
                src={question.image}
                alt="Question"
                className="rounded border-4 border-cyan-400"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <p className="text-sm text-gray-600 mb-3">Choose the answer:</p>
        <RadioGroup
          value={selectedOption?.toString() || ""}
          onValueChange={(value) => onOptionChange(parseInt(value))}
        >
          {question.options.map((option, index) => {
            const optionLabels = ["A", "B", "C", "D", "E", "F"];
            const optionLabel = optionLabels[index] || String(index + 1);
            return (
              <div
                key={option.id}
                className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onOptionChange(option.id)}
              >
                <Label
                  htmlFor={`option-${option.id}`}
                  className="flex-1 cursor-pointer text-sm text-gray-800 flex items-center gap-2"
                >
                  <span className="font-semibold text-gray-700">
                    {optionLabel}.
                  </span>
                  <span className="flex-1">
                    {option.option}
                    {option.image && (
                      <img
                        src={option.image}
                        alt="Option"
                        className=" max-w-xs rounded border"
                      />
                    )}
                  </span>
                </Label>
                <RadioGroupItem
                  value={option.id.toString()}
                  id={`option-${option.id}`}
                  className="shrink-0"
                />
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
};
export default QuestionDisplay;
