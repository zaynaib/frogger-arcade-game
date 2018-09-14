//references
//https://www.youtube.com/watch?v=EO6OkltgudE ***
//https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
//https://www.youtube.com/watch?v=OFzs4unxVtU
//https://www.youtube.com/watch?v=8uIt9a2XBrw
// http://blog.sklambert.com/html5-canvas-game-html5-audio-and-finishing-touches
// http://blog.sklambert.com/galaxian-html5-game/ ***
//https://www.w3schools.com/howto/howto_css_modals.asp

/*
TO DOS:
Fix navigation on the game -DONE
Fix the win bounds -DONE
Create a restart function for the game ***
If i have time create mutli levels for the game -Still in progress CHECK OUT: https://codeincomplete.com/posts/game-state-in-breakout/
add sound to game CHECK OUT : https://codeincomplete.com/posts/adding-sound-to-breakout/


*/


// Enemies our player must avoid
class Entity{
    constructor(){
        this.sprite = 'images/';
        //offsetting images
        this.x = 2;
        this.y = 5;
    }

    update(dt){
        this.isOutofBoundsX = this.x > 5;
        this.isOutofBoundsY = this.x < 1;
    }

    render(){
        //the image that is being draw
        //sprite is hero, bug enemies
        //x,y location where to place the image on the canvas
        ctx.drawImage(Resources.get(this.sprite), this.x *101, this.y*83);

    } 

    checkCollisions(playerOrEnenmy) {

        // Checks if they are on the same y-axis position
        if (this.y === playerOrEnenmy.y) {

            // Checks if enemy and player share the same x axis
            if (this.x >= playerOrEnenmy.x - 0.2 && this.x <= playerOrEnenmy.x + 0.2) {
                return true;    // then its a collision #BOOM!
            }
        }
        // if they do not share an x or y space then no collosion
        else {
            return false;       
        }
    }

    modal(didPlayerWin){
          // Get the modal
          const modal = document.getElementById('myModal'); 

          //close button
          const span = document.getElementsByClassName("close")[0];

          //message
          let message = document.getElementById("message");
          console.log(message)
          
        if(didPlayerWin ===true){
         //display the modal
          message.innerHTML = 'You Win!';
          modal.style.display = "block";

        }
        //if you collide with some then the hero is dead
        if(didPlayerWin ===false){
            message.innerHTML = 'You dead';
            modal.style.display = "block"
        }

        //make the modal disappear
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    
}

class Player extends Entity{
    //player class
    constructor(){
        super();
        //the sprite is a boy
        this.sprite += 'char-cat-girl.png';
        // if its moving
        this.moving = false;
        //if the player has won
        this.win = false;
    }

    //update moves
    update(dt){
        super.update();
        //if the player reached the to the top of the gam then its a wim
        //if the play is not moving or has already declared a win
       if(this.y ==0  && !this.moving && !this.win) {
        //win will be true
        this.win =true;
        //then the modal will pop up
        this.modal(this.win);
          
        //restart the game
        this.restart();
       }
    }

     render(){
         super.render();
         //inherits entity render
         //sets moving to false

         this.moving = false;
         //set win to fasle

         this.win = false;
     }

     //player restart  function
     //sets the play to its orginal place
     // sets win to false
    restart(){
        this.x = 2;
        this.y = 5;
        this.win = false;
        
    }

    
   
    handleInput(input){
        switch(input){
            case 'left':
                this.x = this.x > 0 ? this.x-1 : this.x;
                break;
            case 'right':
                this.x = this.x <4 ? this.x +1 : this.x;
                break;
            case 'up':
                this.y = this.y >0 ? this.y-1 :this.y;
                break;
            case 'down':
                this.y = this.y < 5 ? this.y+1 : this.y;
            
            default:
                break;
        }
         //once the play hits a key stroke then the player set to moving
         this.moving = true;

    }

}

class Enemy extends Entity{
    //enemy class
    constructor(x,y){
        super();
        this.sprite += 'enemy-bug.png';
        this.x =x;
        this.y =y;

        //this.x is different from x
        //You were logging the arguments not the instance values. `console.log(x)` for arguments and `console.log(this.x)` for instance values.
        //console.log('created',this.x,this.y)
        
        
    }

    update(dt){
        super.update();
        if(this.isOutofBoundsX){
            this.x = -1;
        }
        else{
            this.x += 0.5*dt;
        }
    }

    restart(){
        super.restart();
        
    }
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();
let enemy1 = new Enemy(0,1)
let enemy2 = new Enemy(0,2)
let enemy3 = new Enemy(0,3)
let allEnemies = [enemy1,enemy2,enemy3];









