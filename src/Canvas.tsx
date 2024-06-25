import { useEffect, useRef } from "react";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

interface CanvasProps {
  shapes: Quadrilateral[];
  score: number;
  width: number;
  height: number;
}

// function animationloop(ctx: CanvasRenderingContext2D, shapes: Quadrilateral[]) {
//   let pathIndex = 0;
//   let progress = 0;
//   const speed = 0.0001;

//   const animate = () => {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     console.log("PathIndex:", pathIndex);
//     console.log("Progress:", progress);

//     console.log("Shapes received:", shapes);
//     if (pathIndex < shapes[0].getPath().length) {
//       shapes.forEach((shape) => {
//         const path = shape.getPath();
//         const p1 = path[pathIndex];
//         const p2 = path[(pathIndex + 1) % path.length];

//         // Calculate the direction vector from p1 to p2
//         const dir = new Point(p2[0] - p1[0], p2[1] - p1[1]);

//         // Calculate the next centroid by moving along the direction vector
//         const nextCentroid = new Point(
//           p1[0] + dir.getX() * progress,
//           p1[1] + dir.getY() * progress
//         );

//         // Draw the shape at the next centroid
//         shape.setCentroid(nextCentroid);
//         shape.drawFromCentroid(ctx);
//       });

//       // Update the progress
//       progress += speed;
//       console.log("PROGRESS UPDATE?", progress);
//       if (progress >= 1) {
//         pathIndex = (pathIndex + 1) % shapes[0].getPath().length;
//         progress = 0;
//       }
//     }
//     requestAnimationFrame(animate);
//   };

//   //Start the animation
//   animate();
// }

const Canvas = (props: CanvasProps) => {
  const score = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Quadrilateral[]>([]);
  const colorRef = useRef<string>("");

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      props.shapes.forEach((shape, index) => {
        //Update centroid to the next point in the path
        const path = shape.getPath();
        // const nextPointIndex = (currentPointsIndex[index] + 1) % path.length;
        // shape.setCentroid(
        //   new Point(path[nextPointIndex][0], path[nextPointIndex][1])
        // );
        const p1 = path[currentPointsIndex[index]];
        const p2 = path[(currentPointsIndex[index] + 1) % path.length];

        //Calculate the direction vector from p1 to p2
        const dir = new Point(p2[0] - p1[0], p2[1] - p1[1]);

        //Calculate the next centroid by moving along the direction vector
        const nextCentroid = new Point(
          p1[0] + dir.getX() * currentProgress[index],
          p1[1] + dir.getY() * currentProgress[index]
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

      requestAnimationFrame(animateShapes);
    };

    animateShapes();

    // const colors = ["red", "green", "blue", "yellow", "purple"]; // Define more colors as needed
    // props.shapes.forEach((shape, index) => {
    //   //   // Draw paths of each shape
    //   //   //   shape.drawPath(
    //   //   //     ctx,
    //   //   //     shape.getPath(),
    //   //   //     canvas.width,
    //   //   //     canvas.height,
    //   //   //     colors[index]
    //   //   //   );

    //   // Change centroid to first point in path and
    //   // Draw each shape
    //   shape.setCentroid(
    //     new Point(shape.getPath()[0][0], shape.getPath()[0][1])
    //   );
    //   shape.drawFromCentroid(ctx);
    // });
  }, [props.shapes, props.score]);
  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
