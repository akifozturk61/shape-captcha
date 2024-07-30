import Alea from "alea";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class Irregular extends Quadrilateral {
  constructor(canvasWidth: number, canvasHeight: number, seed: string) {
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    const prng = Alea(seed);

    const minRadius = Math.min(canvasWidth, canvasHeight) * 0.3; // Minimum radius is half of the smaller dimension
    const maxRadius = Math.min(canvasWidth, canvasHeight) * 0.5; // Maximum radius is the smaller dimension
    const radius = Math.floor(prng() * (maxRadius - minRadius) + minRadius); // Random radius between minRadius and maxRadius    // Generate four random angles and sort them
    const angles = [prng(), prng(), prng(), prng()]
      .map((a) => a * 2 * Math.PI)
      .sort();

    // Calculate the points on the circle at these angles
    const points = angles.map(
      (angle) =>
        new Point(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
    );

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

export default Irregular;
