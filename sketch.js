/*
The base for this project: https://github.com/nature-of-code/noc-examples-p5.js/tree/master/chp09_ga/NOC_9_04_Faces_interactiveselection
Daniel Shiffman || The Nature of Code || http://natureofcode.com

                  ˚ 　•    ×
Dango Generator  ·　　　 ·　　  ˚ . ·
 by amtg and iafp ·   ✹  ˚  ·. ·  ·   . 
*              •                 *   
*/


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

let day 
let population 
let generationInfo 

// for mouse events functions
let locked = false


// ='='='='='='='='='='='='='='='='='= - - - SETUP- - - ='='='='='='='='='='='='='='='='='=

function preload(){

  f_body = loadImage('/assets/f_body.png')
  s_body = loadImage('/assets/s_body.png')
  f_cheeks = loadImage('/assets/f_cheeks.png')
  s_cheeks0 = loadImage('/assets/s_cheeks0.png')
  s_cheeks1 = loadImage('/assets/s_cheeks1.png')
  f_eyes0 = loadImage('/assets/f_eyes0.png')
  f_eyes1 = loadImage('/assets/f_eyes1.png') // change assets!!
  f_eyes2 = loadImage('/assets/f_eyes2.png')

  f_body_s = loadImage('/assets/f_body_s.png')
  s_body_s = loadImage('/assets/s_body_s.png')
  s_body_ss = loadImage('/assets/s_body_s.png')
  f_cheeks_s = loadImage('/assets/f_cheeks_s.png')
  s_cheeks0_s = loadImage('/assets/s_cheeks0_s.png')
  s_cheeks1_s = loadImage('/assets/s_cheeks1_s.png')
  f_eyes0_s = loadImage('/assets/f_eyes0_s.png')
  f_eyes1_s = loadImage('/assets/f_eyes1_s.png') // change assets!!
  f_eyes2_s = loadImage('/assets/f_eyes2_s.png')

  loadFont('./assets/bebas/Bebas-Regular.otf')

}

function setup() {

  frameRate(30)

  colorMode(HSB, 1.0, 1.0, 1.0, 1.0)
  let popmax = 25
  let mutationRate = 0.03
  population = new Population(mutationRate, popmax)
  day = new Day(0)

  canvas = createCanvas(windowWidth, 0.92*windowHeight)
  canvas.position(0, 0)


  // ='='='='='='='='= INFOS ='='='='='='='='=

  generationInfo = createDiv('')
  generationInfo.position(0, 0.94*windowHeight)
  generationInfo.style('font-family', 'Bebas-Regular')
  generationInfo.style('font-size', '20px')


  // ='='='='='='='='= BUTTONS  ='='='='='='='='=

  button1 = createButton("✧ evolve new generation").size(250, 35)
  button1.mousePressed(nextGen)
  button1.position(0.05, 0.015*windowHeight)
  button1.style('background-color', '#47cec0')
  button1.style( 'border-bottom', '3px solid #3c988f')
  button1.style('text-align', 'center')
  button1.style('font-size', '20px')
  button1.style('font-family', 'Bebas-Regular')

  button2 = createButton("✧ same but with real time").size(250, 35)
  button2.mousePressed(nextGenRealTime)
  button2.position(0.05, 0.01*windowHeight+45)
  button2.style('background-color', '#47cec0')
  button2.style( 'border-bottom', '3px solid #3c988f')
  button2.style('text-align', 'center')
  button2.style('font-size', '20px')
  button2.style('font-family', 'Bebas-Regular')
  
}


// ='='='='='='='='='='='='='='='='='= - - - EXECUTION - - - ='='='='='='='='='='='='='='='='='=

function draw() {
  background('#E6E6FA')
  population.adjustCoordinates()
  population.display()
  if (locked){
    population.rollover(mouseX, mouseY)
  }


  // ='='='='='='='='= HTML ELEMENTS ='='='='='='='='=

  generationInfo.html("Generation ➮ " + population.getGenerations() + "  ||  Hour ➮ " + day.getHour()) 
  generationInfo.center('horizontal')
}


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


// ='='='='='='='='='='='='='='='='='= CLICK EVENTS ='='='='='='='='='='='='='='='='='=

function mousePressed() {
  population.rollover(mouseX, mouseY)
  locked = true
}

function mouseReleased() {
  population.rollover(mouseX, mouseY)
  locked = false
}


// ='='='='='='='='='='='='='='='='='= RESPONSE TO HTML ELEMENTS ='='='='='='='='='='='='='='='='='=

function nextGen() {
  var isRealTime = false
  population.setHourInfluence()  // before selection, the fitness influenced by hour has to be updated!
  population.selection() 
  // population.printBrightness()
  population.reproduction() 
  day.passHour(isRealTime) 
}
  
function nextGenRealTime() {
  var isRealTime = true
  population.setHourInfluence()  // before selection, the fitness influenced by hour has to be updated!
  population.selection() 
  population.reproduction() 
  day.passHour(isRealTime) 
}


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


// ='='='='='='='='='='='='='='='='='= DEALING WITH WINDOW RESIZED ='='='='='='='='='='='='='='='='='=

function windowResized() {
  clear()
  resizeCanvas(windowWidth, 0.92*windowHeight)
  population.adjustCoordinates()
  population.display()

  generationInfo.position(windowWidth/2, 0.94*windowHeight)
  generationInfo.center('horizontal')
}