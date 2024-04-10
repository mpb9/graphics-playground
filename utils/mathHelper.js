const swap = (a, b) => {
  const temp = a;
  a = b;
  b = temp;
};
const GRoundToInt = (x) => {
  return Math.floor(x + 0.5);
};

const GFloorToInt = (x) => {
  return Math.floor(x);
};

const GCeilToInt = (x) => {
  return Math.ceil(x);
};

const GPinToUnit = (x) => {
  return Math.max(0.0, Math.min(1.0, x));
};
const clamp = (x, max) => {
  return Math.max(1.0, Math.min(x, max));
};
const clampMinZero = (x, max) => {
  return Math.max(0.0, Math.min(x, max));
};

function getDec(v1, v2) {
  var big = toDeci(v1) * 16;
  var small = toDeci(v2);

  return big + small;
}

const toDeci = (h) => {
  var d = 0;
  if (h == "a") {
    d = 10;
  } else if (h == "b") {
    d = 11;
  } else if (h == "c") {
    d = 12;
  } else if (h == "d") {
    d = 13;
  } else if (h == "e") {
    d = 14;
  } else if (h == "f") {
    d = 15;
  } else {
    d = parseFloat(h);
  }
  return d;
};
