export class Animal {
  private name: string;

  public constructor(name: string) {
      this.name = name;
  }

  public makeSound(): void {
      console.log("Sound");
  }
}

export class Dog extends Animal {
  public constructor(name: string) {
      super(name);
  }

  public makeSound(): void {
      console.log("Woof!");
  }
}
