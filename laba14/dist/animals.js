"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = exports.Animal = void 0;
class Animal {
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        console.log("Sound");
    }
}
exports.Animal = Animal;
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    makeSound() {
        console.log("Woof!");
    }
}
exports.Dog = Dog;
