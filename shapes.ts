type Shape = {
    shape: number[][]; // Массив массивов чисел
    color: string;     // Цвет фигуры
};

type Shapes = {
    [key: string]: Shape; // Объект с ключами в виде строк, соответствующих фигурам
};

export let shapes: Shapes =  {
    S: {
        shape: [[0, 1, 1],
        [1, 1, 0]],
        color: 'yellowgreen'
    },

    Z: {
        shape: [[1, 1, 0],
        [0, 1, 1]],
        color: 'red'
    },

    T: {
        shape: [[1, 1, 1],
        [0, 1, 0]],
        color: 'purple'
    },

    O: {
        shape: [[1, 1],
        [1, 1]],
        color: 'yellow'
    },

    J: {
        shape: [[0, 1],
        [0, 1],
        [1, 1]],
        color: 'blue'
    },

    L: {
        shape: [[1, 0],
        [1, 0],
        [1, 1]],
        color: 'orange'
    },

    I: {
        shape: [[1],
        [1],
        [1],
        [1]],
        color: 'aqua'
    }
}