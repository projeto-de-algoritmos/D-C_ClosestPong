import cpp, { PairPoints } from "../utils/cpp";
import Ball from "./Ball";

export default class Board {
    balls: Ball[];
    qtd: number;
    row_size: number;
    column_size: number;
    canvasContext?: CanvasRenderingContext2D;
    closestBalls?: PairPoints;


    constructor(qtd: number, row_size: number, column_size: number) {
        this.qtd = qtd;
        this.balls = new Array(this.qtd);
        this.row_size = row_size;
        this.column_size = column_size;

        for (var aux = 0; aux < this.balls.length; aux++) {
            this.balls[aux] = new Ball(this.generateRandomX(), this.generateRandomY(), this.generateRandomDelta(), this.generateRandomDelta());
        }
    }

    setContext(canvasContext: CanvasRenderingContext2D) {
        this.canvasContext = canvasContext;

        this.balls.forEach(ball => {
            ball.setContext(this.canvasContext)
            ball.draw();
        });
    }

    generateRandomX() { return Math.floor(Math.random() * (this.row_size + 1)); }

    generateRandomY() { return Math.floor(Math.random() * (this.column_size + 1)); }

    generateRandomDelta() {
        const MIN_MOVE = 5;
        const EXTRA_MOVE = Math.round((Math.random() * 10) % 5)
        const DIRECTION = (Math.random() * 10 % 2 > 1) ? 1 : -1

        return (MIN_MOVE + EXTRA_MOVE) * DIRECTION;
    }

    touchingHorizontallyBorder(posX: number) { return (posX <= 0) || (posX >= this.row_size) }

    touchingVerticallyBorder(posY: number) { return (posY <= 0) || (posY >= this.column_size) }

    drawClosest(color: string): void {
        this.canvasContext.fillStyle = color;
        this.canvasContext.beginPath()
        this.canvasContext.arc(this.closestBalls.pointA.x, this.closestBalls.pointA.y, 7, 0, Math.PI * 2, false);
        this.canvasContext.closePath()
        this.canvasContext.fill()

        this.canvasContext.fillStyle = color;
        this.canvasContext.beginPath()
        this.canvasContext.arc(this.closestBalls.pointB.x, this.closestBalls.pointB.y, 7, 0, Math.PI * 2, false);
        this.canvasContext.closePath()
        this.canvasContext.fill()
    }

    moveBalls(): void {
        this.balls.forEach(ball => {
            const newCoordX = ball.getCoordX() + ball.getDeltaX();
            const newCoordY = ball.getCoordY() + ball.getDeltaY();
            let newDeltaX = ball.getDeltaX();
            let newDeltaY = ball.getDeltaY();

            if (this.touchingHorizontallyBorder(newCoordX)) {
                newDeltaX *= (-1);
            }

            if (this.touchingVerticallyBorder(newCoordY)) {
                newDeltaY *= (-1);
            }

            ball.move(newCoordX, newCoordY);
            ball.setCoord(newCoordX, newCoordY);
            ball.setDelta(newDeltaX, newDeltaY);
        })

        if (this.closestBalls)
            this.drawClosest("black");
        this.closestBalls = cpp(this.balls, this.qtd);
        this.drawClosest("red");
        // console.log('resultado:')
        // console.log('pointA: ' + closestBalls.pointA.x + ', ' + closestBalls.pointA.y)
        // console.log('pointB: ' + closestBalls.pointB.x + ', ' + closestBalls.pointB.y)
        // console.log("distance: " + closestBalls.distance)

    }
}