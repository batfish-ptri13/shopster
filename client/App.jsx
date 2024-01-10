import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Questionnaire from './components/Questionnaire.jsx';
import Recommendation from './components/Recommendation.jsx';

// const App = () => {
//   return (
//     <Questionnaire/>
//   )
// }

// const App = () => {
//   return (
//     <Recommendation/>
//   )
// }

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Questionnaire/>} />
        <Route path='/recommendation' element={<Recommendation/>} />
      </Routes>
    </Router>
  )
};

export default App;