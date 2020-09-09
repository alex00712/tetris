export class Element{
    constructor(){
        this.count = 0
        this.variants_of_T_elemnt = this.constructor.createPiese()
    }

    // create random piese
    static createPiese(){
        const p = Math.floor(Math.random()*7) + 1
        switch (p) {
            case 1:
                return I()
            case 2:
                return T()
            case 3:
                return L()
            case 4:
                return J()
            case 5:
                return O()
            case 6:
                return S()
            case 7:
                return Z()
            default:
                break;
        }
    }

    // set rotation count 
    rotate(){
        this.count !== 3 ? this.count+=1 : this.count = 0
    }

    // set back rotation count 
    rotateBack(){
        this.count !== 0 ? this.count-=1 : this.count = 3
    }

    //get current element with current position
    get el(){
        return this.variants_of_T_elemnt[this.count]
    }

} 

// constructors of elements
function I(){
    return {
        0: [
            [1,1,1,1]
        ],
        1: [
            [1],
            [1],
            [1],
            [1]
        ],
        2: [
            [1,1,1,1]
        ],
        3: [
            [1],
            [1],
            [1],
            [1]
        ]
    }
}

function T(){
    return {
        0: [
            [0,2,0],
            [2,2,2]
        ],
        1: [
            [2,0],
            [2,2],
            [2,0]
        ],
        2: [
            [2,2,2],
            [0,2,0]
        ],
        3: [
            [0,2],
            [2,2],
            [0,2]
        ]
    }
}

function L(){
    return {
     0: [
            [0,0,3],
            [3,3,3]
        ],
        1: [
            [3,0],
            [3,0],
            [3,3]
        ],
        2: [
            [3,3,3],
            [3,0,0]
        ],
        3: [
            [3,3],
            [0,3],
            [0,3]
        ]
    }
}

function J(){
    return {
    0: [
            [4,0,0],
            [4,4,4]
        ],
        1: [
            [4,4],
            [4,0],
            [4,0]
        ],
        2: [
            [4,4,4],
            [0,0,4]
        ],
        3: [
            [0,4],
            [0,4],
            [4,4]
        ]
    }
}

function O(){
    return {
    0: [
            [5,5],
            [5,5]
        ],
        1: [
            [5,5],
            [5,5]
        ],
        2: [
            [5,5],
            [5,5]
        ],
        3: [
            [5,5],
            [5,5]
        ]
    }
}

function S(){
    return {
    0: [
            [0,6,6],
            [6,6,0]
        ],
        1: [
            [6,0],
            [6,6],
            [0,6]
        ],
        2: [
            [0,6,6],
            [6,6,0]
        ],
        3: [
            [6,0],
            [6,6],
            [0,6]
        ]
    }
}

function Z(){
    return {
    0: [
            [7,7,0],
            [0,7,7]
        ],
        1: [
            [0,7],
            [7,7],
            [7,0]
        ],
        2: [
            [7,7,0],
            [0,7,7]
        ],
        3: [
            [0,7],
            [7,7],
            [7,0]
        ]
    }
}
