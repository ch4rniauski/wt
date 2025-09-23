export interface Shape {
  getArea(): number;
}

export class Circle implements Shape {
  private radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  public getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

export class Rectangle implements Shape {
  private width: number;
  private height: number;

  public constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  
  public getArea(): number {
    return this.width * this.height;
  }
}

