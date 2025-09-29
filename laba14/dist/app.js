"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animals_1 = require("./animals");
const base_1 = require("./base");
const shapes_1 = require("./shapes");
let myString = "laba14";
let myNumber = 22;
let myBoolean = true;
let myNumbersArray = [1, 2, 3, 4, 5];
let myObject = {
    name: "Yauheni",
    age: 19,
    isStudent: true
};
let autoString = "laba14 autoString";
let autoNumber = 333;
let autoArray = [10, 20, 30];
function concat(str, num) {
    return str + " " + num;
}
console.log(concat(myString, myNumber));
const myDog = new animals_1.Dog("Dog");
myDog.makeSound();
const stringStore = new base_1.DataStore();
stringStore.add("str1");
stringStore.add("str2");
(0, base_1.printInfo)(stringStore.getAll());
const circleStore = new base_1.DataStore();
circleStore.add(new shapes_1.Circle(3));
circleStore.add(new shapes_1.Circle(5));
(0, base_1.printInfo)(circleStore.getAll());
