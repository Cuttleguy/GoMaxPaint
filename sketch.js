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

let transparency = 255
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
let workingColor
let colorIndex
let erasingMode = false
let floodFillMode = false
let erasingColor
let img
let frames=0
let floodFillPrevious = false
function preload() {
  img = loadImage("assets/art/output-onlinepngtools.png")
}
let pg
let cg

let colorPickerWidth
let colorNames=["white","red","orange","yellow","green","blue","purple"]
let colorsToJson=[]
function setup() {
  createCanvas(windowWidth, windowHeight);
  if(localStorage.getItem("listOfColors")!=null)
  {
    listOfColors=JSON.parse(localStorage.getItem("listOfColors"))
  }
  else
  {
    listOfColors = ["#FFFFFF", "#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#0000FF", "#800080"]
    console.log(listOfColors)
  }
  if(localStorage.getItem("colorNames")!=null)
  {
    colorNames=JSON.parse(localStorage.getItem("colorNames"))
  }
  for (let i = 0; i < listOfColors.length; i++) {
    const color = listOfColors[i];
    const name = colorNames[i];
    colorsToJson.push([name,color])
    
  }
  noCursor()
  drawingColor = color(listOfColors[0])
  colorIndex = 0
  erasingColor = color("#000000")
  const ctx = drawingContext;
  if (ctx) {
    ctx.canvas.getContext('2d').willReadFrequently = true;
  }
  colorPickerWidth=Math.floor(windowWidth/4.5)
  pg=createGraphics(windowWidth,windowHeight)
  

  cg=createGraphics(windowWidth,windowHeight)
  background(0)
  pg.background(0)
  pg.noSmooth()
  pg.setAttributes("antialias",false)
  // ui.circle(1900,400,20)
  frameRate(96)

  console.log(Math.floor(colorPickerWidth/2)+windowWidth-colorPickerWidth)
  
  
  
}
const circles = []
let strokeWidth = 81
let oldMouse = [null,null]
function colorsMatch(a,b)
{
  
}
function draw() {

  pg.noSmooth()
  if(floodFillPrevious)
  {
    // circles.forEach(place)
    floodFillPrevious=false
  }
  
  // background(0)
  background(0)
  noStroke()
  pg.noStroke()
  
  
  workingColor=color(red(drawingColor),green(drawingColor),blue(drawingColor),transparency)
 
  
  
  
  
  
  if (mouseIsPressed && !arrayEquals(oldMouse,[mouseX,mouseY])) {
    console.log("NEW PRESS")
    oldMouse[0]=mouseX
    oldMouse[1]=mouseY

    if (!floodFillMode) {
      if (!(circles.includes([mouseX, mouseY]))) {
        if (erasingMode) {
          circles.push(["circle",[mouseX, mouseY, strokeWidth, erasingColor]])
          pg.fill(erasingColor)
          pg.circle(mouseX,mouseY,strokeWidth)
        }
        else {
          circles.push(["circle",[mouseX, mouseY, strokeWidth, workingColor]])
          console.log("CIRCLE")
          pg.fill(workingColor)
          pg.circle(mouseX,mouseY,strokeWidth)
        }

      }
    }
    









    if(floodFillMode)
    {
     
      let X1=mouseX
      let Y1=mouseY
      if(erasingMode)
      {
        floodFill(mouseX,mouseY,erasingColor,pg.get(mouseX,mouseY))
      }
      else
      {
        floodFill(mouseX,mouseY,workingColor,pg.get(mouseX,mouseY))
      }
      
      
      // circles.forEach(place)
      console.log("FLOOD")
      console.log(pg.get(X1,Y1))
      floodFillPrevious=true
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
image(pg,0,0)


//----CURSOR---- 
  if(true)
  {

  
  fill(workingColor)
  if (erasingMode) {
    fill(erasingColor)
    stroke(255, 255, 255)
  }
 


  if (floodFillMode) {
    if(!erasingMode)
    {
      fill(workingColor)
      circle(mouseX, mouseY, 30)
      fill(0)
      text("F", mouseX, mouseY)
    }
    else
    {
      stroke(0)
      fill(erasingColor)
      circle(mouseX, mouseY, 30)
      fill(255)
      text("F", mouseX, mouseY)
      noStroke()
    }
    

  }
  else {
    circle(mouseX, mouseY, strokeWidth)
  }
}
  // Draw FPS (rounded to 2 decimal places) at the bottom left of the screen
let fps = frameRate();
fill(255);
stroke(0);
text("FPS: " + fps.toFixed(2), 10, height - 10);


}
function place(object, index, arr) {
  if(object[0]=="circle")
  {
    console.log("CIRCLE")
    let circlep = object[1]
    pg.fill(circlep[3])
    pg.noStroke()
    pg.circle(circlep[0], circlep[1], circlep[2])
  }
  else{

    if(object[0]="pixelList")
    {
      
      console.log("PIXELLIST")
      for(let pixel in object[1])
      {
        
        
        // pg.set(pixel.x,pixel.y,object[2])
        
      }
      
    }
    
  }
  

}

function floodFill(X, Y, colorToFill, colorToBeFilled) {
  let stack = [];
  let overExtension=[];
  if(red(colorToFill)==red(colorToBeFilled)&&green(colorToFill)==green(colorToBeFilled)&&blue(colorToFill)==blue(colorToBeFilled)&&alpha(colorToFill)==alpha(colorToBeFilled))
  {
    return
  }
  // let toReturn = [];
  let visited = new Set(); // Use a Set to track visited pixels

  console.log(`Hello from floodFill(${X}, ${Y}, ${colorToFill}, ${colorToBeFilled})`)

  stack.push(new Pixel(X, Y));
  let topLeftColor
  visited.add(`${X},${Y}`); // Mark the starting pixel as visited
  for (let x = 0; x < 1; x++) {
    for (let y = 0; y < 1; y++) {
      topLeftColor=get(pg.set(x,y,colorToFill))
      pg.set(x,y,colorToFill)
      pg.updatePixels(x,y,1,1)
    }
    
  }
  // pg.set(0,0,drawingColor)
  // pg.loadPixels()

  while (stack.length > 0) {
    
    let pix = stack.pop();
    let currentX = pix.x;
    let currentY = pix.y;
    //toReturn.push(new Pixel(currentX, currentY));
    
    // console.log(colorToFill)
    pg.set(currentX, currentY, colorToFill); // Fill the current pixel with the new color
    // pg.pixels[currentX+currentY*pg.width]=colorToFill
    
    // console.log("before updatePixels", pg.get(currentX,currentY))
    
    pg.updatePixels(currentX,currentY,1,1)
    
    // pg.updatePixels()
    // console.log(pg.get(currentX,currentY))
    
    // Check and push adjacent pixels onto the stack if they need filling
    // Right
    if (currentX + 1 < pg.width && !visited.has(`${currentX + 1},${currentY}`) && arrayEquals(pg.get(currentX + 1, currentY), colorToBeFilled)) {
      stack.push(new Pixel(currentX + 1, currentY));
      visited.add(`${currentX + 1},${currentY}`);
      
    }
    // Left
    if (currentX - 1 >= 0 && !visited.has(`${currentX - 1},${currentY}`) && arrayEquals(pg.get(currentX - 1, currentY), colorToBeFilled)) {
      stack.push(new Pixel(currentX - 1, currentY));
      visited.add(`${currentX - 1},${currentY}`);
    }
    // Down
    if (currentY + 1 < pg.height && !visited.has(`${currentX},${currentY + 1}`) && arrayEquals(pg.get(currentX, currentY + 1), colorToBeFilled)) {
      stack.push(new Pixel(currentX, currentY + 1));
      visited.add(`${currentX},${currentY + 1}`);
    }
    // Up
    if (currentY - 1 >= 0 && !visited.has(`${currentX},${currentY - 1}`) && arrayEquals(pg.get(currentX, currentY - 1), colorToBeFilled)) {
      stack.push(new Pixel(currentX, currentY - 1));
      visited.add(`${currentX},${currentY - 1}`);
    }
    // Right Down
    if (currentY + 1 >= 0 && currentX + 1 < pg.width && !visited.has(`${currentX+1},${currentY + 1}`) && arrayEquals(pg.get(currentX+1, currentY + 1), colorToBeFilled)) {
      stack.push(new Pixel(currentX+1, currentY + 1));
      visited.add(`${currentX+1},${currentY + 1}`);
 
    }
    // Left Down
    if (currentY + 1 >= 0 && currentX - 1 < pg.width && !visited.has(`${currentX-1},${currentY + 1}`) && arrayEquals(pg.get(currentX-1, currentY + 1), colorToBeFilled)) {
      stack.push(new Pixel(currentX-1, currentY + 1));
      visited.add(`${currentX-1},${currentY + 1}`);

    }
    // Right Up
    if (currentY - 1 >= 0 && currentX + 1 < pg.width && !visited.has(`${currentX-1},${currentY + 1}`) && arrayEquals(pg.get(currentX-1, currentY + 1), colorToBeFilled)) {
      stack.push(new Pixel(currentX+1, currentY - 1));
      visited.add(`${currentX+1},${currentY - 1}`);
    }
    // Left Up
    
    if (currentY - 1 >= 0 && currentX - 1 < pg.width && !visited.has(`${currentX-1},${currentY - 1}`) && arrayEquals(pg.get(currentX-1, currentY - 1), colorToBeFilled)) {
      stack.push(new Pixel(currentX-1, currentY - 1));
      visited.add(`${currentX-1},${currentY - 1}`);
    }
    // // Right
    // if (currentX + 2 < pg.width && !visited.has(`${currentX + 2},${currentY}`) && arrayEquals(pg.get(currentX + 2, currentY), colorToBeFilled)) {
    //   stack.push(new Pixel(currentX + 2, currentY));
    //   visited.add(`${currentX + 2},${currentY}`);
      
    // }
    // // Left
    // if (currentX - 2 >= 0 && !visited.has(`${currentX - 2},${currentY}`) && arrayEquals(pg.get(currentX - 2, currentY), colorToBeFilled)) {
    //   stack.push(new Pixel(currentX - 2, currentY));
    //   visited.add(`${currentX - 2},${currentY}`);
    // }
    // // Down
    // if (currentY + 2 < pg.height && !visited.has(`${currentX},${currentY + 2}`) && arrayEquals(pg.get(currentX, currentY + 2), colorToBeFilled)) {
    //   stack.push(new Pixel(currentX, currentY + 2));
    //   visited.add(`${currentX},${currentY + 2}`);
    // }
    // // Up
    // if (currentY - 2 >= 0 && !visited.has(`${currentX},${currentY - 2}`) && arrayEquals(pg.get(currentX, currentY - 2), colorToBeFilled)) {
    //   stack.push(new Pixel(currentX, currentY - 2));
    //   visited.add(`${currentX},${currentY - 2}`);
    // }
    // ---- Over Extension ----
    if (currentX + 1 < pg.width && !visited.has(`${currentX + 1},${currentY}`) && !arrayEquals(pg.get(currentX + 1, currentY), colorToBeFilled)) {
      overExtension.push(new Pixel(currentX + 1, currentY));
      visited.add(`${currentX + 1},${currentY}`);
      
    }
    // Left
    if (currentX - 1 >= 0 && !visited.has(`${currentX - 1},${currentY}`) && !arrayEquals(pg.get(currentX - 1, currentY), colorToBeFilled)) {
      overExtension.push(new Pixel(currentX - 1, currentY));
      visited.add(`${currentX - 1},${currentY}`);
    }
    // Down
    if (currentY + 1 < pg.height && !visited.has(`${currentX},${currentY + 1}`) && !arrayEquals(pg.get(currentX, currentY + 1), colorToBeFilled)) {
      overExtension.push(new Pixel(currentX, currentY + 1));
      visited.add(`${currentX},${currentY + 1}`);
    }
    // Up
    if (currentY - 1 >= 0 && !visited.has(`${currentX},${currentY - 1}`) && !arrayEquals(pg.get(currentX, currentY - 1), colorToBeFilled)) {
      overExtension.push(new Pixel(currentX, currentY - 1));
      visited.add(`${currentX},${currentY - 1}`);
    }
  }
  while(overExtension.length!=0)
  {
    let pix = overExtension.pop()
    let currentX=pix.x
    let currentY=pix.y
    pg.set(currentX,currentY,colorToFill)
    pg.updatePixels(currentX,currentY,1,1)
  }
  // for (let x = 0; x < 1; x++) {
  //   for (let y = 0; y < 1; y++) {
      
  //     pg.set(x,y,topLeftColor)
  //     pg.updatePixels(x,y,1,1)
  //   }
    
  // }
  // pg.updatePixels()
  return //toReturn;
}
function floodFillMulti(X, Y, colorToFill, colorToBeFilled) {
  let stack = [];
  let toReturn = [];
  let visited = new Set();
  let workers = []; // Array to store worker instances
  let pgData = pg; // Assuming pg is your canvas context or data

  stack.push({ x: X, y: Y });
  visited.add(`${X},${Y}`);

  const numWorkers = 4; // Number of workers to use
  const chunkWidth = Math.ceil(pgData.width / numWorkers);

  // Function to create a worker
  function createWorker() {
      let worker = new Worker('worker.js');

      // Listen for messages from the worker
      worker.addEventListener('message', function(e) {
          // e.data will contain the processed results from the worker
          toReturn = toReturn.concat(e.data);

          // Check if all workers have finished
          if (toReturn.length === pgData.width * pgData.height) {
              // All items processed, do something with toReturn
              console.log('Flood fill completed:', toReturn);
              // Update pixels or handle completion
              pgData.updatePixels(); // Example: Update canvas pixels
          }
      });

      return worker;
  }

  // Create workers and assign them chunks of the canvas to process
  for (let i = 0; i < numWorkers; i++) {
      let startX = i * chunkWidth;
      let endX = Math.min(startX + chunkWidth, pgData.width);

      let worker = createWorker();
      workers.push(worker);

      // Start the worker with the current chunk
      worker.postMessage({
          startX: startX,
          startY: 0,
          colorToFill: colorToFill,
          colorToBeFilled: colorToBeFilled,
          pgData: pgData,
          width: pgData.width,
          height: pgData.height
      });
  }
}

function keyPressed() {

  if (key == "c") {
    
  }
  else {
    if (key == "=") {
      strokeWidth += 10
    }
    if (key == "-") {
      if (width > 1) {
        strokeWidth -= 10
      }

    }
    if (key == "w") {
      
      transparency += 50
      if(transparency>255)
      {
        transparency=255
      }
    }
    if (key == "s") {
      transparency -= 50
      if (transparency < 0) {
        transparency=5
      }

    }
    if (key == "a" && !erasingMode) {
      colorIndex--
      if (colorIndex < 0) {
        colorIndex = listOfColors.length + colorIndex
      }
      drawingColor = color(listOfColors[colorIndex])
    }
    if (key == "d" && !erasingMode) {
      colorIndex++
      if (colorIndex == listOfColors.length) {
        colorIndex = 0
      }
      drawingColor = color(listOfColors[colorIndex])
    }
    if (key == "e") {
      erasingMode = !erasingMode
    }
    if (key == "f") {
      floodFillMode = !floodFillMode
    }
    if (key === 'u' || key === 'U') {
      // console.log(JSON.stringify(colorsToJson))
 
      pg.save('myCanvas');
      console.log("SAVE")

    }
    // if(key === "l")
    // {
    //   let filename=prompt("File Name?","colorlist.txt")
    //   console.log()
    //   let file = loadStrings("assets/text/"+filename)
    //   console.log(file)
    //   console.log(typeof(file))
    //   console.log(file.join())
    //   console.log(file.at(0))
    //   let colorsToJson=JSON.parse(file.at(0))
    //   listOfColors.length=0
    //     colorNames.length=0
    //   for(colorPair in colorsToJson)
    //   { 
    //     colorNames.push(colorPair[0])
    //     listOfColors.push(colorPair[1])
    //   }
    // }
    if(key === "n" || key === "N")
    {
      let newColor=prompt("Name of new color?","Gray")
      
      let newHex = prompt("Hex code of new color?","#888888")
      if(!colorNames.includes(newColor))
      {
        colorNames.push(newColor.toLowerCase())
        listOfColors.push(newHex)
        colorsToJson.push([newColor,listOfColors])
        localStorage.setItem("listOfColors",JSON.stringify(listOfColors))
        localStorage.setItem("colorNames",JSON.stringify(colorNames))
      }
      
    }
    if(key === "g" || key === "G")
    {
      chooseNewColor()
    }
    
  }
} 
function chooseNewColor()
{
  let colorToSwitch=prompt("Choose a color?","white").toLowerCase()
  let newIndex=colorNames.indexOf(colorToSwitch)
  if(newIndex==-1)
  {
    if(colorToSwitch=="black")
    {
      erasingMode=true
    }
    else
    {
      alert("Not a color in list")
      chooseNewColor()
    }
    
  }
  colorIndex=newIndex
  drawingColor=color(listOfColors[colorIndex])
  
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
