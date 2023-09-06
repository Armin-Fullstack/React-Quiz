import { OptionsProps } from "./Type";

export default function Options({
  options,
  dispatch,
  answer,
}: OptionsProps): JSX.Element {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === options.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
