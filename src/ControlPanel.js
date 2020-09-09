export class Control_Panel{
    constructor(parent, cell, amount_cells_width, callback){
        this.parent = parent
        this.cell = cell
        this.height = cell*2
        this.width = cell*amount_cells_width
        this.buttom_lenght = this.width/4

        // wrap callback function to call the right piese moving by touching 
        this.callback = (e) => {
           if(e.offsetX <= this.buttom_lenght){
               callback('left')
           }
           else if(e.offsetX > this.buttom_lenght && e.offsetX <= this.buttom_lenght*2){
                callback('rotate')
           }
           else if(e.offsetX > this.buttom_lenght*2 && e.offsetX <= this.buttom_lenght*3){
                callback('down')
           }
           else{
                callback('right')
           }
        }
        // adding control panel to html document
        this.canvas = document.createElement('canvas')
		this.canvas.setAttribute('id', 'canv_control')
		this.canvas.width = this.width
		this.canvas.height = this.height
		this.context = this.canvas.getContext('2d')
        this.parent.appendChild(this.canvas)

        // add event control of touching on the panel
        this.canvas.addEventListener('click', (e)=>{
            this.callback(e)
        })
    }
    // drow buttons to control the game by finger or mouth
    drow_buttoms(){
        for(let i = 0; i < 4; i++){
            this.context.beginPath()
            this.context.moveTo(i*this.buttom_lenght, 0);
            this.context.lineTo(i*this.buttom_lenght, this.cell*2);
            this.context.stroke()
            switch (i) {
                // left button
                case 0:
                    this.context.beginPath();
                    this.context.moveTo(this.buttom_lenght*2/3 ,this.height/5);
                    this.context.lineTo(this.buttom_lenght*2/3 ,this.height*4/5);
                    this.context.lineTo(this.buttom_lenght/3 ,this.height/2);
                    this.context.fill();
                    break;
                // rotate button
                case 1:
                    this.context.beginPath();
                    this.context.arc(this.width*3/8, this.height/2, this.height*3/10, 0, Math.PI*2, true);
                    this.context.stroke();
                    break;
                // down button
                case 2:
                    this.context.beginPath();
                    this.context.moveTo(this.buttom_lenght*i + this.buttom_lenght/3 ,this.height/5);
                    this.context.lineTo(this.buttom_lenght*i + this.buttom_lenght*2/3 ,this.height/5);
                    this.context.lineTo(this.buttom_lenght*i + this.buttom_lenght/2 ,this.height*4/5);
                    this.context.fill();
                    break;
                // left button
                case 3:
                    this.context.beginPath();
                    this.context.moveTo(this.buttom_lenght*i + this.buttom_lenght/3 ,this.height/5);
                    this.context.lineTo(this.buttom_lenght*i + this.buttom_lenght/3 ,this.height*4/5);
                    this.context.lineTo(this.buttom_lenght*i + this.buttom_lenght*2/3 ,this.height/2);
                    this.context.fill();
                    break;
                default:
                    break;
            }

        }
    }

}