
class Day {
    constructor(hour) {
        var today = new Date();
        this.hour = today.getHours();
    }


  // ='='='='='='='='='='='='='='='='='= TIME IS PASSING ... ='='='='='='='='='='='='='='='='='=

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

    
  // ='='='='='='='='='='='='='='='='='= CHANGING FITNESS ='='='='='='='='='='='='='='='='='=

    getHourInfluence(brightness, eyes_type, cheeks_type){
        var influence = 1


    // ='='='='='='='='= A.M. ='='='='='='='='=

        if (this.hour>=5 && this.hour<10){
            if (brightness>=0.3){
                influence = influence * 1.50
            }else{
                influence = influence *  0.50
            }

            if (eyes_type == 1) {
                influence = influence * 1.30
            } else if (eyes_type == 2) {
                influence = influence * 0.70
            }

        } else if (this.hour>=10 && this.hour<15) {
            if (brightness>=0.3){
                influence = influence *  1.7
            }else{
                influence = influence * 0.3
            }

            if (eyes_type == 1) {
                influence = influence * 1.60
            } else if (eyes_type == 2) {
                influence = influence * 0.40
            }
        }


    // ='='='='='='='='= P.M. ='='='='='='='='=

          else if (this.hour>=15 && this.hour<19) {
            if(brightness<0.4){
                influence = influence *  1.35
            }else{
                influence = influence * 0.65
            }

            if (eyes_type == 1) {
                influence = influence * 0.80
            } else if (eyes_type == 2) {
                influence = influence * 1.20
            }
        }
        else if (this.hour>=19 && this.hour<2) {
            if(brightness<0.4){
                influence = influence * 1.75
            }else{
                influence = influence * 0.25
            }

            if (eyes_type == 1) {
                influence = influence * 0.4
            } else if (eyes_type == 2) {
                influence = influence * 1.6
            }
        } else {
            if(brightness>=0.3){
                influence = influence * 0.5
            }else{
                influence = influence * 0.9
            }
            if (eyes_type == 1) {
                influence = influence * 0.5
            } else if (eyes_type == 2) {
                influence = influence * 1.8
            }
        }
        return influence
    }


  // ='='='='='='='='='='='='='='='='='= 'GET' METHODS ='='='='='='='='='='='='='='='='='=

    getHour() {
        return this.hour;
      }
}