import Alea from "alea";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class Hinge extends Quadrilateral {
  constructor(canvasWidth: number, canvasHeight: number, seed: string) {
    const prng = Alea(seed);
    const minSide = Math.min(canvasWidth, canvasHeight) * 0.2; // Minimum side is 30% of the smaller dimension
    const maxSide = Math.min(canvasWidth, canvasHeight) * 0.8; // Maximum side is 70% of the smaller dimension

    // Generate sides
    const equalSide = Math.floor(prng() * (maxSide - minSide) + minSide); // Random side length between minSide and maxSide
    const otherSide1 = Math.floor(prng() * (maxSide - minSide) + minSide); // Random side length between minSide and maxSide
    const otherSide2 = Math.floor(prng() * (maxSide - minSide) + minSide); // Random side length between minSide and maxSide

    // Define points for the hinge shape
    const p1 = new Point(
      canvasWidth / 2 - equalSide / 2,
      canvasHeight / 2 - otherSide1 / 2
    ); // Top-left
    const p2 = new Point(
      canvasWidth / 2 + equalSide / 2,
      canvasHeight / 2 - otherSide1 / 2
    ); // Top-right
    const p3 = new Point(
      canvasWidth / 2 + otherSide2 / 2,
      canvasHeight / 2 + otherSide1 / 2
    ); // Bottom-right
    const p4 = new Point(
      canvasWidth / 2 - otherSide2 / 2,
      canvasHeight / 2 + otherSide1 / 2
    ); // Bottom-left

    super(
      p1,
      p2,
      p3,
      p4,
      new Point((p1.x + p3.x) / 2, (p1.y + p3.y) / 2), // Center point
      "black",
      seed
    );
  }
}

export default Hinge;
