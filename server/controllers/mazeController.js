const { create } = require('@stylexjs/stylex');
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

  console.log('shopping list--> ', shoppingList);

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

  console.log(layoutForUI);

  res.locals.layoutWithProductsAndPath = layoutForUI;
  next();
};











mazeController.findPathAStar = (req, res, next) => {

  const entrance = [16,3];

  const shoppingList = {
    "user_id": 1,
    "productsArr": [
        {
            "prod_id": 23,
            "prod_name": "beans",
            "prod_price": "$2.00",
            "prod_location_x": 12,
            "prod_location_y": 4,
            "listed": true
        },
        {
          "prod_id": 23,
          "prod_name": "beans",
          "prod_price": "$2.00",
          "prod_location_x": 16,
          "prod_location_y": 3,
          "listed": true
        },
        {
          "prod_id": 23,
          "prod_name": "beans",
          "prod_price": "$2.00",
          "prod_location_x": 1,
          "prod_location_y": 11,
          "listed": true
      }
    ]
}

  // create the layout
  const layout = [
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
  ];

  const target = [shoppingList.productsArr[0].prod_location_y, shoppingList.productsArr[0].prod_location_x];


  // copy the shopping list

  // create variable for current node, set to entrance
  // create variable for list of paths
  // create variable for next node
  // create variable for shortest path
  // create variable for length of path, set to infinity

  // while the list has elements

  // for loop iterate over the list
  // 
  // find astar from current to node at i
  // check length
  // if shorter than shortest
  // set new shortest
  // set next as node at i

  // outside the for loop
  // push shortest path
  // set current as next
  // remove next from list



  layout[target[0]][target[1]] = 2;

  // find the neighbors of a given node
  const getNeightbors = (graph, node) => {
    const neighbors = [];
    const directions = [[-1, 0], [0, -1], [1, 0], [0, 1]];

    for (const [dx, dy] of directions) {
      const x = node.x + dx;
      const y = node.y + dy;

      // console.log('coords--->', [y,x])
      // console.log('contents of neighbor--->', graph[y][x]);
  
      // if the neighbor is within the bounds of the layout, 
      // will have to check the logic that ignores shelf
      if (x >= 0 && x < graph[0].length - 1 && y >= 0 && y < graph.length - 1) {

        // if the neighbor is not a shelf
        if(graph[y][x] === 0 || graph[y][x] === 2) {
          // then add it to the list of neighbors
          neighbors.push({ x, y, cost: 1 });
        }

      }
      
    }
    return neighbors;  
  }

  // find the f score of a given node
  const heuristic = (node, target) => {
    //console.log(Math.sqrt(Math.pow(node.x - target[0], 2) + Math.pow(node.y - target[1], 2)));
    // euclidean distance heuristic aka, hypoteneuse of a right triangle
    return Math.sqrt(Math.pow(node[0] - target[0], 2) + Math.pow(node[1] - target[1], 2));
  }


  // reconstruct the pathway after it's been found
  const reconstructPath = (node) => {
    const path = [];
    console.log('reconstruct-->', node);
    while (node) {
      path.unshift([node.x, node.y]);
      node = node.parent;
    }
    return path;
  }

  // create nodes to track the algos progress
  class Node {
    constructor(y, x, heuristic, parent) {
      this.y = y;
      this.x = x;
      this.cost = 1;
      this.heuristic = heuristic;
      // heuristic = the node's f score
      this.totalCost = 1 + heuristic;
      this.parent = parent;
    }
  }

  const aStar = (graph, start, target) => {

    // begin with the entrance as the first in the 'openSet'
    const openSet = [new Node(entrance[0], entrance[1], heuristic(start, [target[1], target[0]]))];
    const closedSet = [];
    
    //while there are nodes in the open set
    while(openSet.length > 0) {
      
      // g score = how far a node is from the start
      // h score = the euclidean distance to the end
      // f score = g + h = totalCost
      // set the current node to the one in the open set with the lowest f score
      const current = openSet.reduce((minNode, node) => (node.totalCost < minNode.totalCost ? node : minNode), openSet[0]);
      
      
      // remove current node from the open set
      openSet.splice(openSet.indexOf(current), 1);

      // console.log('CURRENT-->', current);
      // console.log('OPEN SET -->', openSet);

      // check if the current node is the target
      if(current.x === target[1] && current.y === target[0]) {
        console.log('TARGET FOUND!!');
        return reconstructPath(current);
      }

      // add current to the closed set
      closedSet.push(current);

      // get the neighboring nodes
      const neighbors = getNeightbors(graph, current);

      // console.log('NEIGHBORS-->', neighbors);

      // iterate over the neighbors and find the one with the lowest totalCost (f score)
      for(const neighbor of neighbors) {

        // skip any nodes in the closed set
        if(closedSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
          continue;
        }

        //calculate the tentative cost from start to this neighbor
        const tentativeCost = current.cost + neighbor.cost;

        // check that the neighbor is not in the open set
        // if it is, set it to openNode
        const openNode = openSet.find( node => node.x === neighbor.x && node.y === neighbor.y);

        // also check if the neighbor has a lower tentative cost
        if(!openNode || tentativeCost < openNode.cost) {

          
          // if !openNode, then add this neighbor to the openSet
          if(!openNode) {
            console.log('neighbor added -->', neighbor, graph[neighbor.y][neighbor.x]);
            openSet.push(new Node(neighbor.y, neighbor.x, heuristic([neighbor.x, neighbor.y], target), current))
          } else {
            // else, set the openNode's cost as the tentative cost
            // and the total cost as the tentative cost + this neighbor's heuristic
            openNode.cost = tentativeCost;
            openNode.totalCost = tentativeCost + openNode.heuristic

          }
          
        }
      }

    }


      console.log('start--->', start, target);

      // no path exists
    return null;

  }


  console.log('the A START -------------------');
  const aStarPath = aStar(layout, entrance, target);
  console.log(aStarPath);
  console.log('entrance---> ', entrance, target);
  console.log('the A END -------------------');

  res.locals.aStarPath = aStarPath;
  res.locals.layout = layout;

  next();


}

module.exports = mazeController;