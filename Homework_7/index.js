"use strict";
//Task1

const promiseAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let resolvedCount = 0;

    if (promises.length === 0) {
      return resolve([]);
    }

    promises.map((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          resolvedCount++;
          if (resolvedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const promises1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

promiseAll(promises1)
  .then((results) => {
    console.log("All promises resolved:", results); // Expected: [1, 2, 3]
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  });

//##############################################################

//Task2
const promises2 = [
  Promise.resolve(1),
  Promise.reject("Error occurred"),
  Promise.resolve(3),
];

const pending = {
  state: "pending",
};

const promiseAllSettled = function (promises) {
  return promiseAll(
    promises.map((promise) =>
      Promise.resolve(promise)
        .then((value) => ({ status: "fulfilled", value }))
        .catch((reason) => ({ status: "rejected", reason }))
    )
  );
};

promiseAllSettled(promises2).then((results) => {
  console.log("All promises settled:", results);
  // Expected: [{ status: 'fulfilled', value: 1 },
  //            { status: 'rejected', reason: 'Error occurred' },
  //            { status: 'fulfilled', value: 3 }]
});
//##############################################################

//Task3
const chainPromises = function (arr) {
  return arr.reduce((prevPromise, currentFunc) => {
    return prevPromise.then(currentFunc);
  }, Promise.resolve());
};

function asyncFunction1() {
  return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
  return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
  return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

chainPromises(functionsArray)
  .then((result) => {
    console.log("Chained promise result:", result);
    // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
  })
  .catch((error) => {
    console.error("Chained promise error:", error);
  });
//##############################################################

//Task4
const promisify = function (callbackFunc) {
  return function (...arg) {
    return new Promise((resolve, reject) => {
      callbackFunc(arg, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  };
};

function callbackStyleFunction(value, callback) {
  setTimeout(() => {
    if (value > 0) {
      callback(null, value * 2);
    } else {
      callback("Invalid value", null);
    }
  }, 1000);
}

const promisedFunction = promisify(callbackStyleFunction);

promisedFunction(3)
  .then((result) => {
    console.log("Promised function result:", result); // Expected: 6
  })
  .catch((error) => {
    console.error("Promised function error:", error);
  });
