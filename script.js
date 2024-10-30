function drawTetrisPlayground(x, y, target) {
    if (x <= 0 || y <= 0) throw new Error('x and y cannot be negative')

    if(target.children.length) throw new Error('Aborted: target element should be empty');

    for(let rowsCount = 0; rowsCount < y; rowsCount++) {
        const row = document.createElement('div')
        row.className = 'row'
        row.dataset['row'] = rowsCount;
        row.style.transform = `translateY(${-rowsCount}px)`

        for(let cellsCount = 0; cellsCount < x; cellsCount++) {
            const cell = document.createElement('div')
            cell.className = 'cell'
            cell.dataset['cell'] = cellsCount
            cell.style.transform = `translateX(${-cellsCount}px)`
            row.append(cell)
        }

        target.append(row)
    }
}

const tetrisPlaygroundTarget = document.querySelector('.tetris-playground')
// drawTetrisPlayground(-10, -20, tetrisPlaygroundTarget)
drawTetrisPlayground(10, 20, tetrisPlaygroundTarget)

try {
    drawTetrisPlayground(10, 20, tetrisPlaygroundTarget)
} catch(e) {
    console.log(e.message)
}


const shapes = {
    I: [[1],
        [1],
        [1],
        [1]],

    J: [[0, 1],
        [0, 1],
        [1, 1]],

    L: [[1, 0],
        [1, 0],
        [1, 1]], 

    O: [[1, 1],
        [1, 1]], 

    S: { 
        shape: [[0, 1, 1],
                 [1, 1, 0]],
         color: 'yellowgreen'
        }, 

    T: [[1, 1, 1],
        [0, 1, 0]], 

    Z: [[1, 1, 0],
        [0, 1, 1]]
} 

const shapeKeys = Object.keys(shapes)

const shapeKeyIndex = Math.floor(Math.random() * shapeKeys.length)

// [0; 1) -> 0 ... 0.99999999999
//        -> 0 * 7 ... 0.99999999999 * 7
//        -> 0 ... 6.99999999999 
const shapeKey = shapeKeys[shapeKeyIndex]

// const currentShape = shapes[shapeKey]
const currentShape = shapes.S
const rowsToColor = currentShape.shape.length
const cellsToColor = currentShape.shape[0].length
console.log(shapes.S)
console.log(currentShape.shape.length) // rows
console.log(currentShape.shape[0].length) // cels

for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
    const row = tetrisPlaygroundTarget.children[rowIndex];

    for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
        const cell = row.children[cellIndex];
        if (currentShape.shape[rowIndex][cellIndex]) {
            cell.style.backgroundColor = currentShape.color;
        }
    }
}

console.log()









