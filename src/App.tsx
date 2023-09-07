import { useEffect, useReducer } from "react";
import Header from "./Header";
import QuestionBar from "./QuestionBar";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Footer from "./Footer";

import { AppAction, AppState } from "./Type";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30

const initailState: AppState = {
  questions: [],
  // loading , error , ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

function reducer(currentState: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "dataReceived":
      if (
        Array.isArray(action.payload) &&
        action.payload.every(
          (item) => typeof item === "object" && item !== null
        )
      ) {
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
        secondsRemaining: currentState.questions.length * SECS_PER_QUESTION
      };
    case "finish":
      return {
        ...currentState,
        status: "finished",
        highscore:
          currentState.points > currentState.highscore
            ? currentState.points
            : currentState.highscore,
      };
    case "reset":
      return {
        ...currentState,
        index: 0,
        answer: null,
        points: 0,
        highscore: 0,
        secondsRemaining: null,
        status: "ready"
      };
      case "tick":
        return {
          ...currentState,
          secondsRemaining: typeof currentState.secondsRemaining === "number" ?  currentState.secondsRemaining - 1 : currentState.secondsRemaining ,
          status: currentState.secondsRemaining === 0 ? "finished" : currentState.status
        }
    case "newAnswer": {
      const question = currentState.questions.at(currentState.index);
      if (typeof action.payload === "number" || action.payload === null) {
        return {
          ...currentState,
          answer: action.payload!,
          points:
            action.payload === question.correctOption
              ? currentState.points + question.points
              : currentState.points,
        };
      }
      break;
    }
    case "nextQuestion":
      return {
        ...currentState,
        index: currentState.index + 1,
        answer: null,
      };
    default:
      return currentState;
  }
  return currentState;
}

export default function App(): JSX.Element {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] =
    useReducer(reducer, initailState);
  const numQuestions = questions.length;
  const totalPossiblePoints = questions.reduce(
    (acc, curr) => acc + curr.points,
    0
  );
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
        {status === "ready"  && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPossiblePoints={totalPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch = {dispatch} secondsRemaining = {secondsRemaining}/>
              {answer !== null && (
                <NextButton
                  dispatch={dispatch}
                  index={index}
                  numQuestions={numQuestions}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPossiblePoints={totalPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </QuestionBar>
    </div>
  );
}
