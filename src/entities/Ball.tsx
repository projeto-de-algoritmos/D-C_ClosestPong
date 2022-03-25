export default class Ball {
    coordX: number;
    coordY: number;
    deltaX: number;
    deltaY: number;
    canvasContext?: CanvasRenderingContext2D;

    constructor(coordX: number, coordY: number, deltaX: number, deltaY: number) {
        this.coordX = coordX;
        this.coordY = coordY;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    setContext(canvasContext: CanvasRenderingContext2D): void {
        this.canvasContext = canvasContext;
    }

    getContext(): CanvasRenderingContext2D {
        return this.canvasContext ? this.canvasContext : null;
    }

    setCoord(x: number, y: number): void {
        this.coordX = x;
        this.coordY = y;
    }

    getCoordX(): number {
        return this.coordX;
    }

    getCoordY(): number {
        return this.coordY;
    }

    setDelta(x: number, y: number): void {
        this.deltaX = x;
        this.deltaY = y;
    }

    getDeltaX(): number {
        return this.deltaX;
    }

    getDeltaY(): number {
        return this.deltaY;
    }

    draw(): void {
        this.canvasContext.fillStyle = "white";
        this.canvasContext.beginPath()
        this.canvasContext.arc(this.coordX, this.coordY, 7, 0, Math.PI * 2, false);
        this.canvasContext.closePath()
        this.canvasContext.fill()
    }

    erase(): void {
        this.canvasContext.fillStyle = "black";
        this.canvasContext.beginPath()
        this.canvasContext.arc(this.coordX, this.coordY, 8, 0, Math.PI * 2, false);
        this.canvasContext.closePath()
        this.canvasContext.fill()
    }

    move(x: number, y: number): void {
        this.erase()
        this.setCoord(x, y)
        this.draw()
    }
}