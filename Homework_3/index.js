'use strict';

//Task 1
//##############################################################
//1
const calculateDiscountedPrice = (products, discount) => {
  const productsAfterDiscount = products.map((product, index) => {
    return {
      ...product,
      price: product.price - (product.price * discount[index]) / 100,
    };
  });
  return productsAfterDiscount;
};

const products = [
  { product: 'banana', price: 10 },
  { product: 'strawberry', price: 100 },
  { product: 'onion', price: 20 },
];
const discount = [10, 15, 20];

// console.log(calculateDiscountedPrice(products, discount));
// console.log(products);

//2
const calculateTotalPrice = (products) => {
  return products
    .map((product) => product.price)
    .reduce((acc, curr) => acc + curr);
};

// console.log(calculateTotalPrice(products));
// console.log(products);
//##############################################################

//Task 2
//##############################################################

const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);

//1
const getFullName = (person) => {
  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  const toTitleCase = (str) => str.replace(/\w\S*/g, capitalize);
  return `${toTitleCase(person.firstName)} ${toTitleCase(person.lastName)}`;
};

// const person = { firstName: 'john', lastName: 'smith' };
// console.log(getFullName(person));

//2
const filterUniqueWords = (text) => {
  const splitWords = (text) => text.toLowerCase().split(' ');
  const uniqueWords = (words) => [...new Set(words)];
  const sortWords = (words) => words.sort();

  return compose(sortWords, uniqueWords, splitWords)(text);
};

// const text = 'one two one two three alphabet';
// console.log(filterUniqueWords(text));

//3
const getAverageGrade = (students) => {
  const getGrades = (students) => students.grades;
  const grades = () => students.map(getGrades);
  const average = () =>
    grades().map(
      (grade) => grade.reduce((acc, curr) => acc + curr) / grade.length
    );
  return average();
};

const student = [
  {
    name: 'Ben Abbot',
    grades: [3, 5, 3, 5],
  },
  {
    name: 'Billy Kid',
    grades: [2, 2, 2, 2],
  },
  {
    name: 'Michael Greaves',
    grades: [5, 5, 5, 5],
  },
];

// console.log(getAverageGrade(student));
//##############################################################

//Task 3
//##############################################################
//1
const createCounter = () => {
  let count = 0;
  return () => {
    count++;
    return count;
  };
};

const addToCounter = createCounter();

// console.log(addToCounter());
// console.log(addToCounter());
// console.log(addToCounter());

//2
const repeatFunction = (fun, num) => {
  return (...args) => {
    if (num >= 0) {
      for (let i = 0; i < num; i++) {
        fun(...args);
      }
    } else
      while (true) {
        fun(...args)();
      }
  };
};

// const testfun = () => console.log('repeat');
// const repeatFourTimes = repeatFunction(testfun, 4);
// repeatFourTimes();
//##############################################################

//Task 4
//##############################################################
//1
const calculateFactorial = (num, acc = 1) => {
  if (num === 0) return acc;
  let factorial = num * calculateFactorial(num - 1) * acc;
  return factorial;
};

// console.log(calculateFactorial(5));

//2
const power = (base, exponent) => {
  if (exponent !== 0) {
    return base * power(base, exponent - 1);
  }
  return 1;
};

// console.log(power(2, 4));
//##############################################################

//Task 5
//##############################################################
//1
const lazyMap = (arr, mapping) => {
  let index = 0;

  return {
    next: function () {
      if (index < arr.length) {
        const result = mapping(arr[index]);
        index++;
        return result;
      } else {
        return;
      }
    },
    [Symbol.iterator]: function () {
      return this;
    },
  };
};

// const array = [1, 2, 3, 4];
// const mappedGenerator = lazyMap(array, (x) => x + 2);

// console.log(mappedGenerator.next());
// console.log(mappedGenerator.next());
// console.log(mappedGenerator.next());
// console.log(mappedGenerator.next());

//2
const fibonacciGenerator = () => {
  let a = 0,
    b = 1;

  const result = () => {
    const next = a;
    a = b;
    b = next + b;
    return next;
  };

  return result;
};

const getNextFibonacci = fibonacciGenerator();

// console.log(getNextFibonacci());
// console.log(getNextFibonacci());
// console.log(getNextFibonacci());
// console.log(getNextFibonacci());
// console.log(getNextFibonacci());
// console.log(getNextFibonacci());
