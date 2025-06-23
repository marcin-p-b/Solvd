'use strict';

//Task 1
//##############################################################
const createPerson = (initialData) => {
  let state = { ...initialData };

  const person = {};

  Object.keys(state).forEach((key) => {
    Object.defineProperty(person, key, {
      get: () => state[key],
      enumerable: true,
    });
  });

  Object.defineProperty(person, 'updateInfo', {
    value: function (newInfo) {
      Object.keys(newInfo).forEach((key) => {
        if (state.hasOwnProperty(key)) {
          state[key] = newInfo[key];
        }
      });
    },
    enumerable: false,
  });

  return person;
};

const person = createPerson({
  firstName: 'Jonh',
  lastName: 'Doe',
  age: 30,
  email: 'john.doe@example.com',
});

console.log(person);
person.updateInfo({
  firstName: 'Jane',
  age: 31,
});
console.log(person);

Object.defineProperty(person, 'address', {
  value: {},
  writable: true,
  configurable: false,
  enumerable: false,
});

// console.log(person);
// console.log(Object.getOwnPropertyDescriptors(person));
//##############################################################

//Task 2
//##############################################################
const product = {
  name: 'Laptop',
  price: 1000,
  quantity: 5,
};

Object.defineProperties(product, {
  price: { writable: false, enumerable: false },
  quantity: { writable: false, enumerable: false },
});

// console.log(product);
// console.log(Object.getOwnPropertyDescriptors(product));

const getTotalPrice = (product) => {
  const priceDescriptor = Object.getOwnPropertyDescriptor(product, 'price');
  const quantityDescriptor = Object.getOwnPropertyDescriptor(
    product,
    'quantity'
  );
  return priceDescriptor.value * quantityDescriptor.value;
};

// console.log(getTotalPrice(product));

const deleteNonConfigurable = function (obj, prop) {
  try {
    if (prop in obj) {
      if (Object.getOwnPropertyDescriptor(obj, prop).configurable !== false) {
        delete obj[prop];
      } else throw new Error('The property is not configurable ');
    }
  } catch (error) {
    console.error(error);
  }
};

deleteNonConfigurable(product, 'price');
// console.log(product);
//##############################################################

//Task 3
//##############################################################

const bankAccount = {
  balance: 1000,
  set newBalance(value = 0) {
    if (typeof value === 'number' && value >= 0) {
      this.balance = value;
    } else {
      console.error('Invalid balance amount.');
    }
  },
  get formattedBalance() {
    return `$${this.balance}`;
  },
};

bankAccount.transfer = function (sender, receiver, amount) {
  sender.newBalance = sender.balance - amount;
  receiver.newBalance = receiver.balance + amount;
};

const receiverAccount = { ...bankAccount, balance: 0 };
// console.log(receiverAccount);
// console.log(bankAccount);

bankAccount.transfer(bankAccount, receiverAccount, 500);

// console.log(receiverAccount);
// console.log(bankAccount);
//##############################################################

//Task 4
//##############################################################
const createImmutableObject = function (obj) {
  const newObj = { ...obj };
  Object.freeze(newObj);
  return newObj;
};
const immutablePerson = createImmutableObject(person);
// console.log(Object.getOwnPropertyDescriptors(immutablePerson));
//##############################################################

//Task 5
//##############################################################
const observeObject = function (obj, callback) {
  const newProxy = new Proxy(obj, {
    get(target, property, receiver) {
      callback(property, 'get');
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      callback(property, 'set');
      return Reflect.set(target, property, value, receiver);
    },
  });
  return newProxy;
};

function logger(prop, action) {
  console.log(
    `Property "${prop}" was ${
      action === 'get' ? `${action} (accessed)` : `${action} (modified)`
    }`
  );
}

const observedPerson = observeObject(person, logger);
// console.log(observedPerson.age);
// console.log(observedPerson.firstName);

// observedPerson.updateInfo({ age: 32 });
// console.log(observedPerson.age);

// observedPerson.address = 'London';
// console.log(observedPerson.address);
//##############################################################

//Task 6
//##############################################################
const deepCloneObject = function (obj) {
  structuredClone(obj);
};
//##############################################################

//Task 7
//##############################################################
function validateObject(obj, schema) {
  for (const key in schema) {
    const rules = schema[key];

    if (!(key in obj)) return false;

    if (typeof obj[key] !== rules.type) return false;

    if (
      rules.hasOwnProperty('minLength') &&
      obj[key].length < rules.minLength
    ) {
      return false;
    }

    if (rules.hasOwnProperty('max') && obj[key] > rules.max) {
      return false;
    }

    if (rules.hasOwnProperty('pattern') && !rules.pattern.test(obj[key])) {
      return false;
    }
  }

  return true;
}

const schema = {
  name: { type: 'string', minLength: 2 },
  age: { type: 'number', max: 120 },
  email: { type: 'string', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
};

const source = {
  name: 'Alice',
  age: 30,
  email: 'alice@example.com',
};

// console.log(validateObject(source, schema));
