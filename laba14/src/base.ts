export function printInfo<T>(item: T): void {
  console.log(JSON.stringify(item));
}

export class DataStore<T> {
  private items: T[] = [];

  public add(item: T) {
      this.items.push(item);
  }

  public getAll(): T[] {
      return this.items;
  }
}
