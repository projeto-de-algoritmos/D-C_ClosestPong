interface Coord {
    x: number;
    y: number;
}

export default class Ball {
    coordX: number;
    coordY: number;
    canvasContext?: CanvasRenderingContext2D;

    constructor(coordX: number, coordY: number) {
        this.coordX = coordX;
        this.coordY = coordY;
    }

    setContext(canvasContext: CanvasRenderingContext2D): void {
        this.canvasContext = canvasContext;
    }

    setCoord(x: number, y: number): void {
        this.coordX = x;
        this.coordY = y;
    }

    getCoord(): Coord {
        return {x: this.coordX, y: this.coordY};
    }

    draw(): void {
        this.canvasContext.fillStyle = "red";
        this.canvasContext.beginPath()
        this.canvasContext.arc(this.coordX, this.coordY, 7, 0, Math.PI*2, false);
        this.canvasContext.closePath()
        this.canvasContext.fill()
    }

    erase(): void {
        this.canvasContext.fillStyle = "black";
        this.canvasContext.fillRect(this.coordX, this.coordY, 10, 10);
    }
}