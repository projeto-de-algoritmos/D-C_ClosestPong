import { useRef, useEffect } from 'react';
import Map from '../components/map/Map'
import Board from '../entities/Board';
import './App.css';

const GAME_SPEED_MS = 50;
const QTD_BALLS = 20;
const ROW_SIZE = 1024;
const COL_SIZE = 780;
const board: Board = new Board(QTD_BALLS, ROW_SIZE, COL_SIZE);
let context: CanvasRenderingContext2D;

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)


  useEffect(() => {
    const canvas = canvasRef.current
    context = canvas.getContext('2d')
    board.setContext(context);
  }, [])

  useEffect(() => {
    setInterval(() => {
      
      board.moveBalls();
    }, GAME_SPEED_MS);
  }, []);


  return (
    <div className="App">
      <Map ref={canvasRef} width={ROW_SIZE} height={COL_SIZE} />
    </div>
  );
}


export default App;
