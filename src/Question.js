import Options from "./Components/Options";

function Question({ question, answer, dispatch }) {
  console.log(question);
  return (
    <div>
      <h3>{question.question}</h3>
      <Options question={{ question }} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
