/*
  type of component: presentational/container
  what it does: xxx
*/

import React from 'react';
import ProductEntry from './ProductEntry.jsx';
import { useDispatch, useSelector } from 'react-redux'

// const dispatch = useDispatch()
// const products = useSelector(state => state.shoppingList.products)







export default function ShoppingList() {


  // useEffect({
  // create fetch request to get all products from inventory
  // .then( dispatch )

  // })




  return (
    < div className='shoppingListContainer' >


      <h1>Shopping List</h1>


      <div id='shoppingGrid'>

        <div id='shoppingLeft'>
          <ProductEntry item='Rice' />
          <ProductEntry item='Chicken' />
          <ProductEntry item='Tomato' />
          <ProductEntry item='Red Pepper' />
          <ProductEntry item='Green Pepper' />
          <ProductEntry item='Onion' />
          <ProductEntry item='Ketchup' />
          <ProductEntry item='Mustard' />
          <ProductEntry item='Tomato Soup' />
          <ProductEntry item='Taco Seasoning' />
          <ProductEntry item='Tortilla Chips' />
          <ProductEntry item='Pringles' />
          <ProductEntry item='Marshmellows' />
          <ProductEntry item='Pop Tarts' />
          <ProductEntry item='String Cheese' />


        </div>
        <div id='shoppingRight'>


        </div>
      </div>
      <button>Submit</button>


    </div >
  )
};

