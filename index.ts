import { shapes } from "./shapes.js";

function drawTetrisPlayground(x: number, y: number, target: HTMLElement): void {
    if (x <= 0 || y <= 0) throw new Error('x and y cannot be negative');
    if (target.children.length) throw new Error('Aborted: target element should be empty');

    for (let rowsCount = 0; rowsCount < y; rowsCount++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.dataset['row'] = rowsCount.toString(); // Приводим к строке для dataset
        row.style.transform = `translateY(${-rowsCount}px)`;

        for (let cellsCount = 0; cellsCount < x; cellsCount++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset['cell'] = cellsCount.toString();
            cell.style.transform = `translateX(${-cellsCount}px)`;
            row.append(cell);
        }
        target.append(row);
    }
}

let tetrisPlaygroundTarget: HTMLElement;

document.addEventListener('DOMContentLoaded', () => {
    tetrisPlaygroundTarget = document.querySelector('.tetris-playground') as HTMLElement;

    try {
        drawTetrisPlayground(10, 20, tetrisPlaygroundTarget);
    } catch (e) {
        console.log(e.message);
    }

    const shapeKeys = Object.keys(shapes);
    const shapeKeyIndex = Math.floor(Math.random() * shapeKeys.length);
    const shapeKey = shapeKeys[shapeKeyIndex];
    const currentShape = shapes[shapeKey];

    function rotateShape(shape: number[][]): number[][] {
        if (shape.length === 2 && shape[0].length === 2) return shape;

        const rotatedShape: number[][] = Array.from({ length: shape[0].length }, () => []);
        for (let i = shape.length - 1; i >= 0; i--) {
            for (let j = 0; j < shape[0].length; j++) {
                rotatedShape[j][shape.length - 1 - i] = shape[i][j];
            }
        }
        return rotatedShape;
    }

    function removePreviousShape(): void {
        const rowsToColor = currentShape.shape.length;
        const cellsToColor = currentShape.shape[0].length;

        for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
            const row = tetrisPlaygroundTarget.children[rowIndex] as HTMLElement;
            for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
                const cell = row.children[cellIndex] as HTMLElement;
                if (currentShape.shape[rowIndex][cellIndex]) {
                    cell.style.backgroundColor = ''; // Очистка цвета
                }
            }
        }
    }

    function renderShape(): void {
        const rowsToColor = currentShape.shape.length;
        const cellsToColor = currentShape.shape[0].length;

        for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
            const row = tetrisPlaygroundTarget.children[rowIndex] as HTMLElement;
            for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
                const cell = row.children[cellIndex] as HTMLElement;
                if (currentShape.shape[rowIndex][cellIndex]) {
                    cell.style.backgroundColor = currentShape.color; // Установка нового цвета
                }
            }
        }
    }

    // Первоначальный вызов функции для рендера
    renderShape();

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            removePreviousShape(); // Удаляем старую форму
            currentShape.shape = rotateShape(currentShape.shape); // Поворачиваем форму
            renderShape(); // Рисуем новую форму
        }
    });
});
