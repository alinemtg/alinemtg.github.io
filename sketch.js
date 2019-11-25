// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

let day;
let population;
let generationInfo;
let hourInfo;


// ='='='='='='='='='='='='='='='='='= - - - SETUP- - - ='='='='='='='='='='='='='='='='='=

function preload(){

  f_body = loadImage('/assets/f_body.png')
  s_body = loadImage('/assets/s_body.png')
  f_cheeks = loadImage('/assets/f_cheeks.png')
  s_cheeks0 = loadImage('/assets/s_cheeks0.png')
  f_cheeks = loadImage('/assets/f_cheeks.png')
  f_eyes0 = loadImage('/assets/f_eyes0.png')

}

function setup() {

  createCanvas(windowWidth, 0.9*windowHeight)

  colorMode(HSB, 1.0, 1.0, 1.0, 1.0)

  let popmax = 20;
  let mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
  population = new Population(mutationRate, popmax);
  day = new Day(0)


  // ='='='='='='='='= COLOR PALETTE  ='='='='='='='='=

  // colorPalette = createDiv('')
  // colorPalette.position(300, 0.85*windowHeight)

  // ='='='='='='='='= INFOS ='='='='='='='='=

  generationInfo = createDiv('')
  generationInfo.position(10, 0.9*windowHeight);
  hourInfo = createDiv('')
  hourInfo.position(300, 0.9*windowHeight);


  // ='='='='='='='='= BUTTONS  ='='='='='='='='=

  button1 = createButton("evolve new generation")
  button1.mousePressed(nextGen)
  button1.position(10, 0.95*windowHeight)

  button2 = createButton("evolve new generation with real time")
  button2.mousePressed(nextGenRealTime)
  button2.position(300, 0.95*windowHeight)
  
}

// ='='='='='='='='='='='='='='='='='= - - - EXECUTION - - - ='='='='='='='='='='='='='='='='='=

function draw() {
  background('#E6E6FA');
  population.display();

  // ='='='='='='='='= HTML ELEMENTS ='='='='='='='='=

  generationInfo.html("Generation #:" + population.getGenerations());
  //generationInfo.position(10, 0.9*windowHeight);

  hourInfo.html("Hour#:" + day.getHour());
  // hourInfo.position(300, 0.9*windowHeight);

}

function windowResized() {
  resizeCanvas(windowWidth, 0.85*windowHeight)

  population.display();
  
  button1.position(10, 0.95*windowHeight)
  button2.position(300, 0.95*windowHeight);

  generationInfo.position(10, 0.9*windowHeight);
  hourInfo.position(300, 0.9*windowHeight);
}

// ='='='='='='='='='='='='='='='='='= CLICK EVENT ='='='='='='='='='='='='='='='='='=

function mouseClicked() {
  population.rollover(mouseX, mouseY)
}


// ='='='='='='='='='='='='='='='='='= RESPONSE TO HTML ELEMENTS ='='='='='='='='='='='='='='='='='=

  function nextGen() {
    var isRealTime = false
    population.setHourInfluence(); // before selection, the fitness influenced by hour has to be updated!
    population.selection();
   // population.printBrightness()
    population.reproduction();
    day.passHour(isRealTime);
  }
  
  function nextGenRealTime() {
    var isRealTime = true
    population.setHourInfluence(); // before selection, the fitness influenced by hour has to be updated!
    population.selection();
    population.reproduction();
    day.passHour(isRealTime);
  }