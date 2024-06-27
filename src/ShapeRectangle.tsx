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
    return new Rectangle(
      this.prng() * 100 + 50,
      this.prng() * 100 + 50,
      this.seed
    );
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
