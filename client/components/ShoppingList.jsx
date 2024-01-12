import React from 'react';

import Nav from './Nav.jsx';
import ProductEntry from './ProductEntry.jsx';

import { toggleListed, getProducts } from '../slices/shoppingListSlice.js'

import { useDispatch, useSelector } from 'react-redux'









export default function ShoppingList() {

  const dispatch = useDispatch()
  const products = useSelector(state => state.shoppingList.products)


  function submit() {

  }

  function toggle(id) {
    dispatch(toggleListed(id))
  }


  const groceryList = products.filter(product => product.listed === true).map(product => <ProductEntry name={product.prod_name} id={product.prod_id} toggle={toggle} />)
  const productList = products.filter(product => product.listed === false).map(product => <ProductEntry name={product.prod_name} id={product.prod_id} toggle={toggle} />)




  return (
    <>
      <Nav />
      < div className='shoppingListContainer' >
        <div id='shoppingGrid'>
          <div className='shoppingHeader'>
            <h2>PRODUCTS</h2>
            <div id='shoppingLeft'>
              <ProductEntry name='Rice' id={1} toggle={toggle} />
              <ProductEntry name='Chicken' />
              <ProductEntry name='Tomato' />
              <ProductEntry name='Red Pepper' />
              <ProductEntry name='Green Pepper' />
              <ProductEntry name='Onion' />
              <ProductEntry name='Ketchup' />
              <ProductEntry name='Mustard' />
              <ProductEntry name='Tomato Soup' />
              <ProductEntry name='Taco Seasoning' />
              <ProductEntry name='Tortilla Chips' />
              <ProductEntry name='Pringles' />
              <ProductEntry name='Marshmellows' />
              <ProductEntry name='Pop Tarts' />
              <ProductEntry name='String Cheese' />
            </div>
          </div>
          <div className='shoppingHeader'>
            <h2>GROCERY LIST</h2>
            <div id='shoppingRight'>
            </div>
          </div>
        </div>

        <button onClick={submit}>Submit</button>

      </div >
    </>
  )
};

