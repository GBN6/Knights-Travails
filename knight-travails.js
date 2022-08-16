const tileRegistry = new Map();

const chessTile = (x, y) => {
    const xPosition = x
    const yPosition = y;
    let predecessor;

    const knightOffests = [
        [1,2], [1,-2],
        [2,1], [2,-1],
        [-1,2], [-1,-2],
        [-2,1], [-2,-1]
    ]

    const getPredecessor = () => predecessor;
    const setPredecessor = (newPredecessor) => {
        predecessor = predecessor || newPredecessor;
    }

    const name = () => `${x}, ${y}`

    const newSquareForm = (xOffSet, yOffSet) => {
        const [newX, newY] = [xPosition + xOffSet, yPosition + yOffSet];
        if ( 0 <= newX && newX < 8 && 0 <= newY && newY < 8) {
            return chessTile(newX, newY);
        }
    }


    const createKnightMove = () => {
        return knightOffsets.map((offset) => newSquareForm(offset[0], offset[1]))
                            .filter((tile) => tile !== undefined)
    }

    if (tileRegistry.has(name())) {
        return tileRegistry.get(name());
    } else {
        newTile = {name, getPredecessor, setPredecessor, createKnightMove}
        tileRegistry.set(name(), newTile);
        return newTile;
    }
}