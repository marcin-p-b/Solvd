"use strict";

//Task 1
const customFilterUnique = function (arr, callback) {
  const seen = new Set();

  return arr.filter((element) => {
    let key = callback(element);
    if (typeof key === "string") key = key.toLowerCase();

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const data = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Alice" },
  { id: 4, name: "John" },
  { id: 1, name: "Alice" },
  { id: 1, name: "alice" },
];

const uniqueById = customFilterUnique(data, (item) => item.id);
console.log(uniqueById);
//###############################################################

//Task 2
/*const chunkArray = function (arr, chunk) {
  try {
    if (chunk <= 0) throw new Error("Chunk size must be a positive integer");
    return arr.reduce((acc, _, i) => {
      if (i % chunk === 0) acc.push(arr.slice(i, i + chunk));
      return acc;
    }, []);
  } catch (error) {
    console.log(error);
  }
};*/

//2
const chunkArray = function (arr, chunk) {
  try {
    if (chunk <= 0) throw new Error("Chunk size must be a positive integer");

    const result = [];
    for (let i = 0; i < arr.length; i += chunk) {
      result.push(arr.slice(i, i + chunk));
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(chunkArray(testArray, 4));
//###############################################################

//Task 3
const customShuffle = function (arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    let j = Math.floor(Math.random() * (len - (i + 1))) + (i + 1);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

console.log(customShuffle(testArray));
//###############################################################

//Task 4
const getArrayIntersection = function (arr1, arr2) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return Array.from(set1.intersection(set2));
};

const arr1 = [1, 3, 5, 7, 9];
const arr2 = [1, 4, 9];
console.log(getArrayIntersection(arr1, arr2));

const getArrayUnion = function (arr1, arr2) {
  return Array.from(new Set(arr1.concat(arr2)));
};

console.log(getArrayUnion(arr1, arr2));
//###############################################################

//Task 5
const measureArrayPerformance = function (func, arr) {
  const startTime = performance.now();

  const res = func(arr);

  const endTime = performance.now();
  const duration = endTime - startTime;

  console.log(`Execution time: ${duration.toFixed(4)} milliseconds`);
  return res;
};

function builtInMap(arr) {
  return arr.map((x) => x * 2);
}

function builtInFilter(arr) {
  return arr.filter((x) => x % 2 === 0);
}

function builtInReduce(arr) {
  return arr.reduce((sum, x) => sum + x, 0);
}

function customMap(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i] * 2);
  }
  return result;
}

function customFilter(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) result.push(arr[i]);
  }
  return result;
}

function customReduce(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

const array = Array.from({ length: 100000 }, (_, i) => i);

console.log("\nbuild in functions:");
measureArrayPerformance(builtInMap, array);
measureArrayPerformance(builtInFilter, array);
measureArrayPerformance(builtInReduce, array);

console.log("\ncustom functions:");
measureArrayPerformance(customMap, array);
measureArrayPerformance(customFilter, array);
measureArrayPerformance(customReduce, array);
