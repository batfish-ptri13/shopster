/*
  type of component: presentational/container
  what it does: xxx
*/

import React from 'react';
import ProductEntry from './ProductEntry.jsx';
import { useDispatch, useSelector } from 'react-redux'
import Nav from './Nav.jsx';

// const dispatch = useDispatch()
// const products = useSelector(state => state.shoppingList.products)







export default function ShoppingList() {


  // useEffect({
  // create fetch request to get all products from inventory
  // .then( dispatch )

  // })




  return (
    <>
      <Nav/>
      < div className='shoppingListContainer' >


        <h1>Shopping List</h1>


        <div id='shoppingGrid'>

<<<<<<< HEAD
        <div id='shoppingLeft'>
          <h3>Store Inventory:</h3>
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
=======
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
>>>>>>> dev


          </div>
          <div id='shoppingRight'>


          </div>
        </div>
<<<<<<< HEAD
        <div id='shoppingRight'>
          <h3>Grocery List</h3>
=======
        <button>Submit</button>
>>>>>>> dev


      </div >
    </>
  )
};

