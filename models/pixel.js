class Pixel {
    constructor(r,g,b,a){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

}

const packRGBA = (r,g,b,a) => {
    r = clampMinZero(r, 255);
    g = clampMinZero(g, 255);
    b = clampMinZero(b, 255);
    a = clampMinZero(a, 255);

    //i think i should impliment alpha into each rgb

    return new Pixel(r,g,b,a);
}
