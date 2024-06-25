import Point from "./Point";

class Shape {
  constructor(
    protected tl: Point,
    protected tr: Point,
    protected bl: Point,
    protected br: Point,
    protected centroid: Point
  ) {}

  getPoints(): Point[] {
    return [this.tl, this.tr, this.bl, this.br];
  }

  getCentroid(): Point {
    return this.centroid;
  }

  getArea(): number {
    throw new Error("Subclass must implement getArea method");
  }

  getBoundingBox(): { minX: number; minY: number; maxX: number; maxY: number } {
    throw new Error("Subclass must implement getBoundingBox method");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  draw(_ctx: CanvasRenderingContext2D, _centroid: Point): void {
    throw new Error("Subclass must implement draw method");
  }

  moveSpeed(): void {
    throw new Error("Subclass must implement move method");
  }
}

export default Shape;
