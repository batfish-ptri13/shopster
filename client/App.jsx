import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Maze from './components/Maze.jsx';
import ShoppingList from './components/ShoppingList.jsx';
import Nav from './components/Nav.jsx'

// traditional routing:
// const App = () => {
//   return (
//     <ShoppingList/>
//   )
// }

// Single Page Application routing:
const App = () => {
  return (<div>
    <Nav />
    <Router>
      <Routes>



        <Route path='/' element={<ShoppingList />} />
        <Route path='/maze' element={<Maze />} />
      </Routes>
    </Router>
  </div>
  )
};

export default App;