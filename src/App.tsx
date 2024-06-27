import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";
import Rectangle from "./ShapeRectangle";
import "./index.css";

function App() {
  const [score, setScore] = useState(0);
  const [seed, setSeed] = useState("");
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.8,
  });
  const [shapes, setShapes] = useState<Quadrilateral[]>([]);

  const isMobile = () =>
    /Mobile|Android|Tablet|iPad|iPhone/i.test(navigator.userAgent);

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
    for (let i = 0; i <= shape.genRanInt(10); i++) {
      shapes.push(shape.genRanVariation());
    }
    shapes.forEach((shape) => {
      shape.setPath(shape.genRanPath(100, canvasSize.width, canvasSize.height));
    });

    //Create obstacle
    const obstacle = new Rectangle(10, 10, shapeData.seed);
    obstacle.setRandomSize(0.2 * canvasSize.width, 0.5 * canvasSize.height);

    const fixedCentroid = obstacle.genRanCentroid(
      canvasSize.height,
      canvasSize.width
    );
    obstacle.setPath([fixedCentroid]);
    obstacle.setCentroid(fixedCentroid);
    obstacle.setColor("black");
    shapes.push(obstacle);

    setShapes(shapes);
  }, [canvasSize.width, canvasSize.height]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mt-10 text-2xl font-extrabold">Shape CAPTCHA</h1>
      <h2 className="mt-5 text-l font-bold">Seed: {seed} </h2>
      <h2 className="mt-5 text-l font-bold">Score: {score}</h2>
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
