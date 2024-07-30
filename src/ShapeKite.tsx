import Alea from "alea";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class Kite extends Quadrilateral {
  constructor(canvasWidth: number, canvasHeight: number, seed: string) {
    const prng = Alea(seed);
    const minSide = Math.min(canvasWidth, canvasHeight) * 0.3; // Minimum side is 30% of the smaller dimension
    const maxSide = Math.min(canvasWidth, canvasHeight) * 0.5; // Maximum side is 50% of the smaller dimension

    // Generate two pairs of equal sides
    const side1 = prng() * (maxSide - minSide) + minSide; // Random side length between minSide and maxSide
    const side2 = prng() * (maxSide - minSide) + minSide; // Random side length between minSide and maxSide

    // Calculate the heights based on the sides
    const height1 = Math.sqrt(side1 * side1 - (side2 / 2) * (side2 / 2)); // Height of the upper triangle
    const height2 = Math.sqrt(side2 * side2 - (side1 / 2) * (side1 / 2)); // Height of the lower triangle

    super(
      new Point(canvasWidth / 2, canvasHeight / 2 - height1), // Top point
      new Point(canvasWidth / 2 + side2 / 2, canvasHeight / 2), // Right point
      new Point(canvasWidth / 2, canvasHeight / 2 + height2), // Bottom point
      new Point(canvasWidth / 2 - side2 / 2, canvasHeight / 2), // Left point
      new Point(0, 0),
      "black",
      seed
    );
  }
}

export default Kite;
