import { Dispatch } from "react"


export interface QestionBarProps {
  children: React.ReactNode
}
export interface AppAction {
  type: "dataReceived" | "dataFailed" | "start" | "newAnswer" | "nextQuestion";
  payload?: Question[] | number | null;
}

export interface AppState {
  questions: Question[];
  status: string;
  index: number;
  answer: null | number;
  points: number
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
  dispatch: Dispatch<AppAction>
}