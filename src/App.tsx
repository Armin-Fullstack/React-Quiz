import { useEffect, useReducer } from "react";
import Header from "./Header";
import QuestionBar from "./QuestionBar";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

interface AppAction {
  type: "dataReceived" | "dataFailed";
  payload?: object[];
}
interface AppState {
  questions: object[];
  status: string;
}

const initailState = {
  questions: [],
  // loading , error , ready , active , finished
  status: "loading",
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
    default:
      throw new Error("Action unknown!");
  }
}

export default function App(): JSX.Element {
  const [{questions , status}, dispatch] = useReducer(reducer, initailState);
  const numQuestions = questions.length
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
        {status === "ready" && <StartScreen numQuestions = {numQuestions}/>}
        {/* <p>1/15</p>
        <p>Question?</p> */}
      </QuestionBar>
    </div>
  );
}
