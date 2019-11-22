class Day {
    constructor(hour) {
     this.hour = 18;
    }

    // ='='='='='='='='='='='='='='='='='= time is passing ... ='='='='='='='='='='='='='='='='='=    

    passHour (){
        this.hour += 1;
        if (this.hour == 24){
            this.hour = 12;
        }
    }

    // ='='='='='='='='='='='='='='='='='= functions related to fitness ='='='='='='='='='='='='='='='='='=

    getHourInfluence(saturation, brightness){
        var influence = 0

        // ='='='='='='='='= A.M. ='='='='='='='='=
        if (this.hour>=0 && this.hour<12){
            if (brightness>=0.3){
                influence = 0.5
            }else{
                influence = -0.25
            }
        }
        // ='='='='='='='='= P.M. ='='='='='='='='=
        else{
            if(brightness<0.4){
                influence = 1.5
            }else{
                influence = -0.25
            }
        }

        return influence
    }

    // ='='='='='='='='='='='='='='='='='= ''get' methods' ='='='='='='='='='='='='='='='='='=

    getHour() {
        return this.hour;
      }
}