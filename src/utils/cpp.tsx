class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

function compareX(coordA: Point, coordB: Point) {
    return coordA.x - coordB.x;
}

function compareY(coordA: Point, coordB: Point) {
    return coordA.y - coordB.y;
}

function dist(coordA: Point, coordB: Point) {
    var xPower = (coordA.x - coordB.x) * (coordA.x - coordB.x);
    var yPower = (coordA.y - coordB.y) * (coordA.y - coordB.y);

    return Math.sqrt(xPower + yPower);
}

function bruteForce(arr: Array<Point>, n: number) {
    var min = Number.MAX_VALUE;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            var mem = dist(arr[i], arr[j]);
            if (mem < min) min = mem;
        }
    }

    return min;
}

function minValue(x: number, y: number) {
    return x < y ? x : y;
}

function stripClosest(arr: Array<Point>, size: number, d: number) {
    var min = d;

    arr.sort(compareY);

    for (let i = 0; i < size; i++) {
        for (let j = i + 1; j < size && arr[j].y - arr[i].y < min; ++j) {
            var mem = dist(arr[i], arr[j]);
            if (mem < min) min = mem;
        }
    }

    return min;
}

// Precisa adaptar a função para passar o ponto do navio para buscar o menor entre os pontos das bombas.
function closestUtil(arr: Array<Point>, n: number) {
    if (n <= 3) return bruteForce(arr, n);

    var mid = Math.trunc(n / 2);
    var midCoord: Point = arr[mid];

    var leftSide = closestUtil(arr, mid);
    var rightSide = closestUtil(arr.slice(mid), n - mid);

    var d = minValue(leftSide, rightSide);

    var strip = [];
    let j = 0;
    for (let i = 0; i < n; i++) {
        var mem = Math.abs(arr[i].x - midCoord.x);
        if (mem < d) {
            strip.push(arr[i]);
            j++;
        }
    }

    return minValue(d, stripClosest(strip, j, d));
}

// Precisar iterar para encontrar os menores pontos entre navios e bombas e retornar um vetor com esses pontos
function cpp(arr: Array<Point>, n: number) {
    arr.sort(compareX);

    return closestUtil(arr, n);
}

var P: Point[] = [new Point(2, 3), new Point(12, 30), new Point(40, 50), new Point(5, 1), new Point(12, 10), new Point(3, 4), new Point(3, 7)];
console.log("resultado: " + cpp(P, P.length))