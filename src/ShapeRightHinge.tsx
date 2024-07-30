import Alea from "alea";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class RightHinge extends Quadrilateral {
  constructor(canvasWidth: number, canvasHeight: number, seed: string) {
    const prng = Alea(seed);
    const minSide = Math.min(canvasWidth, canvasHeight) * 0.4; // Minimum side is half of the smaller dimension
    const maxSide = Math.min(canvasWidth, canvasHeight) * 0.8; // Maximum side is the smaller dimension

    const equalSide = Math.floor(prng() * (maxSide - minSide) + minSide); // Random side length between minSide and maxSide
    const otherSide = Math.floor(prng() * (maxSide - minSide) + minSide); // Random side length between minSide and maxSide

    super(
      new Point(0, 0),
      new Point(equalSide, 0),
      new Point(equalSide, otherSide),
      new Point(0, equalSide),
      new Point(equalSide / 2, equalSide / 2),
      "black",
      seed
    );
  }
}

export default RightHinge;
