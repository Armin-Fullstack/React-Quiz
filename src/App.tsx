import { useEffect, useReducer } from "react";
import Header from "./Header";
import QuestionBar from "./QuestionBar";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

import { AppAction, AppState} from "./Type";

const initailState: AppState = {
  questions: [],
  // loading , error , ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0
};

function reducer(currentState: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "dataReceived":
      if(Array.isArray(action.payload) && action.payload.every(item => typeof item === "object" && item !== null)) {
        return {
          ...currentState,
          questions: action.payload!,
          status: "ready",
        };
      }
      break;
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
      case "newAnswer" : 
      {
      const question = currentState.questions.at(currentState.index)
      if(typeof action.payload === "number" ||  action.payload === null) {
        return {
          ...currentState,
          answer: action.payload!,
          points: action.payload === question.correctOption ? currentState.points + question.points : currentState.points
        }
      }
      break;
    }
    default:
      return currentState ;
  }
  return currentState
}

export default function App(): JSX.Element {
  const [{ questions, status , index, answer}, dispatch] = useReducer(reducer, initailState);
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
        {status === "active" && <Question question = {questions[index]} dispatch = {dispatch} answer = {answer}/>}
        
      </QuestionBar>
    </div>
  );
}
