function addCircle(center, radius) {
  const cPoints = new Array();
  cPoints[0] = makePoint(center.x - radius, center.y);
  cPoints[2] = makePoint(center.x, center.y - radius);
  cPoints[4] = makePoint(center.x + radius, center.y);
  cPoints[6] = makePoint(center.x, center.y + radius);

  var unitC = Math.sqrt(2) / 2;

  cPoints[1] = makePoint(center.x + radius * -unitC, center.y + radius * -unitC);
  cPoints[3] = makePoint(center.x + radius * unitC, center.y + radius * -unitC);
  cPoints[5] = makePoint(center.x + radius * unitC, center.y + radius * unitC);
  cPoints[7] = makePoint(center.x + radius * -unitC, center.y + radius * unitC);

  var c0 = [1, 0, -cPoints[0].fX];
  var c2 = [0, 1, -cPoints[2].fY];
  var c4 = [1, 0, -cPoints[4].fX];
  var c6 = [0, 1, -cPoints[6].fY];

  var c1 = [1, 1, -1 * cPoints[1].fX - cPoints[1].fY];
  var c3 = [-1, 1, 1 * cPoints[3].fX - cPoints[3].fY];
  var c5 = [1, 1, -1 * cPoints[5].fX - cPoints[5].fY];
  var c7 = [-1, 1, 1 * cPoints[7].fX - cPoints[7].fY];

  const qPoints = new Array();
  var b0 = c0[0] * c1[1] - c1[0] * c0[1];
  qPoints[0] = makePoint((c0[1] * c1[2] - c1[1] * c0[2]) / b0, (c0[2] * c1[0] - c1[2] * c0[0]) / b0);

  var b1 = c2[0] * c1[1] - c1[0] * c2[1];
  qPoints[1] = makePoint((c2[1] * c1[2] - c1[1] * c2[2]) / b1, (c2[2] * c1[0] - c1[2] * c2[0]) / b1);

  var b2 = c2[0] * c3[1] - c3[0] * c2[1];
  qPoints[2] = makePoint((c2[1] * c3[2] - c3[1] * c2[2]) / b2, (c2[2] * c3[0] - c3[2] * c2[0]) / b2);

  var b3 = c4[0] * c3[1] - c3[0] * c4[1];
  qPoints[3] = makePoint((c4[1] * c3[2] - c3[1] * c4[2]) / b3, (c4[2] * c3[0] - c3[2] * c4[0]) / b3);

  var b4 = c4[0] * c5[1] - c5[0] * c4[1];
  qPoints[4] = makePoint((c4[1] * c5[2] - c5[1] * c4[2]) / b4, (c4[2] * c5[0] - c5[2] * c4[0]) / b4);

  var b5 = c6[0] * c5[1] - c5[0] * c6[1];
  qPoints[5] = makePoint((c6[1] * c5[2] - c5[1] * c6[2]) / b5, (c6[2] * c5[0] - c5[2] * c6[0]) / b5);

  var b6 = c6[0] * c7[1] - c7[0] * c6[1];
  qPoints[6] = makePoint((c6[1] * c7[2] - c7[1] * c6[2]) / b6, (c6[2] * c7[0] - c7[2] * c6[0]) / b6);

  var b7 = c0[0] * c7[1] - c7[0] * c0[1];
  qPoints[7] = makePoint((c0[1] * c7[2] - c7[1] * c0[2]) / b7, (c0[2] * c7[0] - c7[2] * c0[0]) / b7);

  var myCircle = [
    cPoints[0],
    qPoints[0],
    cPoints[1],
    qPoints[1],
    cPoints[2],
    qPoints[2],
    cPoints[3],
    qPoints[3],
    cPoints[4],
    qPoints[4],
    cPoints[5],
    qPoints[5],
    cPoints[6],
    qPoints[6],
    cPoints[7],
    qPoints[7] /*, cPoints[0] */,
  ];

  return myCircle;
}

function addLine(pA, pB, w, cap) {
  var abX = pB.fX - pA.fX;
  var abY = pB.fY - pA.fY;
  var len = Math.sqrt(abX * abX + abY * abY);
  var rad = w / 2;

  var x = (abX * rad) / len;
  var y = (abY * rad) / len;

  var xT = y;
  var yT = -x;

  const ptsButt = new Array();
  ptsButt[0] = makePoint(pA.fX + xT, pA.fY + yT);
  ptsButt[1] = makePoint(pB.fX + xT, pB.fY + yT);
  ptsButt[2] = makePoint(pB.fX - xT, pB.fY - yT);
  ptsButt[3] = makePoint(pA.fX - xT, pA.fY - yT);

  const returner = new Array();
  if (cap == "butt") {
    returner[0] = ptsButt;
    return returner;
  } else if (cap == "round") {
    returner[0] = ptsButt;
    returner[1] = addCircle(makePoint((ptsButt[0].fX + ptsButt[3].fX) / 2, (ptsButt[0].fY + ptsButt[3].fY) / 2), w / 2);
    returner[2] = addCircle(makePoint((ptsButt[1].fX + ptsButt[2].fX) / 2, (ptsButt[1].fY + ptsButt[2].fY) / 2), w / 2);
    return returner;
  } else if (cap == "square") {
    var BX1 = ptsButt[1].fX - ptsButt[2].fX;
    var BY1 = ptsButt[1].fY - ptsButt[2].fY;
    var lenB = Math.sqrt(BX1 * BX1 + BY1 * BY1);
    var xB1 = (BX1 * rad) / lenB;
    var yB1 = (BY1 * rad) / lenB;
    var xBT1 = yB1;
    var yBT1 = -xB1;

    const ptsB1Add = new Array();
    ptsB1Add[0] = makePoint(pA.fX + xT + xBT1, pA.fY + yT + yBT1);
    ptsB1Add[1] = makePoint(pB.fX + xT - xBT1, pB.fY + yT - yBT1);
    ptsB1Add[2] = makePoint(pB.fX - xT - xBT1, pB.fY - yT - yBT1);
    ptsB1Add[3] = makePoint(pA.fX - xT + xBT1, pA.fY - yT + yBT1);

    returner[0] = ptsB1Add;
    return returner;
  }
}
