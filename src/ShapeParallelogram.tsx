import Alea from "alea";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class Parallelogram extends Quadrilateral {
  constructor(canvasWidth: number, canvasHeight: number, seed: string) {
    const prng = Alea(seed);
    const minPercentage = 0.25;
    const maxPercentage = 0.5;
    const minWidth = canvasWidth * minPercentage; // Minimum base is half of the canvas width
    const maxWidth = canvasWidth * maxPercentage; // Maximum base is the canvas width
    const minHeight = canvasHeight * minPercentage; // Minimum height is half of the canvas height
    const maxHeight = canvasHeight * maxPercentage; // Maximum height is the canvas height
    const minAngle = Math.PI / 8; // Minimum angle is 30 degrees
    const maxAngle = Math.PI / 3; // Maximum angle is 60 degrees

    const base = Math.floor(prng() * (maxWidth - minWidth) + minWidth);
    const height = Math.floor(prng() * (maxHeight - minHeight) + minHeight);
    const angle = prng() * (maxAngle - minAngle) + minAngle; // Random angle between minAngle and maxAngle

    super(
      new Point(0, 0),
      new Point(base, 0),
      new Point(base + height / Math.tan(angle), height),
      new Point(height / Math.tan(angle), height),
      new Point(base / 2, height / 2),
      "black",
      seed
    );
  }
}

export default Parallelogram;
