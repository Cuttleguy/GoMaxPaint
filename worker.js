// Function to perform flood fill on a chunk of the canvas
function floodFillChunk(startX, startY, colorToFill, colorToBeFilled, pgData, width, height) {
  let stack = [];
  let toReturn = [];
  let visited = new Set();

  stack.push({ x: startX, y: startY });
  visited.add(`${startX},${startY}`);

  while (stack.length > 0) {
      let { x, y } = stack.pop();
      toReturn.push({ x, y });
      pgData.set(x, y, colorToFill);

      // Check and push adjacent pixels onto the stack if they need filling
      // Right
      if (x + 1 < width && !visited.has(`${x + 1},${y}`) && arrayEquals(pgData.get(x + 1, y), colorToBeFilled)) {
          stack.push({ x: x + 1, y });
          visited.add(`${x + 1},${y}`);
      }
      // Left
      if (x - 1 >= 0 && !visited.has(`${x - 1},${y}`) && arrayEquals(pgData.get(x - 1, y), colorToBeFilled)) {
          stack.push({ x: x - 1, y });
          visited.add(`${x - 1},${y}`);
      }
      // Down
      if (y + 1 < height && !visited.has(`${x},${y + 1}`) && arrayEquals(pgData.get(x, y + 1), colorToBeFilled)) {
          stack.push({ x, y: y + 1 });
          visited.add(`${x},${y + 1}`);
      }
      // Up
      if (y - 1 >= 0 && !visited.has(`${x},${y - 1}`) && arrayEquals(pgData.get(x, y - 1), colorToBeFilled)) {
          stack.push({ x, y: y - 1 });
          visited.add(`${x},${y - 1}`);
      }
  }

  return toReturn;
}

// Listen for messages from the main thread
self.addEventListener('message', function(e) {
  // e.data should contain the parameters needed for flood fill
  let { startX, startY, colorToFill, colorToBeFilled, pgData, width, height } = e.data;
  
  // Perform flood fill on the chunk of the canvas
  let result = floodFillChunk(startX, startY, colorToFill, colorToBeFilled, pgData, width, height);

  // Post the result back to the main thread
  self.postMessage(result);
});