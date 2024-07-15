// self.onmessage = function(event) {
//     const { X, Y, colorToFill, colorToBeFilled } = event.data;
//     let pixels = []; // Array to store pixels to be filled
  
//     // Implement flood fill algorithm
//     floodFill(X, Y, colorToFill, colorToBeFilled);
  
//     // Send the result back to the main thread
//     self.postMessage(pixels);
  
//     function floodFill(X, Y, colorToFill, colorToBeFilled) {
//       // Base case: if current pixel is not the color to be filled, return
//       if (!arrayEquals(get(X, Y), colorToBeFilled)) {
//         return;
//       }
  
//       // Set current pixel to the fill color
//       set(X, Y, colorToFill);
//       pixels.push([X, Y]);
  
//       // Recursively fill adjacent pixels
//       floodFill(X + 1, Y, colorToFill, colorToBeFilled); // Right
//       floodFill(X - 1, Y, colorToFill, colorToBeFilled); // Left
//       floodFill(X, Y + 1, colorToFill, colorToBeFilled); // Down
//       floodFill(X, Y - 1, colorToFill, colorToBeFilled); // Up
//     }
  
//     function arrayEquals(arr1, arr2) {
//       return arr1[0] === arr2[0] && arr1[1] === arr2[1] && arr1[2] === arr2[2];
//     }
//   };
  