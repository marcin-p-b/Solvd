'use strict';

const errorMessage = (message) => {
  throw new Error(message);
};

const addValues = (val1, val2) => {
  let result = null;

  try {
    if (typeof val1 == 'undefined' || typeof val2 == 'undefined') {
      errorMessage('one of the values is undefined');
    } else if (isNaN(val1) || isNaN(val2)) {
      if (Array.isArray(val1) || Array.isArray(val2)) {
        result = new Array();
        for (let i = 0; i < val1.length; i++) {
          result[i] = val1[i] + val2[i];
        }
      } else result = val1 + val2;
      return result;
    } else {
      result = +val1 + +val2;
      return result;
    }
  } catch (error) {
    console.error(error);
  }
  return;
};

const stringifyValue = (val) => {
  switch (typeof val) {
    case 'string':
    case 'object':
      return JSON.stringify(val);
    default:
      return String(val);
  }
};

const invertBoolean = (bool) => {
  try {
    if (typeof bool !== 'boolean') {
      errorMessage('given argument is not a boolean');
    }
    return !bool;
  } catch (error) {
    console.error(error);
  }
};

const convertToNumber = (val) => {
  try {
    if (typeof val === 'string')
      if (parseFloat(val) === NaN) {
        return parseFloat(val);
      } else errorMessage(`Conversion of ${val} is impossible`);
    else if (Array.isArray(val)) {
      const result = val.map((element, index) => {
        if (isNaN(element)) {
          errorMessage(
            `Conversion of ${element} at position ${index} is impossible`
          );
        }
        return Number(element);
      });
      return result;
    } else if (typeof val === 'object') {
      if (typeof val.valueOf() === 'number') {
        return val.valueOf();
      }
      if (typeof val.toString() === 'string') {
        const num = Number(val.toString());
        return isNaN(num) ? null : num;
      }
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

const coerceToType = (val, type) => {
  try {
    if (type === Number) {
      return convertToNumber(val);
    } else if (type === String) {
      return stringifyValue(val);
    } else if (type === Boolean) {
      return !!val;
    } else if (type === Object) {
      return Object(val);
    } else if (type === Array) {
      return [].concat(val);
    } else {
      errorMessage(
        `Unsupported type, Conversion of ${val} to a type of ${type} is impossible`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  addValues,
  stringifyValue,
  invertBoolean,
  convertToNumber,
  coerceToType,
};
