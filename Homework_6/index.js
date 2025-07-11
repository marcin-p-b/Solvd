"use strict";

//Task 1
const translations = {
  en: {
    greet: "Hello",
    intro: "Welcome to our website",
  },
  fr: {
    greet: "Bonjour",
    intro: "Bienvenue sur notre site web",
  },
};

const language = "en";
const greeting = "greet";
const introduction = "intro";

const localize = function (obj, template) {
  obj = translations || obj;
  try {
    if (typeof obj !== "undefined")
      if (language in obj)
        if (template in obj[language]) return obj[language][template];
    return new Error(`Given parameters cannot be of type "undefined"`);
  } catch (error) {
    console.error(error);
  }
};

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

console.log(localizedGreeting);
console.log(localizedIntroduction);
//###############################################################

//Task 2
const highlightKeywords = function (template, keywords) {
  return template.replace(/\$\{(\d+)\}/g, (_, index) => {
    const customHighlight = `<span class='highlight'>${keywords[index]}</span>`;
    return keywords[index] !== undefined && customHighlight;
  });
};

const keywords = ["Javascript", "template", "tagged"];
const template =
  "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";
const highlighted = highlightKeywords(template, keywords);

console.log(highlighted);
//###############################################################

//Task 3
const multiline = function (str) {
  console.log(str.raw);
  const lines = String(str.raw).split("\n");
  const filtered = lines.filter((line) => line);

  const indexed = filtered.map((line, index) => {
    return `${index + 1} ${line}`;
  });
  return indexed.join("\n");
};

const code = multiline`
function add(a, b) {
return a+b;
}`;

console.log(code);
//###############################################################

//Task 4

const debounce = function (func, delay) {
  let intervalId;

  return function (...args) {
    clearTimeout(intervalId);
    intervalId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

function debouncedSearch(query) {
  console.log("Searching for: ", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 300);

const inputEvent = document.getElementById("search-input");
inputEvent.addEventListener("input", (event) => {
  debouncedSearchHandler(event.target.value);
});

//###############################################################

//Task 5
const throttle = function (func, interval) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function onScroll(event) {
  console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 1000);

window.addEventListener("scroll", throttledScrollHandler);
//###############################################################

//Task 5
const curry = function (func, arity) {
  arity = arity || func.length;

  return function curried(...args) {
    return args.length >= arity
      ? func.apply(this, args)
      : function (...nextArgs) {
          return curried.apply(this, args.concat(nextArgs));
        };
  };
};
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2);
const step2 = step1(3);
const result = step2(4);

console.log("Result", result);
//###############################################################
