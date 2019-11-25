class Face {
  constructor(dna_, index_) {
    //this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.index = index_
    this.fitness = 1; // How good is this face?

    this.x = random(0.78*windowWidth)
    this.y = random(0.7*windowHeight)

    this.colorBox = new Rectangle(this.index*windowWidth/20, 0.85*windowHeight,  windowWidth/20, 0.045*windowHeight);
  }


  // ='='='='='='='='='='='='='='='='='= methods related to fitness ='='='='='='='='='='='='='='='='='=


    // ='='='='='='='='= hour influence ='='='='='='='='=

    getHourInfluence(){
      let genes = this.dna.genes;
      this.fitness += day.getHourInfluence(genes[2], genes[3]);
    }

    // ='='='='='='='='= user influence ='='='='='='='='=

   // Increment fitness if mouse is rolling over face
   rollover(mx, my) {
    if (this.colorBox.contains(mx, my)) {
      //this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      //this.rolloverOn = false;
    }
  }

  // ='='='='='='='='='='='='='='='='='= DISPLAY ='='='='='='='='='='='='='='='='='=

  // ='='='='='='='='= DANGOS ='='='='='='='='=

  display() {
    // We are using the face's DNA to pick properties for this face
    // such as: body scale, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
    let body_scale = map(genes[0], 0, 1, 0.1, 0.8);

    let mainColor = color(genes[1], genes[2], genes[3]); // genes[3] is the one related to brightness, and genes[2] is the one for saturation
    let eyecolor = color(genes[4], genes[5], genes[6]);
    let cheeksColor = color(genes[7], genes[8], genes[9]);

    let eye_y = map(genes[4], 0, 1, 0, 5);
    let eye_x = map(genes[5], 0, 1, 0, 10);
    let eye_scale = map(genes[5], 0, 1, 0.2*body_scale, 0.95*body_scale);

    let cheeks_y = map(genes[5], 0, 1, 0, 25);
    let cheeks_x = map(genes[5], 0, 1, -25, 25);
    let cheeks_scale = map(genes[5], 0, 1, 0.1, 0.95*body_scale);
    //let cheeks_h = map(genes[5], 0, 1, 0, 10);

    push();
    //noStroke();

    let body_w = f_body.width*body_scale
    let body_h = f_body.height*body_scale
    
    // -- adjusting x and y (we want a full dango on screen!) -- 
    if(this.x + body_w > windowWidth){
      this.x -= body_w
    }
    if(this.y + body_h > 0.83*windowHeight){
      this.y -= body_h
    }

    // ='='='='='= D_BODY ='='='='='=
    imageMode(CORNER)
    tint(mainColor)
    image(f_body, this.x, this.y, body_w, body_h)
    tint(255)
    image(s_body, this.x, this.y, body_w, body_h)

    // ='='='='='= D_EYES ='='='='='=
    imageMode(CENTER)
    // Draw the eyes
    tint(eyecolor)
    image(f_eyes0, this.x+body_w/2, this.y+body_h/4, f_eyes0.width*eye_scale, f_eyes0.height*eye_scale)

    // ='='='='='= D_CHEEKS ='='='='='=
    tint(cheeksColor)
    image(f_cheeks, this.x+body_w/2, this.y+(2*body_h/4), f_cheeks.width*cheeks_scale, f_cheeks.height*cheeks_scale)
    tint (255)
    image(s_cheeks0, this.x+body_w/2, this.y+(2*body_h/4), s_cheeks0.width*cheeks_scale, s_cheeks0.height*cheeks_scale)
    

  // ='='='='='='='='= BODY COLORS ='='='='='='='='=

    // Draw the box for body color
    stroke(0.25)
    fill (mainColor)
    rect(this.index*windowWidth/20, 0.85*windowHeight,  windowWidth/20, 0.045*windowHeight)
    pop()

    // Display fitness value
    textAlign(CENTER);
    text('' + floor(this.fitness), this.index*windowWidth/20 + 0.5*windowWidth/20, 0.88*windowHeight);
  }


  // ='='='='='='='='='='='='='='='='='= ''get' methods' ='='='='='='='='='='='='='='='='='=

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

}