import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EndGame() {
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve all the shapes from the session storage
    const shape = JSON.parse(sessionStorage.getItem("shapeChoise")!);
    console.log(shape.seed);

    const mousePos = JSON.parse(sessionStorage.getItem("mousePositions")!);
    console.log(mousePos);
  });

  const resetChallenge = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={resetChallenge}>Restart Challenge</button>
    </div>
  );
}
export default EndGame;
