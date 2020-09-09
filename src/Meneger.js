import {Control_Panel} from './ControlPanel'
// meneger of the game 
export class Meneger{
    constructor(data, playfield, control_element, cell, X, reset){
        this.reset = reset
        this.data = data
        this.playfield = playfield
        this.control_panel = new Control_Panel(control_element, cell, X, this.control_touch.bind(this))
    
        this.control_panel.drow_buttoms()
        this.playfield.render_playfield(this.data.state.map, this.data.state.next_piese, this.data.state.score)

        this.game_circle = () => {}

        //adding listener to control keys events to moving pieses
        document.addEventListener('keydown', this.control_key_down.bind(this))
    }
    // control keys (playing computer)
    control_key_down(e){
        switch (e.keyCode) {
            case 37: //left
                this.left()
                break;
            case 38: // rotate
                this.rotate()
                break;
            case 39: // right
                this.right()
                break;
            case 40: //down
                this.down()
                break;
            default:
                break;
        }
    }
    // control keys (playing mobile)
    control_touch(e){
        switch (e) {
            case 'right':
                this.right()
                break;
            case 'left':
                this.left()
                break;  
            case 'rotate':
                this.rotate()
                break;   
            case 'down':
                this.down()
                break;
            default:
                break;
        }
    }
    // makes pieses move down
    down(){
        // move piese down
        this.data.move_piese_down()
        // rerender new field
        this.playfield.render_playfield(this.data.state.map, this.data.state.next_piese, this.data.state.score)
        // if lose 
        if(this.data.is_lose()){
            const reset_game = this.reset
            const score = this.data.state.score
            // drowing loser screen and add click to restart
            this.playfield.drow_loser(score)
            this.stop_the_game()
            document.addEventListener('click', function restart_game(){
                document.removeEventListener('click', restart_game)
                if(localStorage.getItem('tetris_score') < score){
                    localStorage.setItem('tetris_score', score)
                }
                reset_game()
            })

        }
    }
    // makes pieses move right
    right(){
        this.data.move_piese_right()
        this.playfield.render_playfield(this.data.state.map, this.data.state.next_piese, this.data.state.score)
    }
    // makes pieses move left
    left(){
        this.data.move_piese_left()
        this.playfield.render_playfield(this.data.state.map, this.data.state.next_piese, this.data.state.score)
    }
    // makes pieses rotate
    rotate(){
        this.data.rotate_piese()
        this.playfield.render_playfield(this.data.state.map, this.data.state.next_piese, this.data.state.score)
    }
    // something like a game loop
    set_game_circle(){
        this.game_circle = setInterval(()=>{
            this.down()
        }, 800)
    }
    // stop the loop
    stop_the_game(){
        clearInterval(this.game_circle)
    }
}