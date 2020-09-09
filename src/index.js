import {Meneger} from './Meneger'
import {Game_Data} from './Data'
import {Play_Field} from './PlayField'

const game = document.querySelector('.game')
const control = document.querySelector('.control') 
const header = document.querySelector('.header_score')

const X = 8
const Y = 12
const GAME = {}
let cell = 35

if(window.innerWidth < 600){
    cell = (window.innerWidth-window.innerWidth/2)/X
}

function create_game(){
    if(localStorage.getItem('tetris_score')){
        header.textContent = 'Your best score: ' + localStorage.getItem('tetris_score')
    }
    GAME.data = new Game_Data(X,Y)
    GAME.playfield = new Play_Field(game, cell, X, Y)
    GAME.meneger = new Meneger(GAME.data, GAME.playfield, control, cell, X, reset)
    GAME.meneger.set_game_circle()
}

function reset(){
    // delete old elements
    document.querySelectorAll('canvas').forEach(el=>el.remove())
    create_game()
}
// first start
create_game()




































