/**
 * @class 
 * @classdesc represent field where snake move and eat
 * @extends GameObject
 */
class Field extends GameObject {
	/**
	 * Create a field.
	 * @param {number} size - size of terrain
	 */
	constructor(size) {
		super();
		this.size = size;
		this.object = this.create();
		this.numeric = generateArray2D(size,size);
		
		this.get = this.get.bind(this);
		this.remove = this.remove.bind(this);
		this.save = this.save.bind(this);
		this.getNumeric = this.getNumeric.bind(this);
		this.getFree = this.getFree.bind(this);
		
		this.data = { 
			size: this.size,
			get: this.get,
			remove: this.remove,
			save: this.save,
			num: this.getNumeric
		};
	}

	/**
	 * Create stategame tag and return it
	 * @return { HTMLElement } The stategame tag
	 */
	static stateGame() {
		const div = document.createElement('div');
			div.classList.add('state-game');
			div.classList.add('none');
			div.innerHTML = `<div><h1></h1><button>replay ?</button></div>`;
		return div;
	}

	/**
	 * Create table tag and add stategame tag
	 * @return { HTMLElement } The field tag
	 */
	create() {
		const table = document.createElement('table');
		table.classList.add('table');
		let tr = null, td = null;
		for (let i = 0; i < this.size; i++) {
			tr = document.createElement('tr');
			for (let j = 0; j < this.size; j++) {
				td = document.createElement('td');
				td.dataset['i'] = i;
				td.dataset['j'] = j;
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		this.gamestate = Field.stateGame();
		table.appendChild(this.gamestate);
		return table;
	}

	/**
	 * Get all coordonate free in field
	 * @return { Array<Array<number>> } list of free coordonate
	 */
	getFree(exception) {
		let free = [];
		for (let i = 0;i < this.size;i++) {
			for (let j = 0;j < this.size;j++) {
				if (i === exception.x && j === exception.y) continue;
				if (this.numeric[i][j] === 0) free.push([i,j]);
			}
		}
		return free;
	}

	/**
	 * Get value at row x, and column y
	 * @param { number | Position } x if number, row value else, the coordinate
	 * @param { number | null } y if number, column value else, null
	 * @return { number } value in field : 0 if void, 1 if piece and 2 if outside of field, 3 if part of snake
	 */
	get(x,y=null) {
		let pos = (x instanceof Position) ? x : new Position(x,y);
		return (pos.in(0,this.size)) ? this.numeric[pos.x][pos.y] : 2;
	}

	/**
	 * Change value at given position
	 * @param { Position } position coordinate
	 * @param { number } value 0 | 1 | 2 | 3
	 */
	save(position, value) {
		this.numeric[position.x][position.y] = value;
	}

	/**
	 * Set value to zero at given position
	 * @param { Position } position coordinate
	 */
	remove(position) {
		this.numeric[position.x][position.y] = 0;
	}

	/**
	 * Access to current state of case in array
	 * @return { Array<Array<number>> } numeric value
	 */
	getNumeric() {
		return this.numeric;
	}

	/**
	 * Show gamestate tag and show state game
	 * @param { boolean } win win game or lose
	 */
	end(win) {
		let state = win ? 'win' : 'lose';
		this.gamestate.classList.remove('none');
		this.gamestate.classList.add(state);
		this.gamestate.querySelector('h1').innerHTML = state.toUpperCase();
	}

	/**
	 * Alert when user click on arrow touch
	 * @param { Function } cb function to call when arrow touch clicked
	 */
	onkeyup(cb) {
		window.addEventListener('keyup', e => {
			switch (e.key) {
				case 'ArrowRight': cb('right'); break;
				case 'ArrowLeft': cb('left'); break;
				case 'ArrowUp': cb('up'); break;
				case 'ArrowDown': cb('down'); break;
			}
		});
	}
}