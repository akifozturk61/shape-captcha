import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

interface CanvasProps {
  shapes: Quadrilateral[];
  score: number;
  width: number;
  height: number;
  incrementscore: (increment: number) => void;
}

const Canvas = (props: CanvasProps) => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const shapesRef = useRef<Quadrilateral[]>([]);
  const [mousePositions, setMousePositions] = useState<number[][]>([]);
  const scoreRef = useRef(props.score);
  shapesRef.current = props.shapes;

  const handleMouseDown = (event: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (const shape of shapesRef.current.slice(0, -1)) {
      if (shape.isPointInsideShape(new Point(x, y))) {
        //TODO remove hardcarded shape in first position of array find another way to identify it

        if (shape == shapesRef.current[0]) {
          props.incrementscore(3);
          scoreRef.current = props.score;
        } else {
          props.incrementscore(1);
          scoreRef.current = props.score;
        }
      }
    }

    //Save mouse position
    setMousePositions([...mousePositions, [x, y]]);

    if (props.score >= 1000) {
      sessionStorage.setItem("mousePositions", JSON.stringify(mousePositions));
      navigate(`/endGame`);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) {
      return;
    }

    const currentPointsIndex = props.shapes.map(() => 0);
    const currentProgress = props.shapes.map(() => 0);
    const speed = 0.01;

    const animateShapes = () => {
      if (scoreRef.current >= 1000) {
        if (animationFrameIdRef.current != null) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      props.shapes.forEach((shape, index) => {
        //Update centroid to the next point in the path
        const path = shape.getPath();
        const p1 = path[currentPointsIndex[index]];
        const p2 = path[(currentPointsIndex[index] + 1) % path.length];

        //Calculate the direction vector from p1 to p2
        const dir = new Point(p2.getX() - p1.getX(), p2.getY() - p1.getY());

        //Calculate the next centroid by moving along the direction vector
        const nextCentroid = new Point(
          p1.getX() + dir.getX() * currentProgress[index],
          p1.getY() + dir.getY() * currentProgress[index]
        );

        //Draw the shape from its new centroid
        shape.setCentroid(nextCentroid);
        shape.drawFromCentroid(ctx);

        //Update the current point index
        currentProgress[index] += speed;
        if (currentProgress[index] >= 1) {
          currentPointsIndex[index] =
            (currentPointsIndex[index] + 1) % path.length;
          currentProgress[index] = 0;
        }
      });

      animationFrameIdRef.current = requestAnimationFrame(animateShapes);
    };

    animateShapes();

    return () => {
      if (animationFrameIdRef.current != null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [props.shapes]);
  return <canvas ref={canvasRef} {...props} onMouseMove={handleMouseDown} />;
};

export default Canvas;
