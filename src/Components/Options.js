import React from "react";
function Options({ question, dispatch, answer }) {
  console.log("***", question.options);
  const hasAnswered = answer != null;
  const optionsArray = question.options || [];
  return (
    <div className="options">
      {optionsArray.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            index === answer ? "correct" : "wrong"
          } ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
