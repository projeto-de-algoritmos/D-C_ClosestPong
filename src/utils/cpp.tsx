import Ball from "../entities/Ball";

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    setPoint(x: number, y: number) : void{
        this.x = x;
        this.y = y;
    }
}

export class PairPoints {
    pointA: Point;
    pointB: Point;
    distance: number;

    constructor(pointA: Point, pointB: Point, distance: number) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.distance = distance;
    }
}

function compareX(ballA: Ball, ballB: Ball) {
    return ballA.getCoordX() - ballB.getCoordX();
}

function compareY(ballA: Ball, ballB: Ball) {
    return ballA.getCoordY() - ballB.getCoordY();
}

function distance(ballA: Ball, ballB: Ball) {
    var xPower = (ballA.getCoordX() - ballB.getCoordX()) * (ballA.getCoordX() - ballB.getCoordX());
    var yPower = (ballA.getCoordY() - ballB.getCoordY()) * (ballA.getCoordY() - ballB.getCoordY());

    return Math.sqrt(xPower + yPower);
}

function bruteForce(arr: Array<Ball>, n: number) {
    var result = new PairPoints(new Point(0, 0), new Point(0, 0), Number.MAX_VALUE);

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            var mem = distance(arr[i], arr[j]);
            if (mem < result.distance) result.distance = mem; result.pointA.setPoint(arr[i].getCoordX(), arr[i].getCoordY()); result.pointB.setPoint(arr[j].getCoordX(), arr[j].getCoordY());
        }
    }

    return result;
}


function minValue(x: PairPoints, y: PairPoints) {
    return x.distance < y.distance ? x : y;
}

function stripClosest(arr: Array<Ball>, size: number, d: PairPoints) {
    var min = d;

    arr.sort(compareY);

    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size && arr[j].getCoordY() - arr[i].getCoordY() < min.distance; ++j) {
            var mem = distance(arr[i], arr[j]);
            if (mem < min.distance) min.distance = mem; min.pointA.setPoint(arr[i].getCoordX(), arr[i].getCoordY()); min.pointB.setPoint(arr[j].getCoordX(), arr[j].getCoordY());
        }
    }

    return min;
}

function closestUtil(arr: Array<Ball>, n: number) {
    if (n <= 3) return bruteForce(arr, n);

    var mid = Math.trunc(n / 2);
    var midCoord: Point = new Point(arr[mid].getCoordX(), arr[mid].getCoordY());

    var leftSide = closestUtil(arr, mid);
    var rightSide = closestUtil(arr.slice(mid), n - mid);

    var d: PairPoints = minValue((leftSide), (rightSide));

    var strip = [];
    let j = 0;
    for (let i = 0; i < n; i++) {
        var mem = Math.abs(arr[i].getCoordX() - midCoord.x);
        if (mem < d.distance) {
            strip.push(arr[i]);
            j++;
        }
    }

    return minValue(d, stripClosest(strip, j, d));
}

export default function cpp(arr: Array<Ball>, n: number) {
    arr.sort(compareX);

    return closestUtil(arr, n)
}
