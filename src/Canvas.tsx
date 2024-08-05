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
  const finalScore = 5000;
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const shapesRef = useRef<Quadrilateral[]>([]);
  const [mousePositions, setMousePositions] = useState<number[][]>([]);
  const scoreRef = useRef(props.score);

  const lastCheckpointRef = useRef<number>(0);
  const [followingShape, setFollowingShape] = useState<[string, number][]>([]);

  shapesRef.current = props.shapes;
  const isMobile = () =>
    /Mobile|Android|Tablet|iPad|iPhone/i.test(navigator.userAgent);

  const handleShapeInteraction = (x: number, y: number) => {
    const scoreIncrementChosen = 15;
    const scoreIncrementVariation = 5;
    const scoreIncrementObject = 1;
    // console.log(shapesRef.current);
    for (const shape of shapesRef.current) {
      if (shape.isPointInsideShape(new Point(x, y))) {
        //TODO remove hardcarded shape in first position of array find another way to identify it
        if (shape == shapesRef.current[0]) {
          props.incrementscore(scoreIncrementChosen);
          scoreRef.current = props.score;
          break;
        } else if (shape == shapesRef.current[shapesRef.current.length - 1]) {
          props.incrementscore(scoreIncrementObject);
          scoreRef.current = props.score;
          break;
        } else {
          props.incrementscore(scoreIncrementVariation);
          scoreRef.current = props.score;
          break;
        }
      }
    }

    if (scoreRef.current >= lastCheckpointRef.current + finalScore / 101) {
      const shapeDistances = [];

      for (const shape of shapesRef.current) {
        shapeDistances.push([
          shapesRef.current.indexOf(shape),
          shape.getDistanceToCentroid(new Point(x, y)),
        ]);
      }

      // Get closest shape
      const closestShape = shapeDistances
        .slice(0, -1)
        .reduce((a, b) => (a[1] < b[1] ? a : b));

      // Check if the pointer is in object
      if (
        shapesRef.current[shapesRef.current.length - 1].isPointInsideShape(
          new Point(x, y)
        )
      ) {
        // Check if pointer is in closest shape
        if (
          shapesRef.current[closestShape[0]].isPointInsideShape(new Point(x, y))
        ) {
          // Check if the closest shape is the chosen shape
          if (closestShape[0] == 0) {
            setFollowingShape([
              ...followingShape,
              ["chosenObject", closestShape[1]],
            ]);
          }
          // Check if the closest shape is a variation shape
          else {
            setFollowingShape([
              ...followingShape,
              ["variationObject", closestShape[1]],
            ]);
          }
        } else {
          setFollowingShape([...followingShape, ["Object", closestShape[1]]]);
        }
      } else {
        // Check if the pointer is in the closest shape
        if (
          shapesRef.current[closestShape[0]].isPointInsideShape(new Point(x, y))
        ) {
          if (closestShape[0] == 0) {
            setFollowingShape([
              ...followingShape,
              ["chosenShape", closestShape[1]],
            ]);
          } else {
            setFollowingShape([
              ...followingShape,
              ["variationShape", closestShape[1]],
            ]);
          }
        } else {
          setFollowingShape([
            ...followingShape,
            ["emptySpace", closestShape[1]],
          ]);
        }
      }

      lastCheckpointRef.current += finalScore / 101;
    }

    //Save mouse position
    setMousePositions([...mousePositions, [x, y]]);

    if (props.score >= finalScore) {
      sessionStorage.setItem("followingShape", JSON.stringify(followingShape));
      sessionStorage.setItem("mousePositions", JSON.stringify(mousePositions));
      navigate(`/endGame`);
    }
  };

  // For mobile touchscreens
  const handleTouchMove = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    handleShapeInteraction(x, y);
  };

  // For desktop mouses
  const handleMouseDown = (event: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    handleShapeInteraction(x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const preventTouchScroll = (event: TouchEvent) => {
      event.preventDefault();
    };

    if (canvas) {
      canvas.addEventListener("touchstart", preventTouchScroll, {
        passive: false,
      });
      canvas.addEventListener("touchmove", preventTouchScroll, {
        passive: false,
      });
    }

    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) {
      return;
    }

    const currentPointsIndex = props.shapes.map(() => 0);
    const currentProgress = props.shapes.map(() => 0);
    const speed = isMobile() ? 0.02 : 0.011;

    const animateShapes = () => {
      if (scoreRef.current >= finalScore) {
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

        // Calculate the next centroid by linearly interpolating between p1 and p2
        const nextCentroid = new Point(
          p1.getX() + (p2.getX() - p1.getX()) * currentProgress[index],
          p1.getY() + (p2.getY() - p1.getY()) * currentProgress[index]
        );

        //Draw the shape from its new centroid
        shape.setCentroid(nextCentroid);
        shape.drawFromCentroid(ctx);

        //Update the current point index
        if (currentProgress[index] >= 1) {
          currentPointsIndex[index] =
            (currentPointsIndex[index] + 1) % path.length;
          currentProgress[index] = 0;
        }
        currentProgress[index] += speed;
      });
      animationFrameIdRef.current = requestAnimationFrame(animateShapes);
    };

    animateShapes();

    return () => {
      canvas.removeEventListener("touchstart", preventTouchScroll);
      canvas.removeEventListener("touchmove", preventTouchScroll);

      if (animationFrameIdRef.current != null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [props.shapes]);
  return (
    <canvas
      ref={canvasRef}
      {...props}
      onMouseMove={handleMouseDown}
      onTouchMove={handleTouchMove}
    />
  );
};

export default Canvas;
