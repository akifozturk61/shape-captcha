import alea from "alea";
import { createNoise2D } from "simplex-noise";
import Point from "./Point";
import Shape from "./Shape";

class Quadrilateral extends Shape {
  path: Point[] = [];
  protected prng: ReturnType<typeof alea>;
  constructor(
    tl: Point,
    tr: Point,
    bl: Point,
    br: Point,
    centroid: Point,
    protected color: string,
    protected seed: string
  ) {
    super(tl, tr, bl, br, centroid);
    this.color = color;
    this.seed = seed;
    this.prng = alea(seed);
  }

  // Generate a random quadrilateral
  static getRandomQuadrilateral(seed: string) {
    const radius = 50;
    const cx = 100;
    const cy = 100;

    // Generatre four random angles and sort them
    const angles = [Math.random(), Math.random(), Math.random(), Math.random()]
      .map((a) => a * 2 * Math.PI)
      .sort();

    // Calculate the points on the circle at these angles
    const points = angles.map(
      (angle) =>
        new Point(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
    );

    return new Quadrilateral(
      points[0],
      points[1],
      points[2],
      points[3],
      new Point(0, 0),
      "black",
      seed
    );
  }

  // Getters

  getWidth() {
    const points = this.getPoints();
    let minX = points[0].getX();
    let maxX = points[0].getX();
    for (let i = 1; i < points.length; i++) {
      if (points[i].getX() < minX) {
        minX = points[i].getX();
      }
      if (points[i].getX() > maxX) {
        maxX = points[i].getX();
      }
    }

    return maxX - minX;
  }

  getHeight() {
    const points = this.getPoints();
    let minY = points[0].getY();
    let maxY = points[0].getY();
    for (let i = 1; i < points.length; i++) {
      if (points[i].getY() < minY) {
        minY = points[i].getY();
      }
      if (points[i].getY() > maxY) {
        maxY = points[i].getY();
      }
    }

    return maxY - minY;
  }

  // Get the prng
  getPrngExport() {
    return this.prng.exportState();
  }

  // Get the path of the quadrilateral
  getPath() {
    return this.path;
  }

  // Get the centroid of the quadrilateral
  getCentroid() {
    return this.centroid;
  }

  // Get the color of the quadrilateral
  getCurrentColor() {
    return this.color;
  }

  // Get the seed of the quadrilateral
  getSeed() {
    return this.seed;
  }

  // Get the coordinates of the points drawn from the centroid
  getPointsFromCentroid() {
    const newCentroid = this.getCentroid();
    const shapePoints = this.getPoints();

    // Original centroid
    let sumX = 0,
      sumY = 0;
    for (let i = 0; i < shapePoints.length; i++) {
      sumX += shapePoints[i].x;
      sumY += shapePoints[i].y;
    }
    const originalCentroid = new Point(
      sumX / shapePoints.length,
      sumY / shapePoints.length
    );

    const diffX = newCentroid.getX() - originalCentroid.getX();
    const diffY = newCentroid.getY() - originalCentroid.getY();

    const newPoints = shapePoints.map((point) => {
      return new Point(point.x + diffX, point.y + diffY);
    });

    return newPoints;
  }

  // Setters
  // getPrngExport() {
  //   return this.prng.exportState();
  // }

  getPrng() {
    return this.prng;
  }

  setPrng(prng: ReturnType<typeof this.getPrngExport>) {
    this.prng.importState(prng);
  }

  setPoints(...points: Point[]): void {
    this.tl = points[0];
    this.tr = points[1];
    this.bl = points[2];
    this.br = points[3];
  }

  setPath(path: Point[]): void {
    this.path = path;
  }

  setCentroid(centroid: Point): void {
    this.centroid = centroid;
  }

  setColor(color: string): void {
    this.color = color;
  }

  setRandomColor(): void {
    this.color = this.genRanColor();
  }

  // Methods

  // Map function to map a value from one range to another
  map(
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  }

  isPointInsideShape(point: Point) {
    const points = this.getPointsFromCentroid();

    let intersects = 0;

    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;

      if (
        points[i].y > point.y !== points[j].y > point.y &&
        point.x <
          ((points[j].x - points[i].x) * (point.y - points[i].y)) /
            (points[j].y - points[i].y) +
            points[i].x
      ) {
        intersects++;
      }
    }

    return intersects % 2 !== 0;
  }

  // Random generators
  genRanBool() {
    return this.prng() > 0.5;
  }

  genRanInt(min: number, max: number) {
    return Math.floor(this.prng() * (max - min) + min);
  }

  genRanFloat(range: number) {
    return this.prng() * range;
  }

  // Generate a random path
  genRanPath(x: number, canvasWidth: number, canvasHeight: number) {
    const noise2d = createNoise2D(this.prng);

    let xoff = this.prng();
    let yoff = this.prng();
    const path = [];

    for (let i = 0; i < x; i++) {
      const x = this.map(noise2d(xoff, 0), -1, 1, 0, canvasWidth);
      const y = this.map(noise2d(0, yoff), -1, 1, 0, canvasHeight);
      xoff += 0.1;
      yoff += 0.1;

      if (i === 0) {
        for (let j = 0; j < 5; j++) {
          path.push(new Point(x, y));
        }
      }

      path.push(new Point(x, y));
    }
    return path;
  }

  // Generate a random centroid
  genRanCentroid(canvasWidth: number, canvasHeight: number) {
    const shapeWidth = this.getWidth() / 2;
    const shapeHeight = this.getHeight() / 2;

    // Adjust canvas dimensions to create new bounds
    const adjustedCanvasWidth = canvasWidth - shapeWidth * 2;
    const adjustedCanvasHeight = canvasHeight - shapeHeight * 2;

    return new Point(
      shapeWidth + Math.floor(this.prng() * adjustedCanvasWidth),
      shapeHeight + Math.floor(this.prng() * adjustedCanvasHeight)
    );
  }

  // Generate a random color
  genRanColor() {
    const r = Math.floor(this.prng() * 256);
    const g = Math.floor(this.prng() * 256);
    const b = Math.floor(this.prng() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Generate a random variation between 1-10 degrees
  genRanVariation() {
    const radius = Math.floor(this.prng() * 10);
    const angle = this.prng() * 2 * Math.PI;
    const points = this.getPoints();

    // Pick a random point
    const point = Math.floor(this.prng() * 4);
    // Calculate new position of the point
    const newX = points[point].getX() + radius * Math.cos(angle);
    const newY = points[point].getY() + radius * Math.sin(angle);
    points[point] = new Point(newX, newY);

    // Return variation as a new quadrilateral
    const variation = new Quadrilateral(
      points[0],
      points[1],
      points[2],
      points[3],
      this.getCentroid(),
      this.getCurrentColor(),
      this.getSeed() + this.genRanInt(1, 100)
    );
    variation.setPoints(...points);
    return variation;
  }

  // Draw functions
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.tl.getX(), this.tl.getY());
    ctx.lineTo(this.tr.getX(), this.tr.getY());
    ctx.lineTo(this.bl.getX(), this.bl.getY());
    ctx.lineTo(this.br.getX(), this.br.getY());
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }

  drawFromPoints(ctx: CanvasRenderingContext2D, points: Point[]): void {
    ctx.beginPath();

    ctx.moveTo(points[0].getX(), points[0].getY());
    ctx.lineTo(points[1].getX(), points[1].getY());
    ctx.lineTo(points[2].getX(), points[2].getY());
    ctx.lineTo(points[3].getX(), points[3].getY());

    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }

  drawFromArray(ctx: CanvasRenderingContext2D, points: number[][]) {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }

  drawFromCentroid(ctx: CanvasRenderingContext2D): void {
    ctx.save();

    const points = this.getPointsFromCentroid();

    // Now draw the shape with its own draw method
    this.drawFromPoints(ctx, points);

    ctx.restore();
  }

  drawPath(ctx: CanvasRenderingContext2D, path: number[][], color: string) {
    // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i][0], path[i][1]);
    }
    ctx.closePath();
    ctx.stroke();
  }
}

export default Quadrilateral;
