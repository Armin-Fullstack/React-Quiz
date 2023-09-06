import { NextButtonProps } from "./Type"
export default function NextButton({dispatch} : NextButtonProps): JSX.Element {
  return(
    <button className="btn btn-ui" onClick={() => dispatch({type: "nextQuestion"})}>Next</button>
  )
}