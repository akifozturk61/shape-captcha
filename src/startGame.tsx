import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";
import Rectangle from "./ShapeRectangle";

function StartGame() {
  const navigate = useNavigate();
  const [shapes, setShapes] = useState<Quadrilateral[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const rects: Quadrilateral[] = [];
    [1, 2, 3]
      .map((canvasId) => {
        let shape: Rectangle;
        const canvas = document.getElementById(
          canvasId.toString()
        ) as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return null;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.border = "1px solid black";

        // TODO: SET UNIQUE SEED FOR EACH SHAPE
        const seed =
          canvasId + Math.floor(Math.random() * 100000000).toString();
        // TODO

        shape = new Rectangle(canvas.width, canvas.height, seed);
        shape = shape.getRandomRectangle();
        shape.setRandomColor();
        shape.setCentroid(new Point(canvas.width / 2, canvas.height / 2));
        shape.drawFromCentroid(ctx);
        rects.push(shape);
        return shape;
      })
      .filter((shape) => shape !== null) as Rectangle[];

    setShapes(rects);
  }, [refreshKey]);

  const handleShapeClick = (index: number) => {
    const shape = shapes[index];
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
    };
    sessionStorage.setItem("shapeChoise", JSON.stringify(shapeData));
    navigate(`/app`);
  };

  return (
    <div>
      <div className="flex flex-row justify-center mb-10">
        <h1 className="mt-10 text-2xl font-extrabold">
          Pick a shape to follow
        </h1>
      </div>
      <div className="flex flex-column justify-center">
        <button className="mr-5" onClick={() => handleShapeClick(0)}>
          <canvas id="1" width="300" height="300"></canvas>
        </button>
        <button className="mr-5" onClick={() => handleShapeClick(1)}>
          <canvas id="2" width="300" height="300"></canvas>
        </button>
        <button className="mr-5" onClick={() => handleShapeClick(2)}>
          <canvas id="3" width="300" height="300"></canvas>
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
