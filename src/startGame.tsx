import Alea from "alea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Point from "./Point";
import Hinge from "./ShapeHinge";
import Irregular from "./ShapeIrregular";
import Kite from "./ShapeKite";
import Parallelogram from "./ShapeParallelogram";
import Quadrilateral from "./ShapeQuadrilateral";
import Rectangle from "./ShapeRectangle";
import Rhombus from "./ShapeRhombus";
import RightHinge from "./ShapeRightHinge";
import RightKite from "./ShapeRightKite";
import Square from "./ShapeSquare";

const shapeOptions = [
  Square,
  Rectangle,
  Rhombus,
  Parallelogram,
  RightKite,
  Kite,
  RightHinge,
  Hinge,
  Irregular,
];

function getRandomShape(canvasSize: number, seed: string) {
  const prng = Alea(seed);
  const randomIndex = Math.floor(prng() * shapeOptions.length);
  const ShapeClass = shapeOptions[randomIndex];
  return new ShapeClass(canvasSize, canvasSize, seed);
}

function StartGame() {
  const navigate = useNavigate();
  const [shapes, setShapes] = useState<Quadrilateral[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [flexDirection, setFlexDirection] = useState("flex-col");
  const [canvasSize, setCanvasSize] = useState(window.innerWidth * 0.2);
  const isMobile = () =>
    /Mobile|Android|Tablet|iPad|iPhone/i.test(navigator.userAgent);

  useEffect(() => {
    const handleMobile = () => {
      setCanvasSize(window.innerWidth * 0.4);
    };

    const handleResize = () => {
      setCanvasSize(window.innerWidth * 0.2);
    };

    if (isMobile()) {
      handleMobile();
    } else {
      window.addEventListener("resize", handleResize);
    }

    setFlexDirection(isMobile() ? "flex-col" : "flex-row");

    const rects: Quadrilateral[] = [];
    [1, 2, 3]
      .map((canvasId) => {
        // TODO: SET UNIQUE SEED FOR EACH SHAPE
        const seed =
          canvasId + Math.floor(Math.random() * 100000000).toString();
        const shape = getRandomShape(canvasSize, seed);
        // const shape = new Square(canvasSize, canvasSize, seed);
        // const shape = new Rectangle(canvasSize, canvasSize, seed);
        // const shape = new Irregular(canvasSize, canvasSize, seed);
        // const shape = new Rhombus(canvasSize, canvasSize, seed);
        // const shape = new Parallelogram(canvasSize, canvasSize, seed);
        // const shape = new RightHinge(canvasSize, canvasSize, seed);
        // const shape = new Kite(canvasSize, canvasSize, seed);
        // const shape = new Hinge(canvasSize, canvasSize, seed);
        // const shape = new RightKite(canvasSize, canvasSize, seed);
        const canvas = document.getElementById(
          canvasId.toString()
        ) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return null;
        }
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        canvas.style.border = "1px solid black";
        shape.setRandomColor();
        shape.setCentroid(
          new Point(Math.floor(canvasSize / 2), Math.floor(canvasSize / 2))
        );
        shape.drawFromCentroid(ctx);
        rects.push(shape);
        return shape;
      })
      .filter((shape) => shape !== null) as Rectangle[];

    setShapes(rects);

    return () => {
      if (!isMobile()) {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [refreshKey, canvasSize]);

  const handleShapeClick = (index: number) => {
    const shape = shapes[index];
    const shapeIndex = shapeOptions.findIndex(
      (ShapeClass) => shape instanceof ShapeClass
    );

    const shapeData = {
      point1x: shape.getPoints()[0].getX(),
      point1y: shape.getPoints()[0].getY(),
      point2x: shape.getPoints()[1].getX(),
      point2y: shape.getPoints()[1].getY(),
      point3x: shape.getPoints()[2].getX(),
      point3y: shape.getPoints()[2].getY(),
      point4x: shape.getPoints()[3].getX(),
      point4y: shape.getPoints()[3].getY(),
      color: shape.getCurrentColor(),
      seed: shape.getSeed(),
      prng: shape.getPrngExport(),
      shapeDifficulty: shapeIndex,
    };
    sessionStorage.setItem("shapeChoise", JSON.stringify(shapeData));
    navigate(`/app`);
  };

  return (
    <div className="flex flex-col items-center mb-10">
      <div className="flex flex-row justify-center mb-10">
        <h1 className="mt-10 text-2xl font-extrabold">
          Pick a shape to follow
        </h1>
      </div>
      <div className={`flex ${flexDirection} justify-center`}>
        <button className="mr-5 mb-5" onClick={() => handleShapeClick(0)}>
          <canvas id="1" width={canvasSize} height={canvasSize}></canvas>
        </button>
        <button className="mr-5 mb-5" onClick={() => handleShapeClick(1)}>
          <canvas id="2" width={canvasSize} height={canvasSize}></canvas>
        </button>
        <button className="mr-5 mb-5" onClick={() => handleShapeClick(2)}>
          <canvas id="3" width={canvasSize} height={canvasSize}></canvas>
        </button>
      </div>

      <div className="flex flex-col items-center mb-10">
        <h1 className="mt-10 text-2xl font-extrabold">
          If you don't like them:
        </h1>
        <button
          className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setRefreshKey(refreshKey + 1)}
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}

export default StartGame;
