import Options from "./Options";
import { QuestionProps } from "./Type";

export default function Question({ question }: QuestionProps): JSX.Element {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options options={question}/>
    </div>
  );
}
