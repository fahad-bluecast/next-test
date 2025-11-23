"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface QuestionnaireResultContextType {
  marksObtained: number;
  totalMarks: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  notAttendedQuestions: number;
  setResultData: (data: {
    marksObtained: number;
    totalMarks: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    notAttendedQuestions: number;
  }) => void;
}

const QuestionnaireResultContext = createContext<
  QuestionnaireResultContextType | undefined
>(undefined);

export function QuestionnaireResultProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [marksObtained, setMarksObtained] = useState<number>(0);
  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [notAttendedQuestions, setNotAttendedQuestions] = useState<number>(0);

  const setResultData = (data: {
    marksObtained: number;
    totalMarks: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    notAttendedQuestions: number;
  }) => {
    setMarksObtained(data.marksObtained);
    setTotalMarks(data.totalMarks);
    setTotalQuestions(data.totalQuestions);
    setCorrectAnswers(data.correctAnswers);
    setIncorrectAnswers(data.incorrectAnswers);
    setNotAttendedQuestions(data.notAttendedQuestions);
  };

  return (
    <QuestionnaireResultContext.Provider
      value={{
        marksObtained,
        totalMarks,
        totalQuestions,
        correctAnswers,
        incorrectAnswers,
        notAttendedQuestions,
        setResultData,
      }}
    >
      {children}
    </QuestionnaireResultContext.Provider>
  );
}

export function useQuestionnaireResult() {
  const context = useContext(QuestionnaireResultContext);
  if (context === undefined) {
    throw new Error(
      "useQuestionnaireResult must be used within a QuestionnaireResultProvider"
    );
  }
  return context;
}
