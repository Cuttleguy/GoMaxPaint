// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);
//   ellipse(mouseX,mouseY,80,80)
// }
let listOfColors
let drawingColor
let colorIndex
let erasingMode = false
let floodFillMode = false
let erasingColor
let img
function preload() {
  img = loadImage("assets/art/output-onlinepngtools.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  listOfColors = [color("#FFFFFF"), color("#FF0000"), color("#FFA500"), color("#FFFF00"), color("#00FF00"), color("#0000FF"), color("#800080")]
  drawingColor = listOfColors[0]
  colorIndex = 0
  erasingColor = color("#000000")
}
const circles = []
let strokeWidth = 80


function draw() {
  background(0)
  noStroke()
  if (mouseIsPressed) {
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
    else {
      circles.push(["pixelList",floodFill(mouseX, mouseY, drawingColor, get(mouseX, mouseY)),drawingColor])

    }


  }


  circles.forEach(place)

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



  console.log(strokeWidth)
}
function place(object, index, arr) {
  if(object[0]=="circle")
  {
    let circlep = object[1]
    fill(circlep[3])
    noStroke()
    circle(circlep[0], circlep[1], circlep[2])
  }
  else{

    if(object[0]="pixelList")
    {
      for(let pixel in object[1])
      {
        set(pixel[0],pixel[1],object[2])
      }
    }
  }
  

}
function floodFill(X, Y, colorToFill, colorToBeFilled) {
  console.log(colorToBeFilled==get(X + 1, Y))
  console.log(X+ " " + Y)
  set(X, Y, colorToFill)
  let pixels = []
  console.log(get(X + 1, Y))
  
  if (get(X + 1, Y) == colorToBeFilled) {
    console.log("EQUALITY")
    pixels.push(X + 1, Y)
    pixels.concat(floodFill(X + 1, Y, colorToFill, colorToBeFilled))
  }
  if (get(X, Y + 1) == colorToBeFilled) {
    pixels.push(X, Y + 1)
    pixels.concat(floodFill(X, Y + 1, colorToFill, colorToBeFilled))
  }
  if (get(X - 1, Y) == colorToBeFilled) {
    pixels.push(X - 1, Y)
    pixels.concat(floodFill(X - 1, Y, colorToFill, colorToBeFilled))
  }
  if (get(X, Y - 1) == colorToBeFilled) {
    pixels.push(X, Y - 1)
    pixels.concat(floodFill(X, Y - 1, colorToFill, colorToBeFilled))
  }
  return(pixels)
}
function keyPressed() {
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