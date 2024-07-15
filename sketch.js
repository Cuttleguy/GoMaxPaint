// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
//   ellipse(mouseX,mouseY,80,80)
// }
// Warn if overriding existing method
class Pixel {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }

  equals(otherPixel) {
      return this.x === otherPixel.x && this.y === otherPixel.y;
  }

  static isEqual(pixel1, pixel2) {
      return pixel1 instanceof Pixel &&
             pixel2 instanceof Pixel &&
             pixel1.equals(pixel2);
  }
}

// Override the Array.prototype.includes method to use Pixel.isEqual
if (!Array.prototype.includesPixel) {
  Array.prototype.includesPixel = function(pixel) {
      for (let item of this) {
          if (Pixel.isEqual(item, pixel)) {
              return true;
          }
      }
      return false;
  };
}

// Example usage:
let pixel1 = new Pixel(1, 2);
let pixel2 = new Pixel(3, 4);
let pixel3 = new Pixel(1, 2);

let pixelArray = [pixel1, pixel2];

console.log(pixelArray.includesPixel(pixel2));  // Output: true
console.log(pixel1==pixel3)
let worker
if(Array.prototype.equals)
  console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
      return false;
  // if the argument is the same array, we can be sure the contents are same as well
  if(array === this)
      return true;
  // compare lengths - can save a lot of time 
  if (this.length != array.length)
      return false;

  for (var i = 0, l=this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
          // recurse into the nested arrays
          if (!this[i].equals(array[i]))
              return false;       
      }           
      else if (this[i] != array[i]) { 
          // Warning - two different object instances will never be equal: {x:20} != {x:20}
          return false;   
      }           
  }       
  return true;
}
function arrayEquals(a,b)
{
  if(a.length!=b.length)
  {
    return false
  }
  for (let i = 0; i < a.length; i++) {
    const AE = a[i];
    const BE = b[i];
    if(AE!=BE)
    {
      return false
    }
  }
  return true
}

// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});
let listOfColors
let drawingColor
let colorIndex
let erasingMode = false
let floodFillMode = false
let erasingColor
let img
let frames=0
function preload() {
  img = loadImage("assets/art/output-onlinepngtools.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  listOfColors = [color("#FFFFFF"), color("#FF0000"), color("#FFA500"), color("#FFFF00"), color("#00FF00"), color("#0000FF"), color("#800080")]
  drawingColor = listOfColors[0]
  colorIndex = 0
  erasingColor = color("#000000")
  const ctx = drawingContext;
  if (ctx) {
    ctx.canvas.getContext('2d').willReadFrequently = true;
  }
  
}
const circles = []
let strokeWidth = 80
let oldMouse = [null,null]

function draw() {
  background(0)
  noStroke()
  circles.forEach(place)
  frames++
  console.log(frames)
  console.log(mouseIsPressed)
  if (mouseIsPressed && !arrayEquals(oldMouse,[mouseX,mouseY])) {
    console.log("NEW PRESS")
    oldMouse[0]=mouseX
    oldMouse[1]=mouseY

    if (!floodFillMode) {
      if (!(circles.includes([mouseX, mouseY]))) {
        if (erasingMode) {
          circles.push(["circle",[mouseX, mouseY, strokeWidth, erasingColor]])
        }
        else {
          circles.push(["circle",[mouseX, mouseY, strokeWidth, drawingColor]])
        }

      }
    }
    else
    {
      // circles.push(["pixelList",floodFill(mouseX, mouseY, drawingColor, get(mouseX, mouseY)),drawingColor])
      circles.push(["pixelList",floodFill(mouseX,mouseY,drawingColor,get(mouseX,mouseY)),drawingColor])
      console.log(mouseIsPressed)
      // console.log("FLOOD")
    }
    
    // else {
    //   circles.push(["pixelList",floodFill(mouseX, mouseY, drawingColor, get(mouseX, mouseY)),drawingColor])
    //   console.log("FLOOD")
    // }


  }

//   function mouseClicked() 
// { 
//   console.log("CLICK")
//   if(floodFillMode)
//   {
//     circles.push(["pixelList",floodFill(mouseX, mouseY, drawingColor, get(mouseX, mouseY)),drawingColor])
//     console.log("FLOOD")
//   }
// }
  

  fill(drawingColor)
  if (erasingMode) {
    fill(erasingColor)
    stroke(255, 255, 255)
  }




  if (floodFillMode) {
    fill(drawingColor)
    circle(mouseX, mouseY, 30)
    fill(0)
    text("F", mouseX, mouseY)

  }
  else {
    circle(mouseX, mouseY, strokeWidth)
  }



  
}
function place(object, index, arr) {
  if(object[0]=="circle")
  {
    console.log("CIRCLE")
    let circlep = object[1]
    fill(circlep[3])
    noStroke()
    circle(circlep[0], circlep[1], circlep[2])
  }
  else{

    if(object[0]="pixelList")
    {
      
      console.log("PIXELLIST")
      for(let pixel in object[1])
      {
        
        
        set(pixel.x,pixel.y,object[2])
        
      }
      updatePixels()
    }
    
  }
  

}
// function floodFill(X, Y, colorToFill, colorToBeFilled) {
//   // console.log(colorToBeFilled==get(X + 1, Y))
//   // console.log(X+ " " + Y)
//   let pixels = []
//   // console.log(get(X + 1, Y))
  
//   if (arrayEquals(get(X + 1, Y),colorToBeFilled)) {
    
//     pixels.push(X + 1, Y)
//     pixels.concat(floodFill(X + 1, Y, colorToFill, colorToBeFilled))
//   }
//   if (arrayEquals(get(X, Y + 1),colorToBeFilled)) {
//     pixels.push(X, Y + 1)
//     pixels.concat(floodFill(X, Y + 1, colorToFill, colorToBeFilled))
//   }
//   if (arrayEquals(get(X - 1, Y),colorToBeFilled)) {
//     pixels.push(X - 1, Y)
//     pixels.concat(floodFill(X - 1, Y, colorToFill, colorToBeFilled))
//   }
//   if (arrayEquals(get(X, Y - 1), colorToBeFilled)) {
//     pixels.push(X, Y - 1)
//     pixels.concat(floodFill(X, Y - 1, colorToFill, colorToBeFilled))
//   }
//   return(pixels)
// }
// function floodFill(X, Y, colorToFill, colorToBeFilled) {
//   console.log(X, Y)
//   // let test = [new Pixel(3,4),new Pixel(5,7),new Pixel(2,9)]
//   // console.log(test.includes(new Pixel(3,4)))
//   // console.log(new Pixel(3,4)==new Pixel(3,4))
//   debugger
  
//   let stack = [];
//   stack.push(new Pixel(X,Y));
//   let toReturn=[]
//   while (stack.length > 0) {
//     let pix = stack.pop()
//     let currentX=pix.x
//     let currentY=pix.y
//     console.log((toReturn.length/(stack.length+toReturn.length)*100).toFixed(4), currentX, currentY,toReturn.length,stack.length)
    
//     toReturn.push(new Pixel(currentX,currentY))
//     if (arrayEquals(get(currentX, currentY), colorToBeFilled)) {
//       set(currentX, currentY, colorToFill);
      

//       // Push adjacent pixels onto the stack if they need filling
//       if (currentX + 1 < width && arrayEquals(get(currentX + 1, currentY), colorToBeFilled) && !stack.includesPixel(new Pixel(currentX,currentY)) && !toReturn.includesPixel(new Pixel(currentX,currentY))) {
//         stack.push(new Pixel(currentX+1,currentY));
        
//       }
//       if (currentX - 1 >= 0 && arrayEquals(get(currentX - 1, currentY), colorToBeFilled)  && !stack.includesPixel(new Pixel(currentX,currentY)) && !toReturn.includesPixel(new Pixel(currentX,currentY))) {
//         stack.push(new Pixel(currentX-1,currentY));
        
//       }
//       if (currentY + 1 < height && arrayEquals(get(currentX, currentY + 1), colorToBeFilled) && !stack.includesPixel(new Pixel(currentX,currentY)) && !toReturn.includesPixel(new Pixel(currentX,currentY))) {
//         stack.push(new Pixel(currentX,currentY-1));
        
      
//       if (currentY - 1 >= 0 && arrayEquals(get(currentX, currentY - 1), colorToBeFilled) && !stack.includesPixel(new Pixel(currentX,currentY)) && !toReturn.includesPixel(new Pixel(currentX,currentY))) {
//         stack.push(new Pixel(currentX,currentY-1));
        
//       }
//     }

//   }
//   return(toReturn)

// }
// }
function floodFill(X, Y, colorToFill, colorToBeFilled) {
  let stack = [];
  let toReturn = [];
  let visited = new Set(); // Use a Set to track visited pixels
  
  stack.push(new Pixel(X, Y));
  visited.add(`${X},${Y}`); // Mark the starting pixel as visited

  while (stack.length > 0) {
    let pix = stack.pop();
    let currentX = pix.x;
    let currentY = pix.y;
    toReturn.push(new Pixel(currentX, currentY));
    set(currentX, currentY, colorToFill); // Fill the current pixel with the new color

    // Check and push adjacent pixels onto the stack if they need filling
    // Right
    if (currentX + 1 < width && !visited.has(`${currentX + 1},${currentY}`) && arrayEquals(get(currentX + 1, currentY), colorToBeFilled)) {
      stack.push(new Pixel(currentX + 1, currentY));
      visited.add(`${currentX + 1},${currentY}`);
    }
    // Left
    if (currentX - 1 >= 0 && !visited.has(`${currentX - 1},${currentY}`) && arrayEquals(get(currentX - 1, currentY), colorToBeFilled)) {
      stack.push(new Pixel(currentX - 1, currentY));
      visited.add(`${currentX - 1},${currentY}`);
    }
    // Down
    if (currentY + 1 < height && !visited.has(`${currentX},${currentY + 1}`) && arrayEquals(get(currentX, currentY + 1), colorToBeFilled)) {
      stack.push(new Pixel(currentX, currentY + 1));
      visited.add(`${currentX},${currentY + 1}`);
    }
    // Up
    if (currentY - 1 >= 0 && !visited.has(`${currentX},${currentY - 1}`) && arrayEquals(get(currentX, currentY - 1), colorToBeFilled)) {
      stack.push(new Pixel(currentX, currentY - 1));
      visited.add(`${currentX},${currentY - 1}`);
    }
  }

  return toReturn;
}
function keyPressed() {
  console.log("PRESS")
  if (key == "c") {
    circles.length = 0
  }
  else {
    if (key == "=") {
      strokeWidth += 10
    }
    if (key == "-") {
      if (width != 0) {
        strokeWidth -= 10
      }

    }
    if (key == "a" && !erasingMode) {
      colorIndex--
      if (colorIndex < 0) {
        colorIndex = listOfColors.length + colorIndex
      }
      drawingColor = listOfColors[colorIndex]
    }
    if (key == "d" && !erasingMode) {
      colorIndex++
      if (colorIndex == listOfColors.length) {
        colorIndex = 0
      }
      drawingColor = listOfColors[colorIndex]
    }
    if (key == "e") {
      erasingMode = !erasingMode
    }
    if (key == "f") {
      floodFillMode = !floodFillMode
    }
    if (key === 's' || key === 'S') {
      saveCanvas('myCanvas', 'jpg');

    }
  }
} 
// function floodFill(X, Y, colorToFill, colorToBeFilled) {
//   // Send data to the worker for processing
//   worker.postMessage({
//     X: X,
//     Y: Y,
//     colorToFill: colorToFill,
//     colorToBeFilled: colorToBeFilled
//   });
// }
