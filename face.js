class Face {
  constructor(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_; // Position on screen
    this.y = y_;
    this.wh = 70; // Size of square enclosing face
    this.fitness = 1; // How good is this face?
    
    // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);
  }


  // ='='='='='='='='='='='='='='='='='= methods related to fitness ='='='='='='='='='='='='='='='='='=

  
    // ='='='='='='='='= hour influence ='='='='='='='='=

    getHourInfluence(){
      let genes = this.dna.genes
      this.fitness += day.getHourInfluence(genes[2], genes[3])
    }

    // ='='='='='='='='= user influence ='='='='='='='='=

   // Increment fitness if mouse is rolling over face
   rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }


  // ='='='='='='='='='='='='='='='='='= display faces of this population ='='='='='='='='='='='='='='='='='=

  display() {
    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
    let headSize = map(genes[0], 0, 1, 50, 70);

    let mainColor = color(genes[1], genes[2], genes[3]); // genes[3] is the one related to brightness, and genes[2] is the one for saturation
    let eyecolor = color(genes[4], genes[5], genes[6]);
    let mouthColor = color(genes[7], genes[8], genes[9]);
    
    let eye_y = map(genes[4], 0, 1, 0, 5);
    let eye_x = map(genes[5], 0, 1, 0, 10);
    let eye_size = map(genes[5], 0, 1, 0, 10);
   
    let mouth_y = map(genes[5], 0, 1, 0, 25);
    let mouth_x = map(genes[5], 0, 1, -25, 25);
    let mouthw = map(genes[5], 0, 1, 0, 50);
    let mouthh = map(genes[5], 0, 1, 0, 10);

    push();
    translate(this.x, this.y);
    noStroke();

    // Draw the head
    tint(mainColor)
    image(layer0, 0-this.wh/2, 0-this.wh/2, headSize, headSize)
    tint(255)
    image(layer1, 0-this.wh/2, 0-this.wh/2, headSize, headSize)

    // Draw the eyes
    fill(eyecolor);
    rectMode(CENTER);
    rect(-eye_x, -eye_y, eye_size, eye_size);
    rect(eye_x, -eye_y, eye_size, eye_size);

    

    // Draw the mouth
    fill(mouthColor);
    rectMode(CENTER);
    rect(mouth_x, mouth_y, mouthw, mouthh);

    // Draw the bounding box
    stroke(0.25);
    if (this.rolloverOn) fill(0, 0.25);
    else noFill();
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);
    pop();

    // Display fitness value
    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    text('' + floor(this.fitness), this.x, this.y + 55);
  }


  // ='='='='='='='='='='='='='='='='='= ''get' methods' ='='='='='='='='='='='='='='='='='=

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

}