class Bitmap {
    constructor(w,h,pixels){
    this.w = w;
    this.h = h;
    this.pixels = pixels;

    this.getAddress = function(x,y){
        if(x>=0 && x <= this.w && y >=0 && y <=this.h){
            return this.pixels[(y * this.w ) + x];
        }
        else return [0,0,0,0];
    }

    }

}

const makeImageBitmap = (w,h,pixels) =>{
    return new Bitmap(w,h,pixels);
}