class Pixel {
    constructor(r,g,b){ //ignoring alpha for images
        this.r = r;
        this.g = g;
        this.b = b;
        //this.a = a;
    }

}

const packRGB = (r,g,b) => {

    //i think i should impliment alpha into each rgb

    return new Pixel(r,g,b);
}
