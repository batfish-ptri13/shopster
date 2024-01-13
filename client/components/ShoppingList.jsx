import React, { useEffect } from 'react';

import Nav from './Nav.jsx';
import ProductEntry from './ProductEntry.jsx';

import { toggleListed, getProducts } from '../slices/shoppingListSlice.js'
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'




export default function ShoppingList() {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(state => state.shoppingList.products);

  // const userID = useSelector(state=>)

  const groceryList = products.filter(product => product.listed === true).map(product => <ProductEntry name={product.prod_name} id={product.prod_id} toggle={toggle} />);
  const productList = products.filter(product => product.listed === false).map(product => <ProductEntry name={product.prod_name} id={product.prod_id} toggle={toggle} />);

  //gets products and places them in state
  // useEffect(() => {

  //   fetch('/api/list/getAllProd')
  //     .then(res => res.json())
  //     .then(data => dispatch(getProducts(data)))


  // }, [])




  function submit() {

    if (groceryList.length === 0) return

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        user_id: userID,
        groceryList: groceryList

      })
    }

    fetch('/api/list/submitList', requestObjects)
      .then(navigate('/maze'))


  }

  function toggle(id) {
    dispatch(toggleListed(id))
  }




  return (
    <>
      <Nav />
      < div className='shoppingListContainer' >
        <div id='shoppingGrid'>
          <div className='shoppingHeader'>
            <h2>PRODUCTS</h2>
            <div id='shoppingLeft'>
              {productList}
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
              { }
            </div>
          </div>
          <div className='shoppingHeader'>
            <h2>GROCERY LIST</h2>
            <div id='shoppingRight'>
              {groceryList}
            </div>
          </div>
        </div>

        <button onClick={submit}>Submit</button>

      </div >
    </>
  )
};

