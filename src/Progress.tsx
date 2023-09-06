import { ProgressProps } from "./Type"
export default function Progress({index , numQuestions , points , totalPossiblePoints , answer}: ProgressProps): JSX.Element {
  return(
    <header className="progress">
        <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
        <p>Questions <strong>{index + 1}</strong> / {numQuestions}</p>
        <p> <strong>{points}</strong> / {totalPossiblePoints} points</p>
    </header>
  )
}