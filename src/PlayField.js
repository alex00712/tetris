export class Play_Field{
	constructor(parent_element, cell, amount_cells_width, amount_cells_height){

		this.parent = parent_element;
		this.amount_cells_width = amount_cells_width
		this.amount_cells_height = amount_cells_height
		this.cell = cell

		// adding canvas on html doc
		this.canvas = document.createElement('canvas')
		this.canvas.setAttribute('id', 'canv')
		this.canvas.width = this.amount_cells_width*this.cell
		this.canvas.height = (this.amount_cells_height+3)*this.cell
		this.context = this.canvas.getContext('2d')
		this.parent.appendChild(this.canvas)

		// palette of pieses colors 
		this.palette = {
			1: '#00f0f0',
			2: '#a000f0',
			3: '#f0a000',
			4: '#0000f0',
			5: '#f0f000',
			6: '#00f000',
			7: '#f00000'
		}
	}

	// render function to drow game every tick
	render_playfield(map, next_piese, score){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.drow_top_border()
		this.drow_blocks(map)
		this.drow_next_block(next_piese)
		this.drow_score(score)
	}

	// dorwing blocks on the canvas 
	drow_blocks(map){
		for(let y = 0; y < map.length; y++){
			for(let x = 0; x < map[y].length; x++){
				if(map[y][x]!==0){
					this.context.beginPath()
					this.context.strokeStyle = 'black'
					// chose color by number of the cell 
					this.context.fillStyle = this.palette[map[y][x]]
					this.context.fillRect(x*this.cell, (y+3)*this.cell, this.cell, this.cell)
					this.context.strokeRect(x*this.cell, (y+3)*this.cell, this.cell, this.cell)
				}
			}
		}
	}

	// "header_panel" = right and left side
	// right side of "header_panel" that drow picture of the next piese
	drow_next_block(next_piese){
		const min_cell = this.cell/1.5
		if(next_piese){
			for(let y = 0; y < next_piese.piese.el.length; y++){
				for(let x = 0; x < next_piese.piese.el[y].length; x++){
					if(next_piese.piese.el[y][x]!==0){
						this.context.beginPath()
						this.context.strokeStyle = 'black'
						this.context.fillStyle = this.palette[next_piese.piese.el[y][x]]
						this.context.fillRect(this.cell*4.5 + x*min_cell, this.cell/2 + y*min_cell, min_cell, min_cell)
						this.context.strokeRect(this.cell*4.5 + x*min_cell, this.cell/2 + y*min_cell, min_cell, min_cell)
					}
				}
			}
		}
	}

	// left side of "header_panel" with score value
	drow_score(score){
		this.context.font = "25px Verdana";
        this.context.fillText(score, 20, 50);
	}

	// top border under score and picture of the next piese
	drow_top_border(){
		this.context.beginPath()
		this.context.moveTo(0, this.cell*3)
		this.context.lineTo(this.amount_cells_width*this.cell, this.cell*3)
		this.context.stroke()
	}

	// losing display with gaming score 
	drow_loser(score){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.context.font = "25px Verdana";
		this.context.textAlign = "center";
		this.context.fillText(score, this.amount_cells_width*this.cell/2, 100);
		this.context.fillText('Click to restart', this.amount_cells_width*this.cell/2, 200);
	}
}