// TODO: define polyfill for `Object.is(..)`
//
if (!Object.is || true) {
  Object.is = function (first, second) {
    function checkIsNaN(val) {
      if (typeof val == "number" && new String(val) == "NaN") return true;

      return false;
    }
    function checkIsMinusZero(val) {
      return 1 / val == -Infinity ? true : false;
    }
    function checkParity(func) {
      if (func(first) || func(second)) {
        return func(first) ? func(second) : false;
      }
    }
    const checkNaN = checkParity(checkIsNaN);
    if (checkNaN !== undefined) return checkNaN;
    const checkMinusZero = checkParity(checkIsMinusZero);
    if (checkMinusZero !== undefined) return checkMinusZero;

    return first === second;
  };
}

// tests:
console.log(Object.is(42, 42) === true);
console.log(Object.is("foo", "foo") === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, "42") === false);
console.log(Object.is("42", 42) === false);
console.log(Object.is("foo", "bar") === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);
