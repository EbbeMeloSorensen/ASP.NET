let a = 42; // type script infers that data is a number (like when you use var in C#)
// a = '42'; // so this is illegal

let b: any = 42; // This is basically java script, where the variable b can be reassigned to any type (avoid if possible)
b = '42'; // so this is legal

let c: number | string = 42; // This variable can be a number OR a string
c = '42'; // so this is legal

// Type script uses the concept of duck typing (like python)

// These 2 objects are independent (and inconsistent)
const duck1 = {
    name: 'huey',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

const duck2 = {
    name: 'dewey',
    numLeg: 2,
    makeQuack: (sound: any) => console.log(sound)
}

// To ensure consistency among objects, better derive from a common interface, like below
// (the export keyword lets us use the Dog interface in other files in our application)
export interface Cat {
    name: string;
    numLegs: number;
    makeSound: (sound: string) => void;
}

const cat1: Cat = {
    name: 'garfield',
    numLegs: 4,
    makeSound: (sound: any) => console.log(sound)
}

const cat2: Cat = {
    name: 'gylle',
    numLegs: 4,
    makeSound: (sound: any) => console.log(sound)
}

// For this interface, the makeSound method is optional (because of the question mark)
interface Dog {
    name: string;
    numLegs: number;
    makeSound?: (sound: string) => void;
}

// so this object without the makeSound method is legal
const dog1: Dog = {
    name: 'futte',
    numLegs: 4
}

// This object has the optional method
const dog2: Dog = {
    name: 'Belle',
    numLegs: 4,
    makeSound: (sound: any) => console.log(sound)
}

// As a developer, you can indicate that "you know a given object has an optional method", by means of an exclamation mark
// (but try to avoid coding like this)
dog2.makeSound!('vuf');

// Create an array of dogs for use by other files in our application
export const cats = [cat1, cat2]