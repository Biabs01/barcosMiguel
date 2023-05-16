class Cannon {
    constructor(x, y, width, height, angle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.cannonBase = loadImage("assets/cannon_base.png");
        this.cannonImage = loadImage("assets/CANON.png");
    }

    display(){

        if(keyIsDown(LEFT_ARROW) && this.angle > -1.45){
            this.angle -= 0.02;
        }

        if(keyIsDown(RIGHT_ARROW) && this.angle < 0.80){
            this.angle += 0.02;
        }

        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.cannonImage, 0, 0, this.width, this.height);
        pop();

        image(this.cannonBase, 70, 20, 200, 200, PI, TWO_PI);
        noFill();
    }
}