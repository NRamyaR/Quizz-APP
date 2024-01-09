function FinishedScreen({ maxPossiblePoints, points, hightScore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  else if (percentage >= 80 && percentage < 100) emoji = "🎉";
  else if (percentage >= 50 && percentage < 80) emoji = "🙃";
  else if (percentage >= 0 && percentage < 50) emoji = "🤨";
  else if (percentage === 0) emoji = "🤦‍♀️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        Your SCored{" "}
        <strong>
          {points} out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
        </strong>
      </p>
      <p className="highScore">(HigheScore: {hightScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart Quizz
      </button>
    </>
  );
}

export default FinishedScreen;
