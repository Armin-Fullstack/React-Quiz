import Header from "./Header";
import QuestionBar from "./QuestionBar";

export default function App(): JSX.Element{
  return (
    <div className="app">
      <Header />
      <QuestionBar>
        <p>1/15</p>
        <p>Question?</p>
      </QuestionBar>
    </div>
  )
}