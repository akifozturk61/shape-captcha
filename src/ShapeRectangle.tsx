import Alea from "alea";
import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class Rectangle extends Quadrilateral {
  constructor(private width: number, private height: number, seed: string) {
    const prng = Alea(seed);

    const newWidth = Math.floor(
      prng() * (width * 0.7 - width * 0.3) + width * 0.3
    );
    const newHeight = Math.floor(
      prng() * (height * 0.7 - height * 0.3) + height * 0.3
    );

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

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getRandomRectangle() {
    const newWidth = this.genRanInt(this.width * 0.3, this.width * 0.7);
    const newHeight = this.genRanInt(this.height * 0.3, this.height * 0.7);

    return new Rectangle(newWidth, newHeight, this.seed);
  }
}

export default Rectangle;
