import Ball from "./Ball";

export default class Board {
    balls: Ball[];
    row_size: number;
    column_size: number;

    constructor(qtd: number, row_size: number, column_size: number) {
        this.balls = new Array(qtd);
        this.row_size = row_size;
        this.column_size = column_size;

        for (var aux = 0; aux < this.balls.length; aux++) {
            this.balls[aux] = new Ball(this.generateRandomX(), this.generateRandomY(), this.generateRandomDelta(), this.generateRandomDelta());
        }
    }

    setContext(canvasContext: CanvasRenderingContext2D) {
        this.balls.forEach(ball => {
            ball.setContext(canvasContext)
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
    }
}