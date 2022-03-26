import React from 'react';
import Map from '../components/map/index'
import Board from '../entities/Board';
import Menu from '../components/menu/index';
import './App.css';

const QTD_BALLS = 20;
const ROW_SIZE = 1024;
const COL_SIZE = 780;
const board: Board = new Board(QTD_BALLS, ROW_SIZE, COL_SIZE);
let context: CanvasRenderingContext2D;

const App = () => {
  const [gameSpeedMs, setGameSpeedMs] = React.useState(50);
  const [qtdBalls, setQtdBalls] = React.useState(20);
  const [playGame, setPlayGame] = React.useState(true);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current
    context = canvas.getContext('2d')
    board.setContext(context);
  }, [])

  React.useEffect(() => {
    console.log(playGame);
    const interval = setInterval(() => {
      if(playGame)
        board.moveBalls();
    }, gameSpeedMs);

    return () => clearInterval(interval);
  }, [gameSpeedMs, playGame]);

  React.useEffect(() => {
    board.changeBallQtd(qtdBalls);
  }, [qtdBalls])

  return (
    <div className="App">
      <div id='Map'>
        <Map ref={canvasRef} width={ROW_SIZE} height={COL_SIZE} />
      </div>
      <div id='Menu'>
        <Menu setGameSpeedMs={(val) => setGameSpeedMs(val)}
          setQtdBalls={(val) => setQtdBalls(val)}
          setPlayGame={(val) => {setPlayGame(val)}} />
      </div>
    </div>
  );
}


export default App;
