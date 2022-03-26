import React from 'react';
import './index.css';

const Menu = ((props: any) => {
    const [playState, setPlayState] = React.useState('Pause')

    const identifyPlayPause = () => {
        props.setPlayGame(playState === 'Play');
        setPlayState(playState === 'Play' ? 'Pause': 'Play');
    }

    const handleSpeedChange = (event: any) => {
        props.setGameSpeedMs(parseInt(event.target.value));
    }

    const handleQtdChange = (event: any) => {
        props.setQtdBalls(parseInt(event.target.value));
    }

    return (
        <div className="base">
            <button className='button' onClick={identifyPlayPause}>{playState}</button>
            <span className="options" onChange={handleSpeedChange}>
                <h2>Velocidade</h2>
                    <input type="radio" name="speed" value={80} id="devagar" />
                    <label htmlFor="devagar">Devagar</label><br />
                    <input type="radio" name="speed" value={50} id="normal" defaultChecked/>
                    <label htmlFor="normal">Normal</label><br />
                    <input type="radio" name="speed" value={30} id="rapido" />
                    <label htmlFor="rapido">Rápido</label><br />
            </span>
            <span className="options" id="bolinhas" onChange={handleQtdChange}>
                <h2>Bolinhas</h2>
                <input type="radio" name="qtd" value={20} id="20" defaultChecked/>
                <label htmlFor="20">20</label><br />
                <input type="radio" name="qtd" value={30} id="30" />
                <label htmlFor="30">30</label><br />
                <input type="radio" name="qtd" value={40} id="40" />
                <label htmlFor="40">40</label><br />
            </span>
        </div>
    );
});

export default Menu;