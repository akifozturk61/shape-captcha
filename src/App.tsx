/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Canvas from "./Canvas";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";
import "./index.css";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [score, setScore] = useState(0);
  const [seed, setSeed] = useState("");
  const navigate = useNavigate();
  const canvasWidth = 1000;
  const canvasHeight = 600;
  const [shapes, setShapes] = useState<Quadrilateral[]>([]);

  const resetChallenge = () => {
    setRefresh(!refresh);
    setScore(0);
    navigate("/");
  };

  useEffect(() => {
    const shapeData = JSON.parse(sessionStorage.getItem("shapeChoise")!);
    if (shapeData && shapeData.seed) {
      setSeed(shapeData.seed);
    }
    // const prng = alea();
    // prng.importState(shapeData.prng);
    // console.log("prng after importState:", prng());

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
      shape.setPath(shape.genRanPath(100, canvasWidth, canvasHeight));
    });
    setShapes(shapes);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="mt-10 text-2xl font-extrabold">Shape CAPTCHA</h1>
      <h2 className="mt-5 text-l font-bold">Seed: {seed} </h2>
      <div
        className="border border-solid border-black mt-10"
        style={{ width: canvasWidth, height: canvasHeight }}
      >
        <Canvas
          shapes={shapes}
          score={score}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    </div>
  );
}

export default App;
