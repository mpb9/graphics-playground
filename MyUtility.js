const swap = (a, b) => {
    const temp = a;
    a = b;
    b = temp;
}
const GRoundToInt = (x) => {
    return Math.floor(x + 0.5);
}

const GFloorToInt = (x) =>{
    return Math.floor(x);
}

const GCeilToInt = (x) => {
    return Math.ceil(x);
}

const GPinToUnit = (x) => {
    return Math.max(0.0, Math.min(1.0, x));
}
const clamp = (x, max) => {
    return Math.max(1.0, Math.min(x, max));
}