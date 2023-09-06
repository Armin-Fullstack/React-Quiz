import { NextButtonProps } from "./Type";
export default function NextButton({ dispatch , index , numQuestions}: NextButtonProps): JSX.Element | null{
  if(index < numQuestions - 1) 
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  ) 
  if(index === numQuestions - 1)
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finish" })}
    >
      finish
    </button>
  ) 
  return null
}
