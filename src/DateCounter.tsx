import {useReducer} from "react"

interface State {
  count: number;
  step: number
}
interface Action {
  type: "inc" | "dec" | "reset" | "setCount" | "setStep";
  payload? : number
}

const initialState: State = { count: 0, step: 1 };
function reducer(currentState: State, action: Action): State {
  console.log(currentState, action);
  // if (action.type === "INCREASE") return currentState + 1;
  // if (action.type === "DECREASE") return currentState - 1;
  // if (action.type === "setCount") return action.payload;
  switch (action.type) {
    case "inc":
      return { ...currentState, count: currentState.count + currentState.step };
    case "dec":
      return { ...currentState, count: currentState.count - currentState.step };
    case "setCount":
      return { ...currentState, count: action.payload };
    case "setStep":
      return { ...currentState, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error("error");
  }
}

function DateCounter(): JSX.Element {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function (): void {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    dispatch({ type: "dec" });
  };

  const inc = function (): void {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>): void {
    // setCount(Number(e.target.value));
    dispatch({ type: "setCount", payload: +e.target.value });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>): void {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: +e.target.value });
  };

  const reset = function (): void {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
