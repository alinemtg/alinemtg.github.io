
class Dango {
  constructor(dna_, index_) {
    this.rolloverOn = false
    this.dna = dna_ // dango's DNA
    this.index = index_
    this.fitness = 1 // How good is this dango?

    this.colorBox = new Rectangle(this.index*windowWidth/20, 0.87*windowHeight,  windowWidth/20, 0.045*windowHeight);

    // ~ we are using the dango's DNA to pick properties for it ~

    this.bodyColor = color(this.dna.genes[1], this.dna.genes[2], this.dna.genes[3]) // this.dna.genes[3] is the one related to brightness
    this.eyecolor = color(this.dna.genes[4], this.dna.genes[5], this.dna.genes[6])
    this.cheeksColor = color(this.dna.genes[7], this.dna.genes[8], this.dna.genes[9])
    
    this.body_scale = map(this.dna.genes[0], 0, 1, 0.15, 0.70)
    this.eye_scale = map(this.dna.genes[10], 0, 1, 0.35*this.body_scale, 0.95*this.body_scale)
    this.cheeks_scale = map(this.dna.genes[11], 0, 1, 0.35*this.body_scale, 0.95*this.body_scale)

    this.eyes_type = Math.floor(map(this.dna.genes[12], 0, 1, 0, 3))
    this.cheeks_type = Math.floor(map(this.dna.genes[13], 0, 1, 0, 2))

    this.body_w = f_body.width*this.body_scale
    this.body_h = f_body.height*this.body_scale

    this.x = Math.random()*(0.95*windowWidth-this.body_w)+0.03*windowWidth
    this.y = Math.random()*(0.8*(windowHeight-this.body_h))
  }


  // ='='='='='='='='='='='='='='='='='= CHANGING FITNESS ='='='='='='='='='='='='='='='='='=


  // ='='='='='='='='= HOUR INFLUENCE ='='='='='='='='=

  getHourInfluence(){
    this.fitness += day.getHourInfluence(this.dna.genes[3], this.eyes_type, this.cheeks_type)
  }


  // ='='='='='='='='= USER INFLUENCE ='='='='='='='='=

  rollover(mx, my) {
    if (this.colorBox.contains(mx, my)) {
      this.shake()
      this.fitness += 0.25
    }
  }

  shake(){
    for (let i=0; i<50; i++){
    this.x += Math.random()*(2-(-2))+(-2)
    this.y += Math.random()*(2-(-2))+(-2)
    }
  }
  

  // ='='='='='='='='='='='='='='='='='= DRAW THE COMPONENTS OF THIS DANGO (~ which are determined by this.genes ~) ='='='='='='='='='='='='='='='='='=


  // ='='='='='='='='= THE DANGO ITSELF ='='='='='='='='=

  display() {
   
    push()
           
    // ='='='='='= DISPLAY_BODY ='='='='='=
      
    imageMode(CORNER)

    if (this.body_scale>0.4){ 
      tint(this.bodyColor)
      image(f_body, this.x, this.y, this.body_w, this.body_h)
      tint(255)
      image(s_body, this.x, this.y, this.body_w, this.body_h)
    }else{
      tint(this.bodyColor)
      image(f_body_s, this.x, this.y, this.body_w, this.body_h)
      tint(255)
      if (this.body_scale<0.25){
        image(s_body_ss, this.x, this.y, this.body_w, this.body_h)
        image(s_body_ss, this.x, this.y, this.body_w, this.body_h)
      }else{
        image(s_body_s, this.x, this.y, this.body_w, this.body_h)
        image(s_body_s, this.x, this.y, this.body_w, this.body_h)
      }
    }


    // ~~ for eyes and cheeks : 
    let eyes_cheeks_x = this.x+this.body_w/2
    let eyes_cheeks_y =  this.y+this.body_h/4


    // ='='='='='= DISPLAY_EYES ='='='='='=
    
    imageMode(CENTER)
    tint(this.eyecolor)
    
    if(this.eyes_type==0){
      if (this.body_scale>0.3){
        image(f_eyes0, eyes_cheeks_x,eyes_cheeks_y, f_eyes0.width*this.eye_scale, f_eyes0.height*this.eye_scale)
      }else{
        image(f_eyes0_s, eyes_cheeks_x,eyes_cheeks_y, f_eyes0.width*this.eye_scale, f_eyes0.height*this.eye_scale)
      }
    }

    if(this.eyes_type==1){
      if (this.body_scale>0.3){
        image(f_eyes1, eyes_cheeks_x,eyes_cheeks_y, f_eyes1.width*this.eye_scale, f_eyes1.height*this.eye_scale)
      }else{
        image(f_eyes1_s, eyes_cheeks_x,eyes_cheeks_y, f_eyes1.width*this.eye_scale, f_eyes1.height*this.eye_scale)
      }
    }

    if(this.eyes_type==2){
      if (this.body_scale>0.3){
        image(f_eyes2, eyes_cheeks_x,eyes_cheeks_y, f_eyes2.width*this.eye_scale, f_eyes2.height*this.eye_scale)
      }else{
        image(f_eyes2_s, eyes_cheeks_x,eyes_cheeks_y, f_eyes2.width*this.eye_scale, f_eyes2.height*this.eye_scale)
      }
    }


    // ='='='='='= DISPLAY_CHEEKS ='='='='='=
    
    if(this.cheeks_type==1){
      if (this.body_scale>0.3){
        tint(this.cheeksColor)
        image(f_cheeks, eyes_cheeks_x, this.y+(2*this.body_h/4), f_cheeks.width*this.cheeks_scale, f_cheeks.height*this.cheeks_scale)
        tint (255)
        image(s_cheeks0, eyes_cheeks_x, this.y+(2*this.body_h/4), s_cheeks0.width*this.cheeks_scale, s_cheeks0.height*this.cheeks_scale)
      }else{
        tint(this.cheeksColor)
        image(f_cheeks_s, eyes_cheeks_x, this.y+(2*this.body_h/4), f_cheeks.width*this.cheeks_scale, f_cheeks.height*this.cheeks_scale)
        tint (255)
        image(s_cheeks0_s, eyes_cheeks_x, this.y+(2*this.body_h/4), s_cheeks0.width*this.cheeks_scale, s_cheeks0.height*this.cheeks_scale)
      }
    }

    else{
      tint (this.cheeksColor)
      if (this.body_scale>0.3){
        image(s_cheeks1, eyes_cheeks_x, this.y+(2*this.body_h/4), s_cheeks0.width*this.cheeks_scale, s_cheeks0.height*this.cheeks_scale)
      }else{
        image(s_cheeks1_s, eyes_cheeks_x, this.y+(2*this.body_h/4), s_cheeks0.width*this.cheeks_scale, s_cheeks0.height*this.cheeks_scale)
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


  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  

  // ='='='='='='='='='='='='='='='='='= ADJUSTING COORDINATES (we want a full dango on screen) ='='='='='='='='='='='='='='='='='=

  adjustCoordinates(){   

    // beside bottons
    if(this.x<0.05+250 && this.y<0.015*windowHeight+38+45){
      this.x += this.body_w
      this.y += this.body_h
    }
  }


  // ='='='='='='='='='='='='='='='='='= 'GET' METHODS ='='='='='='='='='='='='='='='='='=

  getFitness() {
    return this.fitness
  }

  getDNA() {
    return this.dna
  }

}