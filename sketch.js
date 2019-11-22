// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

let day;
let population;
let generationInfo;
let hourInfo;

function setup() {
  createCanvas(800, 124);
  colorMode(HSB, 1.0, 1.0, 1.0, 1.0);
  
  let popmax = 10;
  let mutationRate = 0.05; // A pretty high mutation rate here, our population is rather small we need to enforce variety
  population = new Population(mutationRate, popmax);
  day = new Day(0)
  button = createButton("evolve new generation");
  
  button.mousePressed(nextGen);
  button.position(10, 140);
  generationInfo = createDiv('');
  generationInfo.position(10, 175);
  hourInfo = createDiv('')
  hourInfo.position(10, 200)
  
}

function draw() {
  background(1);

  population.display();
  population.rollover(mouseX, mouseY);

  generationInfo.html("Generation #:" + population.getGenerations());
  hourInfo.html("Hour#:" + day.getHour());
}


  // ='='='='='='='='='='='='='='='='='= response to html elements ='='='='='='='='='='='='='='='='='=

function nextGen() {
  population.setHourInfluence() // before selection, the fitness influenced by hour has to be updated!
  population.selection();
 // population.printBrightness()
  population.reproduction();
  day.passHour()
}