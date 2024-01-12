/*
  type of component: presentational/container
  what it does: xxx
*/

import React, { useRef, useEffect } from 'react';
import Nav from './Nav.jsx';
import Square from './Square.jsx'
import Row from './Row.jsx'

const Maze = () => {
  // const canvasRef = useRef(null);
  // const layout = [
  //     [1, 0, 0, 0, 0],
  //     [1, 0, 1, 1, 0],
  //     [1, 0, 1, 1, 0],
  //     [1, 0, 1, 1, 0]
  // ];
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

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext('2d');
  //   const tileSize = 50; // Adjust size as needed

  //   for (let row = 0; row < layout.length; row++) {
  //     for (let col = 0; col < layout[row].length; col++) {
  //       if (layout[row][col] === 1) {
  //         ctx.fillStyle = 'brown'; // Shelf color
  //         ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
  //       } else {
  //         ctx.fillStyle = 'lightgrey'; // Aisle color
  //         ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
  //       }    
  //     }
  //   }

  // }, []);



  const render = layout.map((row, index) => {
    return (
      <Row row={row} />

    )
  })

  // const render = layout.map((row, rowIdx) => {
  //   return (
  //     <Row key={rowIdx}>
  //       {row.map((cell, cellIdx) => {
  //         return (
  //           <Square key={cellIdx}/>
  //         )
  //       })}
  //     </Row>
  //   )
  // })

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