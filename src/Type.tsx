import { Dispatch } from "react"


export interface QestionBarProps {
  children: React.ReactNode
}
export interface AppAction {
  type: "dataReceived" | "dataFailed" | "start";
  payload?: Question[];
}

export interface AppState {
  questions: Question[];
  status: string;
  index: number
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
}

export interface OptionsProps {
  options: Question
}
