import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface ResultPageProps {
  marksObtained: number;
  totalMarks: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  notAttendedQuestions: number;
  onDone?: () => void;
}

const ResultPage = ({
  marksObtained,
  totalMarks,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  notAttendedQuestions,
  onDone,
}: ResultPageProps) => {
  const handleDone = () => {
    if (onDone) {
      onDone();
    } else {
      console.log("Test completed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-md mx-auto px-4">
        {/* Main Result Card */}
        <div className="bg-cyan-600 rounded-lg shadow-lg p-8 mb-6">
          <div className="text-center text-white">
            <div className="text-sm mb-2">Marks Obtained:</div>
            <div className="text-6xl font-bold">
              {marksObtained} / {totalMarks}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-3">
          {/* Total Questions */}
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">
                Total Questions:
              </span>
            </div>
            <span className="text-gray-900 font-bold">
              {String(totalQuestions).padStart(3, "0")}
            </span>
          </div>

          {/* Correct Answers */}
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">
                Correct Answers:
              </span>
            </div>
            <span className="text-gray-900 font-bold">
              {String(correctAnswers).padStart(3, "0")}
            </span>
          </div>

          {/* Incorrect Answers */}
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">
                Incorrect Answers:
              </span>
            </div>
            <span className="text-gray-900 font-bold">
              {String(incorrectAnswers).padStart(3, "0")}
            </span>
          </div>

          {/* Not Attended Questions */}
          <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-500 rounded flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">
                Not Attended Questions:
              </span>
            </div>
            <span className="text-gray-900 font-bold">
              {String(notAttendedQuestions).padStart(3, "0")}
            </span>
          </div>
        </div>

        {/* Done Button */}
        <div className="mt-6">
          <Link href={"/auth/login"}>
            <Button
              onClick={handleDone}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Done
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
