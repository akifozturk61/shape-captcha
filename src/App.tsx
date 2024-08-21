import axios from "axios";
import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import "./index.css";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";
import Rectangle from "./ShapeRectangle";

function App() {
  const finalScore = 5000;
  const [score, setScore] = useState(0);
  const [seed, setSeed] = useState("");
  const [time, setTime] = useState(0); // Timer value
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8,
  });
  const [shapes, setShapes] = useState<Quadrilateral[]>([]);

  const isMobile = () =>
    /Mobile|Android|Tablet|iPad|iPhone/i.test(navigator.userAgent);

  const handleWriteToFile = async (data: string) => {
    try {
      const response = await axios.post("http://localhost:3001/write-to-file", {
        data,
      });
      console.log("Resp data", response.data);
    } catch (error) {
      console.error("Error writing to file", error);
    }
  };

  useEffect(() => {
    if (finalScore >= 2000) {
      // Assuming you want to store the time in seconds
      const timeInSeconds = (time / 1000).toFixed(2);
      sessionStorage.setItem("timerAtScore1000", timeInSeconds);
      sessionStorage.setItem("shapes", JSON.stringify(shapes));
    }
  }, [score, time]);

  useEffect(() => {
    const start = performance.now();
    let frame: number;

    const updateTimer = () => {
      const now = performance.now();
      const elapsed = now - start;

      // Update time state here, converting elapsed time from milliseconds to seconds
      setTime(elapsed);

      frame = requestAnimationFrame(updateTimer);
    };

    frame = requestAnimationFrame(updateTimer);

    return () => cancelAnimationFrame(frame);
  }, [seed]);

  // const displayTimeInSeconds = (time: number) =>
  //   (time / 1000).toFixed(2) + " s";

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth * 0.8,
        height: isMobile()
          ? window.innerHeight * 0.6
          : window.innerHeight * 0.8,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const shapeData = JSON.parse(sessionStorage.getItem("shapeChoise")!);
    if (shapeData && shapeData.seed) {
      setSeed(shapeData.seed);
    }
    const shape = new Quadrilateral(
      new Point(shapeData.point1x, shapeData.point1y),
      new Point(shapeData.point2x, shapeData.point2y),
      new Point(shapeData.point3x, shapeData.point3y),
      new Point(shapeData.point4x, shapeData.point4y),
      new Point(0, 0),
      shapeData.color,
      shapeData.seed
    );
    if (shapeData.prng) {
      shape.setPrng(shapeData.prng);
    }
    const shapes = [shape];
    const amountVariations = shape.genRanInt(1, isMobile() ? 3 : 4);

    for (let i = 0; i <= amountVariations; i++) {
      shapes.push(shape.genRanVariation());
    }
    shapes.forEach((shape) => {
      shape.setPath(shape.genRanPath(100, canvasSize.width, canvasSize.height));
    });
    // console.log(JSON.stringify(shapes[0].getPath()));
    const chosenPath = JSON.stringify(shapes[0].getPath());

    handleWriteToFile(chosenPath);

    //Create obstacle
    const canvasArea = canvasSize.width * canvasSize.height;

    const obstacleArea = canvasArea * (isMobile() ? 0.3 : 0.4);

    const sides = Math.floor(Math.sqrt(obstacleArea));
    const obstacle = new Rectangle(sides, sides, shapeData.seed);
    const obstacleWidth = obstacle.getWidth();
    const obstacleHeight = obstacle.getHeight();

    const fixedCentroid = new Point(
      shape.genRanInt(obstacleWidth / 2, canvasSize.width - obstacleWidth / 2),
      shape.genRanInt(
        obstacleHeight / 2,
        canvasSize.height - obstacleHeight / 2
      )
    );

    obstacle.setCentroid(fixedCentroid);
    obstacle.setPath([fixedCentroid]);

    obstacle.setColor("black");
    shapes.push(obstacle);

    setShapes(shapes);
  }, [canvasSize.width, canvasSize.height]);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* {isMobile() ? (
        <h1 className="mt-10 text-2xl font-extrabold">
          Follow the right shape by tracking it with your finger!
        </h1>
      ) : (
        <h1 className="mt-10 text-2xl font-extrabold">
          Follow the right shape by tracking it with the mouse pointer!
        </h1>
      )} */}
      <h2 className="mt-5 text-l font-bold">Score: {score} </h2>
      {/* <h2 className="mt-5 text-l font-bold">
        Timer: {displayTimeInSeconds(time)}
      </h2> */}
      <div
        className="border border-solid border-black mt-10 mb-10"
        style={{ width: canvasSize.width, height: canvasSize.height }}
      >
        <Canvas
          shapes={shapes}
          score={score}
          width={canvasSize.width}
          height={canvasSize.height}
          incrementscore={(increment: number) => setScore(score + increment)}
        />
      </div>
    </div>
  );
}

export default App;
