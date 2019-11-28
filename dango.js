
class Dango {
  constructor(dna_, index_) {
    this.rolloverOn = false
    this.dna = dna_; // dango's DNA
    this.index = index_
    this.fitness = 1; // How good is this dango?

    this.x = random(0.78*windowWidth)
    this.y = random(0.8*windowHeight)

    this.colorBox = new Rectangle(this.index*windowWidth/20, 0.87*windowHeight,  windowWidth/20, 0.045*windowHeight);

    // ~ we are using the dango's DNA to pick properties for it ~

    this.bodyColor = color(this.dna.genes[1], this.dna.genes[2], this.dna.genes[3]) // this.dna.genes[3] is the one related to brightness
    this.eyecolor = color(this.dna.genes[4], this.dna.genes[5], this.dna.genes[6])
    this.cheeksColor = color(this.dna.genes[7], this.dna.genes[8], this.dna.genes[9])
    
    this.body_scale = map(this.dna.genes[0], 0, 1, 0.15, 0.75)
    this.eye_scale = map(this.dna.genes[10], 0, 1, 0.35*this.body_scale, 0.95*this.body_scale)
    this.cheeks_scale = map(this.dna.genes[10], 0, 1, 0.35*this.body_scale, 0.95*this.body_scale)

    this.eyes_type = floor(map(this.dna.genes[11], 0, 1, 0, 3))
    this.cheeks_type = floor(map(this.dna.genes[12], 0, 1, 0, 2))
  }


  // ='='='='='='='='='='='='='='='='='= CHANGING FITNESS ='='='='='='='='='='='='='='='='='=

  // ='='='='='='='='= HOUR INFLUENCE ='='='='='='='='=

  getHourInfluence(){
    this.fitness += day.getHourInfluence(this.dna.genes[3], this.eyes_type, this.cheeks_type)
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
    
    push()

    let body_w = f_body.width*this.body_scale
    let body_h = f_body.height*this.body_scale
    
    // ~ adjusting the randomly generated coordinates (we want a full dango on screen) ~
    
    
    let coordinatesAreOk = false
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
    coordinatesAreOk = true

    if (coordinatesAreOk){
        
      // ='='='='='= DISPLAY_BODY ='='='='='=
      
      imageMode(CORNER)

      if (this.body_scale>0.3){ 
        tint(this.bodyColor)
        image(f_body, this.x, this.y, body_w, body_h)
        tint(255)
        image(s_body, this.x, this.y, body_w, body_h)
      }else{
        tint(this.bodyColor)
        image(f_body_s, this.x, this.y, body_w, body_h)
        tint(255)
        image(s_body_s, this.x, this.y, body_w, body_h)
      }


      // ='='='='='= DISPLAY_EYES ='='='='='=
      
      imageMode(CENTER)
      tint(this.eyecolor)
      
      if(this.eyes_type==0){
        if (this.body_scale>0.3){
          image(f_eyes0, this.x+body_w/2, this.y+body_h/4, f_eyes0.width*this.eye_scale, f_eyes0.height*this.eye_scale)
        }else{
          image(f_eyes0_s, this.x+body_w/2, this.y+body_h/4, f_eyes0.width*this.eye_scale, f_eyes0.height*this.eye_scale)
        }
      }

      if(this.eyes_type==1){
        if (this.body_scale>0.3){
          image(f_eyes1, this.x+body_w/2, this.y+body_h/4, f_eyes1.width*this.eye_scale, f_eyes1.height*this.eye_scale)
        }else{
          image(f_eyes1_s, this.x+body_w/2, this.y+body_h/4, f_eyes1.width*this.eye_scale, f_eyes1.height*this.eye_scale)
        }
      }

      if(this.eyes_type==2){
        if (this.body_scale>0.3){
          image(f_eyes2, this.x+body_w/2, this.y+body_h/4, f_eyes2.width*this.eye_scale, f_eyes2.height*this.eye_scale)
        }else{
          image(f_eyes2_s, this.x+body_w/2, this.y+body_h/4, f_eyes2.width*this.eye_scale, f_eyes2.height*this.eye_scale)
        }
      }


      // ='='='='='= DISPLAY_CHEEKS ='='='='='=
      
      if(this.cheeks_type==1){
        if (this.body_scale>0.3){
          tint(this.cheeksColor)
          image(f_cheeks, this.x+body_w/2, this.y+(2*body_h/4), f_cheeks.width*this.cheeks_scale, f_cheeks.height*this.cheeks_scale)
          tint (255)
          image(s_cheeks0, this.x+body_w/2, this.y+(2*body_h/4), s_cheeks0.width*this.cheeks_scale, s_cheeks0.height*this.cheeks_scale)
        }else{
          tint(this.cheeksColor)
          image(f_cheeks_s, this.x+body_w/2, this.y+(2*body_h/4), f_cheeks.width*this.cheeks_scale, f_cheeks.height*this.cheeks_scale)
          tint (255)
          image(s_cheeks0_s, this.x+body_w/2, this.y+(2*body_h/4), s_cheeks0.width*this.cheeks_scale, s_cheeks0.height*this.cheeks_scale)
        }
      }

      else{
        if (this.body_scale>0.3){
          tint (this.cheeksColor)
          image(s_cheeks1, this.x+body_w/2, this.y+(2*body_h/4), s_cheeks0.width*this.cheeks_scale, s_cheeks0.height*this.cheeks_scale)
        }else{
          tint (this.cheeksColor)
          image(s_cheeks1_s, this.x+body_w/2, this.y+(2*body_h/4), s_cheeks0.width*this.cheeks_scale, s_cheeks0.height*this.cheeks_scale)
        }
      }


      // ='='='='='='='='= DISPLAY_THIS.COLORBOX ='='='='='='='='=

      stroke(0.25)
      fill (this.bodyColor)
      rect(this.index*windowWidth/20, 0.873*windowHeight,  windowWidth/20, 0.045*windowHeight)
      pop()


      // ='='='='='='='='= DISPLAY_THIS.FITNESS_VALUE ='='='='='='='='=

      textAlign(CENTER)
      textFont('Bebas-Regular')
      text('' + floor(this.fitness), this.index*windowWidth/20 + 0.5*windowWidth/20, 0.9*windowHeight)
    }
  }


  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


  // ='='='='='='='='='='='='='='='='='= 'GET' METHODS ='='='='='='='='='='='='='='='='='=

  getFitness() {
    return this.fitness
  }

  getDNA() {
    return this.dna
  }

}