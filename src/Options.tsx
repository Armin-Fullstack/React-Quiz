import { OptionsProps } from "./Type";

export default function Options({options}: OptionsProps): JSX.Element {
  console.log(options);
  return(
    <div className="options">{options.options.map(option => <button className="btn btn-option" key={option}>{option}</button>)}</div>
  )
}