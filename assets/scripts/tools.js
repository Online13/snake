function rand(min,max) {
	return parseInt(Math.random() * (max-min) + min);
}

function isOpposite(direction, currentDirection) {
	switch (direction) {
		case 'right': return (currentDirection === 'left');
		case 'left': return (currentDirection === 'right');
		case 'up': return (currentDirection === 'down')
		case 'down': return (currentDirection === 'up');
		default : return false;
	}
}

function generateArray2D(row,col) {
	let array = new Array(row);
	for (let i = 0;i < row;i++) {
		array[i] = new Array(col);
		array[i].fill(0);
	}
	return array;
}

function toVector(direction) {
	switch (direction) {
		case 'right': return [ 0, 1 ];
		case 'left': return [ 0,-1 ];
		case 'up': return [-1, 0 ];
		case 'down': return [ 1, 0 ];
		default : return null;
	}
}