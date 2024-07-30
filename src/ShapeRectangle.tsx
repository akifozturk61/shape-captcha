import Alea from "alea";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class Rectangle extends Quadrilateral {
  constructor(canvasWidth: number, canvasHeight: number, seed: string) {
    const prng = Alea(seed);

    const minWidth = canvasWidth * 0.4; // Minimum width is half of the canvas width
    const maxWidth = canvasWidth * 0.8; // Maximum width is the canvas width
    const minHeight = canvasHeight * 0.4; // Minimum height is half of the canvas height
    const maxHeight = canvasHeight * 0.8; // Maximum height is the canvas height

    const newWidth = Math.floor(prng() * (maxWidth - minWidth) + minWidth);
    const newHeight = Math.floor(prng() * (maxHeight - minHeight) + minHeight);

    super(
      new Point(0, 0),
      new Point(newWidth, 0),
      new Point(newWidth, newHeight),
      new Point(0, newHeight),
      new Point(0, 0),
      "black",
      seed
    );
  }
}

export default Rectangle;
