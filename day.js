class Day {
    constructor(hour) {
        var today = new Date();
        this.hour = today.getHours();
    }

    // ='='='='='='='='='='='='='='='='='= time is passing ... ='='='='='='='='='='='='='='='='='=

    passHour (isRealTime){
        if(isRealTime) {
            var today = new Date();
            this.hour = today.getHours();
        } else {
            this.hour += 1;
            if (this.hour == 24){
                this.hour = 0;
            }
        }
    }

    // ='='='='='='='='='='='='='='='='='= methods related to fitness ='='='='='='='='='='='='='='='='='=

    getHourInfluence(saturation, brightness){
        var influence = 0

        // ='='='='='='='='= A.M. ='='='='='='='='=
        if (this.hour>=5 && this.hour<10){
            if (brightness>=0.3){
                influence = 1.25
            }else{
                influence = 0.75
            }
        } else if (this.hour>=10 && this.hour<15) {
            if (brightness>=0.3){
                influence = 1.50
            }else{
                influence = 0.50
            }
        }
        // ='='='='='='='='= P.M. ='='='='='='='='=
          else if (this.hour>=15 && this.hour<19) {
            if(brightness<0.4){
                influence = 1.5
            }else{
                influence = 0.5
            }
        }
        else if (this.hour>=19 && this.hour<2) {
            if(brightness<0.4){
                influence = 1.7
            }else{
                influence = 0.3
            }
        } else {
            if(brightness>=0.3){
                influence = 1.1
            }else{
                influence = 0.9
            }
        }
        return influence
    }

    // ='='='='='='='='='='='='='='='='='= ''get' methods' ='='='='='='='='='='='='='='='='='=

    getHour() {
        return this.hour;
      }
}