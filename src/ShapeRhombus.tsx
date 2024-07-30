import Alea from "alea";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class Rhombus extends Quadrilateral {
  constructor(canvasWidth: number, canvasHeight: number, seed: string) {
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    const prng = Alea(seed);

    const minSize = Math.min(canvasWidth, canvasHeight) * 0.4; // Minimum size is half of the smaller dimension
    const maxSize = Math.min(canvasWidth, canvasHeight) * 0.8; // Maximum size is the smaller dimension
    const d1 = minSize + prng() * (maxSize - minSize); // Random size between minSize and maxSize
    const d2 = minSize + prng() * (maxSize - minSize); // Random size between minSize and maxSize

    // Calculate the points of the rhombus
    const points = [
      new Point(cx, cy - d2 / 2),
      new Point(cx + d1 / 2, cy),
      new Point(cx, cy + d2 / 2),
      new Point(cx - d1 / 2, cy),
    ];

    super(
      points[0],
      points[1],
      points[2],
      points[3],
      new Point(cx, cy),
      "black",
      seed
    );
  }
}
export default Rhombus;
