import { Dispatch } from "react"


export interface QestionBarProps {
  children: React.ReactNode
}
export interface AppAction {
  type: "dataReceived" | "dataFailed" | "start" | "newAnswer" | "nextQuestion" | "finish" | "reset";
  payload?: Question[] | number | null;
}

export interface AppState {
  questions: Question[];
  status: string;
  index: number;
  answer: null | number;
  points: number;
  highscore: number
}

export interface StartScreenProps {
  numQuestions: number,
  dispatch: Dispatch<AppAction>
}

export interface Question {
  question: string;
  correctOption: number;
  options: string[];
  points: number;
}

export interface QuestionProps {
  question: Question;
  answer: number | null;
  dispatch: Dispatch<AppAction>;
}

export interface OptionsProps {
  options: Question;
  answer: number | null;
  dispatch: Dispatch<AppAction>;
}
export interface NextButtonProps {
  dispatch: Dispatch<AppAction>;
  index: number;
  numQuestions: number;
}

export interface ProgressProps {
  index: number;
  numQuestions: number;
  points: number;
  totalPossiblePoints: number;
  answer: null | number
}

export interface FinishScreenProps {
  points: number;
  totalPossiblePoints: number;
  highscore: number;
  dispatch: Dispatch<AppAction>;
}