import Alea from "alea";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class RightKite extends Quadrilateral {
  constructor(canvasWidth: number, canvasHeight: number, seed: string) {
    const prng = Alea(seed);
    const minSide = Math.min(canvasWidth, canvasHeight) * 0.1; // Minimum side is 10% of the smaller dimension
    const maxSide = Math.min(canvasWidth, canvasHeight) * 0.3; // Maximum side is 30% of the smaller dimension

    // Generate two pairs of equal sides
    const side1 = prng() * (maxSide - minSide) + minSide; // Random side length between minSide and maxSide
    const side2 = prng() * (maxSide - minSide) + minSide; // Random side length between minSide and maxSide

    // Define points for the right kite shape ensuring one 90-degree angle
    const p1 = new Point(canvasWidth / 2, canvasHeight / 2); // Center point
    const p2 = new Point(p1.x + side1, p1.y); // Right point
    const p3 = new Point(p1.x, p1.y + side2); // Bottom point
    const p4 = new Point(p1.x - side1, p1.y); // Left point

    super(
      p1,
      p2,
      p3,
      p4,
      new Point(canvasWidth / 2, canvasHeight / 2), // Center point
      "black",
      seed
    );
  }
}

export default RightKite;
