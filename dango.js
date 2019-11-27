
class Dango {
  constructor(dna_, index_) {
    this.rolloverOn = false
    this.dna = dna_; // dango's DNA
    this.index = index_
    this.fitness = 1; // How good is this dango?

    this.x = random(0.78*windowWidth)
    this.y = random(0.8*windowHeight)

    this.colorBox = new Rectangle(this.index*windowWidth/20, 0.87*windowHeight,  windowWidth/20, 0.045*windowHeight);
  }


  // ='='='='='='='='='='='='='='='='='= CHANGING FITNESS ='='='='='='='='='='='='='='='='='=

  // ='='='='='='='='= HOUR INFLUENCE ='='='='='='='='=

  getHourInfluence(){
    let genes = this.dna.genes;
    let eyes_type = floor(map(genes[11], 0, 1, 0, 3))
    let cheeks_type = floor(map(genes[12], 0, 1, 0, 2))
    this.fitness += day.getHourInfluence(genes[3], eyes_type, cheeks_type)
  }

  // ='='='='='='='='= USER INFLUENCE ='='='='='='='='=

  rollover(mx, my) {
    if (this.colorBox.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }


  // ='='='='='='='='='='='='='='='='='= DRAW THE COMPONENTS OF THIS DANGO (~ which are determined by this.genes ~) ='='='='='='='='='='='='='='='='='=

  // ='='='='='='='='= THE DANGO ITSELF ='='='='='='='='=

  display() {

    // ~ we are using the dango's DNA to pick properties for it ~

    let genes = this.dna.genes

    let bodyColor = color(genes[1], genes[2], genes[3]) // genes[3] is the one related to brightness
    let eyecolor = color(genes[4], genes[5], genes[6])
    let cheeksColor = color(genes[7], genes[8], genes[9])
    
    let body_scale = map(genes[0], 0, 1, 0.15, 0.75)
    let eye_scale = map(genes[10], 0, 1, 0.35*body_scale, 0.95*body_scale)
    let cheeks_scale = map(genes[10], 0, 1, 0.35*body_scale, 0.95*body_scale)

    let eyes_type = floor(map(genes[11], 0, 1, 0, 3))
    let cheeks_type = floor(map(genes[12], 0, 1, 0, 2))
    

    // ~ now we start drawing! ~
    
    push()

    let body_w = f_body.width*body_scale
    let body_h = f_body.height*body_scale
    

    // ~ adjusting the randomly generated coordinates (we want a full dango on screen) ~
    
    // canvas borders
    if(this.x + body_w > windowWidth){
      this.x -= body_w
    }
    if(this.y + body_h > 0.83*windowHeight){
      this.y -= body_h
    }
    // beside bottons
    if(this.x<0.05+250 && this.y<0.015*windowHeight+38+45){
      this.x += body_w
      this.y += body_h
    }


    // ='='='='='= DISPLAY_BODY ='='='='='=
    
    imageMode(CORNER)
    if (body_scale>0.3){ 
      tint(bodyColor)
      image(f_body, this.x, this.y, body_w, body_h)
      tint(255)
      image(s_body, this.x, this.y, body_w, body_h)
    }else{
      tint(bodyColor)
      image(f_body, this.x, this.y, body_w, body_h)
      tint(255)
      image(s_body, this.x, this.y, body_w, body_h)
    }


    // ='='='='='= DISPLAY_EYES ='='='='='=
    
    imageMode(CENTER)
    tint(eyecolor)
    
    if(eyes_type==0){
      image(f_eyes0, this.x+body_w/2, this.y+body_h/4, f_eyes0.width*eye_scale, f_eyes0.height*eye_scale)
    }
    if(eyes_type==1){
      image(f_eyes1, this.x+body_w/2, this.y+body_h/4, f_eyes1.width*eye_scale, f_eyes0.height*eye_scale)
    }
    if(eyes_type==2){
      image(f_eyes2, this.x+body_w/2, this.y+body_h/4, f_eyes2.width*eye_scale, f_eyes0.height*eye_scale)
    }


    // ='='='='='= DISPLAY_CHEEKS ='='='='='=
    
    if(cheeks_type==1){
      tint(cheeksColor)
      image(f_cheeks, this.x+body_w/2, this.y+(2*body_h/4), f_cheeks.width*cheeks_scale, f_cheeks.height*cheeks_scale)
      tint (255)
      image(s_cheeks0, this.x+body_w/2, this.y+(2*body_h/4), s_cheeks0.width*cheeks_scale, s_cheeks0.height*cheeks_scale)
    }
    else{
      tint (cheeksColor)
      image(s_cheeks1, this.x+body_w/2, this.y+(2*body_h/4), s_cheeks0.width*cheeks_scale, s_cheeks0.height*cheeks_scale)
    }


    // ='='='='='='='='= DISPLAY_THIS.COLORBOX ='='='='='='='='=

    stroke(0.25)
    fill (bodyColor)
    rect(this.index*windowWidth/20, 0.873*windowHeight,  windowWidth/20, 0.045*windowHeight)
    pop()


    // ='='='='='='='='= DISPLAY_THIS.FITNESS_VALUE ='='='='='='='='=

    textAlign(CENTER)
    textFont('Bebas-Regular')
    text('' + floor(this.fitness), this.index*windowWidth/20 + 0.5*windowWidth/20, 0.9*windowHeight)
    
  }


  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


  // ='='='='='='='='='='='='='='='='='= 'GET' METHODS ='='='='='='='='='='='='='='='='='=

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

}