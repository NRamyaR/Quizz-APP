// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import HeaderValuejs from "./HeaderValue.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import NextButton from "./Components/NextButton.js";
import Progress from "./Components/Progress.js";
import FinishedScreen from "./Components/FinishedScreen.js";
import Footer from "./Components/Footer.js";
import Timer from "./Components/Timer.js";

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],

  //'loadin state', 'error state', 'ready', 'active', 'finish'
  status: "loading",
  index: 0,
  hightScore: 0,
  secondRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.question * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.question.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "Finish":
      return {
        ...state,
        status: "finished",
        hightScore:
          state.points > state.hightScore ? state.points : state.hightScore,
      };
    case "Restart":
      return { ...initialState, question: state.question, status: "ready" };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };
    // return {
    //   ...state,
    //   points: 0,
    //   hightScore: 0,
    //   index: 0,
    //   answer: null,
    //   status: "ready",
    // };
    default:
      throw new Error("Action unknown");
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, hightScore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestion = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur + points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      {/* <DateCounter /> */}
      <HeaderValuejs />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestion}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestion={numQuestion}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            hightScore={hightScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
