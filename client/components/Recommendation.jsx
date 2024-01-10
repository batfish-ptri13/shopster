import React from 'react';
import Result from './Result.jsx';
import Solution from './Solution.jsx';
import { useSelector } from 'react-redux';

const Recommendation = () => {
  const hasImbalance = useSelector(state => state.results.hasImbalance);

  return (
    <div>
      <Result/>
      {hasImbalance && <Solution/>}
      {hasImbalance && <button>Retake assessment</button>}
    </div>
  )
};

export default Recommendation;