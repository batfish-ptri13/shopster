/*
  type of component: presentational/container
  what it does: xxx
*/

import React, { useRef, useEffect } from 'react';
import Nav from './Nav.jsx';
import Square from './Square.jsx'
import Row from './Row.jsx'

const Maze = () => {
  
  const layout = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  

  const render = layout.map((row, index) => {
    return (
      <Row row={row} />

    )
  })

  

  return (
    <div>
      <Nav />
      <div className='mazeContainer'>

        <div className='mazeOutline'>
          {render}


        </div>



        {/* <h1>Maze component</h1>
      <canvas ref={canvasRef} width="1000" height="550" id="storeLayoutCanvas"/> */}
      </div>
    </div>
  )
};

export default Maze;