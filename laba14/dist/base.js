"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = void 0;
exports.printInfo = printInfo;
function printInfo(item) {
    console.log(JSON.stringify(item));
}
class DataStore {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
exports.DataStore = DataStore;
