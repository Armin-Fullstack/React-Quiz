import { useEffect, useReducer } from "react";
import Header from "./Header";
import QuestionBar from "./QuestionBar";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

import { AppAction, AppState } from "./Type";

const initailState: AppState = {
  questions: [],
  // loading , error , ready , active , finished
  status: "loading",
  index: 0
};

function reducer(currentState: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...currentState,
        questions: action.payload!,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...currentState,
        status: "error",
      };
    case "start":
      return {
        ...currentState,
        status: "active",
      };
    default:
      throw new Error("Action unknown!");
  }
}

export default function App(): JSX.Element {
  const [{ questions, status , index}, dispatch] = useReducer(reducer, initailState);
  console.log(questions);
  const numQuestions = questions.length;
  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <QuestionBar>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && <Question question = {questions[index]} />}
        
      </QuestionBar>
    </div>
  );
}
