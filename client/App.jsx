import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Maze from './components/Maze.jsx';
import ShoppingList from './components/ShoppingList.jsx';
import Nav from './components/Nav.jsx';
import Login from './components/auth/Login.jsx';
import SignUp from './components/auth/SignUp.jsx';
import AuthLayout from './components/auth/AuthLayout.jsx';
import UandP from './components/auth/UandP.jsx';
import MagicLink from './components/auth/MagicLink.jsx';
import Text from './components/auth/Text.jsx';
import TextCode from './components/auth/TextCode.jsx';
import CreatePassword from './components/auth/CreatePassword.jsx';

// traditional routing:
// const App = () => {
//   return (
//     <ShoppingList/>
//   )
// }

// Single Page Application routing:
const App = () => {
  return (<div>
    <Router>
      <Routes>
        <Route path='/' element={<ShoppingList />} />
        <Route path='/maze' element={<Maze />} />
        <Route element={<AuthLayout/>}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/uandp' element={<UandP />} />
          <Route path='/magiclink' element={<MagicLink/>} />
          <Route path='/text' element={<Text />} />
          <Route path='/textcode' element={<TextCode />} />
          <Route path='/createpassword' element={<CreatePassword />} />


        </Route>
      </Routes>
    </Router>
  </div>
  );
};

export default App;