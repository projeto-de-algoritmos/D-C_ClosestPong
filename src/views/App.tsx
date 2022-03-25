import React, { useRef, useEffect } from 'react';
import Map from '../components/map/Map'
import Ball from '../entities/Ball'
import './App.css';

const GAME_SPEED_MS = 100;
const ROW_SIZE = 1024;
const COL_SIZE = 780;

const generateRandomX = () => { return Math.floor(Math.random() * (ROW_SIZE + 1)); }
const generateRandomY = () => { return Math.floor(Math.random() * (COL_SIZE + 1)); }

const InitialState = {
  ballX: generateRandomX(),
  ballY: generateRandomY(),
  deltaY: -10,
  deltaX: -10,
}


const App = () => {

  const [map, setMap] = React.useState(InitialState);
  const [time, setTime] = React.useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bola: Ball = new Ball(map.ballX, map.ballY);;

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    bola.setContext(context);
    bola.draw();
    console.log("x: " + map.ballX + " y: " + map.ballY)
  }, [time])

  useEffect(() => {
    const interval = setInterval(() => {
      setMap(collisionBall());
      // console.log("bola x: " + bola.getCoord.x + " bola y: " + bola.getCoord.y)
      setTime(time => time + 1);
    }, GAME_SPEED_MS);
    return () => clearInterval(interval);
  }, [map]);
  
  // useEffect(() => {
  //   if(bola){
  //     // bola.erase()
  //     bola.setCoord(map.ballX, map.ballY);
  //     bola.draw()

  //     // collisionBall();

  //   }
  // }, [map])



  const touchingHorizontallyBorder = (posX: number) => ((posX <= 0 ) || (posX >= ROW_SIZE ))
  const touchingVerticallyBorder = ( posY: number) => ((posY <= 0) || (posY >= COL_SIZE))
  const touchingDiagonalBorder = (posX: number, posY: number) => ((posX <= 0 && posY <= 0) || (posX <= 0 && posY >= COL_SIZE) || (posX >= ROW_SIZE && posY <= 0) || (posX >= ROW_SIZE && posY >= COL_SIZE))

  const collisionBall = () => {
    const newStateX = map.ballX + map.deltaX;
    const newStateY = map.ballY + map.deltaY;
    let newDeltaX = map.deltaX;
    let newDeltaY = map.deltaY;


    if (touchingHorizontallyBorder(newStateX)) {
      newDeltaX *= (-1);
    }

    if (touchingVerticallyBorder(newStateY)) {
      newDeltaY *= (-1);
    }

    if(touchingDiagonalBorder(newStateX, newStateY)){
      newDeltaY *= (-1);
      newDeltaX *= (-1);
    }

    const newMap = {
      ballX: newStateX,
      ballY: newStateY,
      deltaX: newDeltaX,
      deltaY: newDeltaY
    }


    // setMap({...map, newMap});
    return newMap;
  }

  return (
    <div className="App">
      <Map ref={canvasRef} />
    </div>
  );
}


export default App;
