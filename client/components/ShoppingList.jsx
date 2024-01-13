import React, { useEffect } from 'react';

import Nav from './Nav.jsx';
import ProductEntry from './ProductEntry.jsx';

import { toggleListed, getProducts } from '../slices/shoppingListSlice.js'
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'

import { getAllProducts, submitList } from '../slices/shoppingListSlice.js';




export default function ShoppingList() {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(state => state.shoppingList.products);

  // const userID = useSelector(state=>)



  const groceryList = products.filter(product => product.listed === true).map(product => <ProductEntry name={product.prod_name} id={product.prod_id} toggle={toggle} />);
  const productList = products.filter(product => product.listed === false).map(product => <ProductEntry name={product.prod_name} id={product.prod_id} toggle={toggle} />);

  //gets products and places them in state
  useEffect(() => {

    dispatch(getAllProducts(products));

  }, [])




  function submit() {

    if (groceryList.length === 0) return


    dispatch(submitList({
      user_id: 1,
      productsArr: products.filter(product => product.listed === true)
    }))

    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({

    //     user_id: 1,
    //     productsArr: groceryList

    //   })
    // }

    // fetch('/api/list/submitList', requestObjects)
    //   .then(navigate('/maze'))


  }

  function toggle(id) {
    console.log('id from toggle: ', id)

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

