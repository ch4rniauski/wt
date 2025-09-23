import { Dog } from "./animals";
import { DataStore, printInfo } from "./base";
import { Circle } from "./shapes";

let myString: string = "laba14";
let myNumber: number = 22;
let myBoolean: boolean = true;
let myNumbersArray: number[] = [1, 2, 3, 4, 5];
let myObject: { name: string; age: number; isStudent: boolean } = {
    name: "Yauheni",
    age: 19,
    isStudent: true
};

let autoString = "laba14 autoString";
let autoNumber = 333;
let autoArray = [10, 20, 30];

function concat(str: string, num: number): string {
    return str + " " + num;
}

console.log(concat(myString, myNumber));

const myDog = new Dog("Dog");
myDog.makeSound();

const stringStore = new DataStore<string>();

stringStore.add("str1");
stringStore.add("str2");

printInfo(stringStore.getAll());

const circleStore = new DataStore<Circle>();

circleStore.add(new Circle(3));
circleStore.add(new Circle(5));

printInfo(circleStore.getAll());
