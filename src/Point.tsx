class Point {
  constructor(public x: number, public y: number) {}

  moveX(amount: number): void {
    this.x += amount;
  }

  moveY(amount: number): void {
    this.y += amount;
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }
}

export default Point;
