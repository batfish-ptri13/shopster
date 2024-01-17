import React, { useEffect } from 'react';

import Nav from './Nav.jsx';
import ProductEntry from './ProductEntry.jsx';

import { toggleListed, getProducts } from '../slices/shoppingListSlice.js'
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux'

import { getAllProducts } from '../slices/shoppingListSlice.js';
import { submitList } from '../slices/mazeSlice.js';




export default function ShoppingList() {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  let products = useSelector(state => state.shoppingList.products);

  // const userID = useSelector(state=>)

  // console.log('sorted: ', products.length > 0 && products.sort((a, b) => {
  //   if (a.prod_name > b.prod_name) return 1
  //   if (a.prod_name < b.prod_name) return -1
  //   return 0
  // }))



  const groceryList = products.filter(product => product.listed === true).map(product => <ProductEntry name={product.prod_name} id={product.prod_id} toggle={toggle} listed={product.listed} />);
  const productList = products.filter(product => product.listed === false).map(product => <ProductEntry name={product.prod_name} id={product.prod_id} toggle={toggle} listed={product.listed} />);

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

    navigate('/maze')




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
            <h2>GROCERY</h2>
            <div id='shoppingRight'>
              {groceryList.length > 0 ? groceryList : <div id='instructions'>Select Items From Product List</div>}
            </div>
          </div>
        </div>

        <button onClick={submit}>SHOP</button>

      </div >
    </>
  )
};

