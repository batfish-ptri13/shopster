const db = require('../models/shopsterModels.js');

// define function generating an error obj for global error handling here:


const mazeController = {};

mazeController.findPath = (req, res, next) => {
  const store = {
    storeName: 'Target 1st North Street',
    layout: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
      [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1],
      [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1],
      [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    entrance: [16, 3]
  };

  const shoppingList = res.locals.shoppingList;

  // Step1. Prepare data
  // layoutForUI stores data in the form of [ [ {} ] ] instead of 0/1
  const layoutForUI = store.layout.map(arr => {
    return arr.map(el => {
      return {type: el};
    });
  });

  // transformedLayout and locationProductMap are for path searching algo
  const transformedLayout = JSON.parse(JSON.stringify(store.layout));
  const locationProductMap = {};

  for (let product of shoppingList) {
  const y = product.prod_location_y;
  const x = product.prod_location_x;
  // check product's coordinates in store and update layout to reflect the product
  transformedLayout[y][x] = 2;
  // prepare lookup data in format: { 'y-x':['milk] } - algo will check what product it found when comes across 2 on the layout
  if (!locationProductMap[`${y}-${x}`]) locationProductMap[`${y}-${x}`] = [];
  locationProductMap[`${y}-${x}`].push(product.prod_name);
  // update layoutForUI with products from shoppingList
  layoutForUI[y][x] = {
    type: 2,
    ...product
  }
  };

  // Step2. Find the path
  const stack = [];
  stack.push(store.entrance);

  const cart = [];
  const visitedLocations = new Set();

  while (stack.length) {
  const curPos = stack.pop();

  const y = curPos[0];
  const x = curPos[1];

  visitedLocations.add(`${y}-${x}`);

  // look around:
  // look left
  if (transformedLayout[y][x - 1] !== undefined) {
    if (transformedLayout[y][x - 1] === 2) {
      // if found 2, check what product we found and add the product(s) to cart
      const shelfProducts = locationProductMap[`${y}-${x - 1}`];
      shelfProducts.forEach(product => cart.push(product));
      // if found 0, add to stack (but make sure this is the position we already visited)
    } else if (transformedLayout[y][x - 1] === 0) {
      if (!visitedLocations.has(`${y}-${x - 1}`)) stack.push([y, x - 1]);
    }
  };

  // look right
  if (transformedLayout[y][x + 1] !== undefined) {
    if (transformedLayout[y][x + 1] === 2) {
      const shelfProducts = locationProductMap[`${y}-${x + 1}`];
      shelfProducts.forEach(product => cart.push(product));
    } else if (transformedLayout[y][x + 1] === 0) {
      if (!visitedLocations.has(`${y}-${x + 1}`)) stack.push([y, x + 1]);
    }
  };

  // look up
  if (transformedLayout[y - 1] !== undefined) {
    if (transformedLayout[y - 1][x] === 2) {
      const shelfProducts = locationProductMap[`${y - 1}-${x}`];
      shelfProducts.forEach(product => cart.push(product));
    } else if (transformedLayout[y - 1][x] === 0) {
      if (!visitedLocations.has(`${y - 1}-${x}`)) stack.push([y - 1, x]);
    }
  };

  // look down
  if (transformedLayout[y + 1] !== undefined) {
    if (transformedLayout[y + 1][x] === 2) {
      const shelfProducts = locationProductMap[`${y + 1}-${x}`];
      shelfProducts.forEach(product => cart.push(product));
    } else if (transformedLayout[y + 1][x] === 0) {
      if (!visitedLocations.has(`${y + 1}-${x}`)) stack.push([y + 1, x]);
    }
  };

  // check if all products have been found. If so, return the path
  if (cart.length === shoppingList.length) break;
  };

  // update path as 3 on layoutForUI
  visitedLocations.forEach(location => {
  const y = location.split('-')[0];
  const x = location.split('-')[1];
  layoutForUI[y][x].type = 3;
  });

  res.locals.layoutWithProductsAndPath = layoutForUI;
  next();
};

module.exports = mazeController;