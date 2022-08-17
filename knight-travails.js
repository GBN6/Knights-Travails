const tileRegistry = new Map();

const chessTile = (x, y) => {
    const xPosition = x
    const yPosition = y;
    let predecessor;

    const knightOffsets = [
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

const KnightTravails = (start, finish) => {
    tileRegistry.clear();

    const beginning = chessTile(...start);
    const end = chessTile(...finish);

    const queue = [beginning];
    while (!queue.includes(end)) {
        const currentTile = queue.shift();

        const enqueueList = currentTile.createKnightMove();
        enqueueList.forEach((tile) => tile.setPredecessor(currentTile));
        queue.push(...enqueueList);
    }
    const path = [end];
    while(!path.includes(beginning)) {
        const previousTile = path[0].getPredecessor();
        path.unshift(previousTile);
    }
    console.log(`Shortest path was ${path.length - 1} moves`)
    console.log('The moves were:');
    path.forEach(tile => console.log(tile.name()));
}

module.exports = KnightTravails;