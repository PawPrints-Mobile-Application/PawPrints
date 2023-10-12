import { StringFormat } from "firebase/storage";

type ColorNodes = {
    ears: String,
    eyes: String,
    face: String,
    muzzle: String,
    nose: String
}

type DogInfo = {
    name: String,
    age: Number,
    breed: String,
    color: ColorNodes
};

class Dog implements DogInfo {
    name: String;
    age: Number;
    breed: String;
    color: ColorNodes;
    
    public constructor(name: String, age: Number, breed: String, color: ColorNodes) {
        this.name = name;
        this.age = age;
        this.breed = breed;
        this.color = color;
    }
}

const dogs: Array<Dog> = [
    new Dog('Troy', 3, 'Shih Tzu', {ears: 'b;acl', eyes: 'black', face: 'white', muzzle: 'white', nose: 'black'})
];

export {
    Dog,

    dogs
}

export type {
    DogInfo
}