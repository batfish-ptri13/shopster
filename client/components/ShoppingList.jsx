/*
  type of component: presentational/container
  what it does: xxx
*/

import React from 'react';
import IngredientEntry from './IngredientEntry.jsx';

// useEffect({
// create fetch request to get all products from inventory

// })




const ShoppingList = () => (
  <div className='shoppingListContainer'>

    <h1>Shopping List component</h1>
    <IngredientEntry number={0} />
    <IngredientEntry number={1} />
    <IngredientEntry number={2} />
    <IngredientEntry number={3} />
  </div>
);

export default ShoppingList;