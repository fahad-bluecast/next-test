export interface ListQuestionnaireResponse {
  success: boolean;
  questions_count: number;
  total_marks: number;
  total_time: number;
  time_for_each_question: number;
  mark_per_each_answer: number;
  instruction: string;
  questions: Question[];
}

export interface Question {
  question_id: number;
  number: number;
  question: string;
  comprehension: null | string;
  image: null;
  options: Option[];
}

export interface Option {
  id: number;
  option: string;
  is_correct: boolean;
  image: null;
}
