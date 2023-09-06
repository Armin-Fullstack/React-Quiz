import { FinishScreenProps } from "./Type"
export default function FinishScreen({points , totalPossiblePoints , highscore , dispatch} : FinishScreenProps): JSX.Element {
  let emoji: string = "";
  // This error occurs because the compiler cannot determine if the variable will always be assigned a value before it is used.
  const percentage = (points / totalPossiblePoints) * 100
  if (percentage === 100) emoji = "🎉"
  if(percentage >= 80 && percentage < 100) emoji = "😌"
  if(percentage >= 50 &&  percentage < 80 ) emoji = "🤨"
  if(percentage > 0 &&  percentage < 50 ) emoji = "😑"
  if(percentage === 0) emoji = "🤦🏻‍♂️"

  return(
    <>
    <p className="result">
      {emoji} You scored {points} out of {totalPossiblePoints} ({Math.ceil(percentage)}%)
    </p>
    <p className="highscore">(Highscore: {highscore} points)</p>
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "reset" })}
    >
      Reset
    </button>
    </>
  )
}