import Point from "./Point";
import Quadrilateral from "./ShapeQuadrilateral";

class Rectangle extends Quadrilateral {
  constructor(private width: number, private height: number, seed: string) {
    super(
      new Point(0, 0),
      new Point(width, 0),
      new Point(width, height),
      new Point(0, height),
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

  setRandomSize(min: number, max: number) {
    const newWidth = this.prng() * (max - min) + min;
    const newHeight = this.prng() * (max - min) + min;
    this.getPoints()[1].setX(newWidth);
    this.getPoints()[2].setX(newWidth);
    this.getPoints()[2].setY(newHeight);
    this.getPoints()[3].setY(newHeight);
  }
}

export default Rectangle;
