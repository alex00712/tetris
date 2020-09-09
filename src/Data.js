import {Element} from './Element'

export class Game_Data{

	constructor(amount_width_cells, amount_height_cells){
		this.score = 0
		this.y = amount_height_cells
		this.x = amount_width_cells
		// game map
		this.map = new Array(this.y)
		for (var y = 0; y < this.y; y++){
			this.map[y] = new Array(this.x)
			for (var x = 0; x < this.x; x++){
				this.map[y][x] = 0; 
			}
		}

		this.next_piese = this.generat_piese()
		this.current_piese = this.generat_piese()

	}

	// rotate piese with some adjustments
	rotate_piese(){
		this.current_piese.piese.rotate()

		if(this.is_piese_on_field()){
			this.current_piese.piese.rotateBack()
		}
			
		if(this.current_piese.piese.el[0].length === 4){
			this.current_piese.x-=2
		}

		if(this.current_piese.piese.el[0].length === 1){
			this.current_piese.x+=2
		}

		// to do rotation next to the wall
		this.is_piese_out_of_field((y, x)=>{
			switch (x) {
				case -1:
					this.current_piese.x+=1
					break;
				case 8:
					this.current_piese.x-=1
					break;
				case -2:
					this.current_piese.x+=2
					break;	
				default:
					break;
			}
		})

	}
	// moving single piese left, right, down and move it back if the piese is out of th field
	move_piese_left(){
		this.current_piese.x-=1
		if(this.is_piese_out_of_field()){
			this.current_piese.x+=1
		}
	}	
	move_piese_right(){
		this.current_piese.x+=1
		if(this.is_piese_out_of_field()){
			this.current_piese.x-=1
		}
	}
	move_piese_down(){
		this.current_piese.y+=1
		if(this.is_piese_out_of_field()){
			this.current_piese.y-=1
			this.lock_piese_on_the_map()
		}
	}

	// check if piese is out the field and if true call the callback to corect it 
	is_piese_out_of_field(callback){
		const el = this.current_piese.piese.el
		const { x: elX , y: elY } = this.current_piese
 		for(let y = 0; y < el.length; y++){
			for(let x = 0; x < el[y].length; x++){
				if(
					(el[y][x]!==0) &&
					(
					(this.map[elY+y] !== 0 || this.map[elY+y][elX+x] !== 0) &&
					(this.map[elY+y] === undefined || this.map[elY+y][elX+x] === undefined || this.map[elY+y][elX+x] !== 0) // 1
					)
				){
					if(callback){
						callback(elY+y, elX+x)
					}
					return true
				}
			}
		}
		return false
	}

	// check to rotation 
	is_piese_on_field(){
		const el = this.current_piese.piese.el
		const { x: elX , y: elY } = this.current_piese
		for(let y = 0; y < el.length; y++){
			for(let x = 0; x < el[y].length; x++){
				if(this.map[elY+y][elX+x] !== 0 && el[y][x] !== 0){ 		
					return true
				}
			}
		}
		return false
	}

	// lock single piese on the game map 
	lock_piese_on_the_map(){
		const el = this.current_piese.piese.el
		const { x: elX , y: elY } = this.current_piese
 		for(let y = 0; y < el.length; y++){
			for(let x = 0; x < el[y].length; x++){
				if(this.map[elY+y][elX+x] === 0){ 		
					this.map[elY+y][elX+x] = el[y][x]
				}
			}
		}

		this.update_pieses()
		this.remove_line() 
	}

	// generate new piese 
	generat_piese(){
		return {
			x: 2,
			y: 0,
			piese: new Element()
		}
	}

	// set current piese and generate next piese 
	update_pieses(){
		this.current_piese = this.next_piese
		this.next_piese = this.generat_piese()
	}

	// delete full line and add empty line 
	remove_line(){

		let indexes = []

		for(let y = 0; y < this.map.length; y++){
			let line = true
			for(let x = 0; x < this.map[y].length; x++){
				line = line && this.map[y][x]
			}
			if(line){
				indexes.push(y)
			}
		}

		if(indexes.length !== 0){
			for(let i = 0; i < indexes.length; i++){
				let new_line = new Array(this.x)
				for(let j = 0; j < new_line.length; j++){
					new_line[j] = 0
				}
				this.map.splice(indexes[i], 1)

				this.map.unshift(new_line)
			}
		
		this.update_score(indexes.length)
		}

	}

	// update score of the game 
	update_score(amount_of_lines){
		this.score += (amount_of_lines-1)*200+100
	}

	// concat main_map with single piese
	build_map_for_render(){
		const new_map = new Array(this.y)
		for(let y = 0; y < this.map.length; y++){
			new_map[y] = new Array(this.x)
			for(let x = 0; x < this.map[y].length; x++){
				new_map[y][x] = this.map[y][x]
			}
		}

		const el = this.current_piese.piese.el
		const { x: elX , y: elY } = this.current_piese

		for(let y = 0; y < el.length; y++){
			for(let x = 0; x < el[y].length; x++){
				if(new_map[elY+y][elX+x] === 0){		// 1
					new_map[elY+y][elX+x] = el[y][x]
				}
			}
		}
		return new_map
	}

	// check the game: if(lose) => true
	is_lose(){
		for(let x = 0; x < this.x; x++){
			if(this.map[0][x]!==0){
				return true
			}
		}
		return false
	}

	// get current state of th game
	get state(){
		const map = this.build_map_for_render()
		return {
			map: map,
			next_piese: this.next_piese,
			score: this.score
		}
	}

}





















































