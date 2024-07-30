import Alea from "alea";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class Square extends Quadrilateral {
  constructor(canvasWidth: number, _canvasHeight: number, seed: string) {
    const prng = Alea(seed);

    const minSide = canvasWidth * 0.4; // Minimum width is half of the canvas width
    const maxSide = canvasWidth * 0.8; // Maximum width is the canvas width

    const newSide = Math.floor(prng() * (maxSide - minSide) + minSide);

    super(
      new Point(0, 0),
      new Point(newSide, 0),
      new Point(newSide, newSide),
      new Point(0, newSide),
      new Point(0, 0),
      "black",
      seed
    );
  }
}

export default Square;
