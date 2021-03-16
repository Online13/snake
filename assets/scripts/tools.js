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
/**
 * Compute the globalsize depending given size 
 * @param { number } size 
 * @return { number } globalsize
 */
function computeSizeCase(size) {
	const rect = document.body.getBoundingClientRect();
	const width = rect.width;
	const height = rect.height;
	let unit = (width > height) ? 'vh' : 'vw';

	return `${parseInt(80/size)}${unit}`;
}
/**
 * adapt size (width and height) of element 
 * @param { HTMLElement } obj 
 * @param { number } size 
 */
function adaptSizeCase(obj,size) {
	if (obj !== null) {
		obj.style.width = size;
		obj.style.height = size;
		obj.style.minWidth = size;
		obj.style.minHeight = size;
	}
}
/**
 * adapt position depending data-i and data-j attribute
 * @param { HTMLElement } obj 
 * @param { string } reff 
 */
function adaptPosition(obj, reff) {
	if (obj !== null) {
		let ref = parseInt(reff);
		let unit = reff.slice(reff.length-2);
		const x = parseInt(obj.dataset['i']);
		const y = parseInt(obj.dataset['j']);
		obj.style.top = `${ref * x}${unit}`;
		obj.style.left = `${ref * y}${unit}`;
	}
}