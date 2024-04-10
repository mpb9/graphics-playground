class Matrix {
  constructor(SX, KX, TX, KY, SY, TY) {
    this.SX = SX;
    this.KX = KX;
    this.TX = TX;
    this.KY = KY;
    this.SY = SY;
    this.TY = TY;
  }
  get mat() {
    return [this.SX, this.KX, this.TX, this.KY, this.SY, this.TY, 0, 0, 1];
  }
}

/**
 * @param {number} tx
 * @param {number} ty
 */
const translate = (tx, ty) => {
  return new Matrix(1, 0, tx, 0, 1, ty);
};

/**
 * @param {number} sx
 * @param {number} sy
 */
const scale = (sx, sy) => {
  return new Matrix(sx, 0, 0, 0, sy, 0);
};

const rotate = (radians) => {
  // GMatrix m = GMatrix();
  // m.mat[0] = cos(radians);    m.mat[1] = -sin(radians);    m.mat[2] = 0;
  // m.mat[3] = sin(radians);    m.mat[4] = cos(radians);    m.mat[5] = 0;
  return new Matrix(Math.cos(radians), -Math.sin(radians), 0, Math.sin(radians), Math.cos(radians), 0);
};

/**
 *  Return the product of two matrices: a * b
 */
const concat = (a, b) => {
  let m = new Matrix();
  /*
    m.mat[0] = a.mat[0]*b.mat[0] + a.mat[1]*b.mat[3];           
    m.mat[1] = a.mat[0]*b.mat[1] + a.mat[1]*b.mat[4];    
    m.mat[2] = a.mat[0]*b.mat[2] + a.mat[1]*b.mat[5] + a.mat[2];    
    m.mat[3] = a.mat[3]*b.mat[0] + a.mat[4]*b.mat[3];    
    m.mat[4] = a.mat[3]*b.mat[1] + a.mat[4]*b.mat[4];           
    m.mat[5] = a.mat[3]*b.mat[2] + a.mat[4]*b.mat[5] + a.mat[5];
    return m;
    */
};

/*
 *  Compute the inverse of this matrix, and store it in the "inverse" parameter, being
 *  careful to handle the case where 'inverse' might alias this matrix.
 *
 *  If this matrix is invertible, return true. If not, return false, and ignore the
 *  'inverse' parameter.
 */
const invert = (inverse) => {
  /*
    var a = this->mat[0];  
    var b = this->mat[1];  
    var c = this->mat[2];
    var d = this->mat[3];  
    var e = this->mat[4];  
    var f = this->mat[5];

    var det = a*e - b*d;
    if (det <= 0) return false;

    var div = 1/det;
    inverse->mat[0] = e*div;
    inverse->mat[1] = -b * div;
    inverse->mat[2] = -(c*e - b*f) * div;
    inverse->mat[3] = -d * div;
    inverse->mat[4] = a * div;
    inverse->mat[5] = (c*d - a*f) * div;

    return true;

    */
};

/**
 *  Transform the set of points in src, storing the resulting points in dst, by applying this
 *  matrix. It is the caller's responsibility to allocate dst to be at least as large as src.
 *
 *  [ a  b  c ] [ x ]     x' = ax + by + c
 *  [ d  e  f ] [ y ]     y' = dx + ey + f
 *  [ 0  0  1 ] [ 1 ]
 *
 *  Note: It is legal for src and dst to point to the same memory (however, they may not
 *  partially overlap). Thus the following is supported.
 *
 *  GPoint pts[] = { ... };
 *  matrix.mapPoints(pts, pts, count);
 */

/*
void GMatrix::mapPoints(GPoint dst[], const GPoint src[], int count) const {
    for(int i = 0; i <count; i++){
        var dx = this->mat[0]*src[i].fX + this->mat[1]*src[i].fY + this->mat[2];
        var dy = this->mat[3]*src[i].fX + this->mat[4] *src[i].fY +this->mat[5];
  
        dst[i].fX = dx;
        dst[i].fY = dy;

    }

}
*/
