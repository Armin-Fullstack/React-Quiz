import Options from "./Options";
import { QuestionProps } from "./Type";

export default function Question({ question , answer , dispatch}: QuestionProps): JSX.Element {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question} dispatch= {dispatch} answer = {answer}/>
    </div>
  );
}
