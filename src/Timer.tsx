import { useEffect } from "react"
import { TimerProps } from "./Type"
export default function Timer({dispatch , secondsRemaining}: TimerProps): JSX.Element {
  
    const mins = Math.floor((secondsRemaining ?? 0 ) / 60)
    const seconds = (secondsRemaining ?? 0) % 60
  

  useEffect(() => {
    const id = setInterval(() => {
      // every single setInterval timer returns an ID
      dispatch({type: "tick"}) 
    } , 1000) // There is a performance issue. bc when a component re- render, all its children will re- render too. here per second 
    return () => clearInterval(id) // when this component umounted, setInterval function is still working
  } , [dispatch])
  return(
    <div className="timer">{mins < 10 && "0"}{mins}:{seconds < 10 && "0"}{seconds}</div>
  )
}