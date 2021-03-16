/**
 * @class 
 * @classdesc represent field where snake move and eat
 * @extends Environment
 */
class Field extends Environment {
	/**
	 * Create a field.
	 * @param {number} size - size of terrain
	 */
	constructor(size) {
		super();
		this.size = size;

		this.gamestate = this.createGameState();
		this.object = this.createObject();
		this.grid = generateArray2D(size,size);
		
		this.get = this.get.bind(this);
		this.clear = this.clear.bind(this);
		this.set = this.set.bind(this);
		this.getGrid = this.getGrid.bind(this);
		this.free = this.free.bind(this);
		
		this.data = {
			size: this.size,
			get: this.get,
			clear: this.clear,
			set: this.set,
			num: this.getGrid
		};
	}
	
	static VOID = 0;
	static PIECE = 1;
	static PART = 3;

	/**
	 * Create stategame tag and return it
	 * @return { HTMLElement } The stategame tag
	 */
	createGameState() {
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
	createObject() {
		const table = document.createElement('table');
		table.classList.add('table');
		let tr = null, td = null;
		for (let i = 0; i < this.size; i++) {
			tr = document.createElement('tr');
			for (let j = 0; j < this.size; j++) {
				td = document.createElement('td');
				td.dataset['i'] = i;
				td.dataset['j'] = j;
				adaptSizeCase(td, Game.globalSize);
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		table.appendChild(this.gamestate);
		return table;
	}

	/**
	 * Get all coordonate free in field
	 * @return { Array<Array<number>> } list of free coordonate
	 */
	free(exception) {
		let list = [];
		for (let i = 0;i < this.size;i++) {
			for (let j = 0;j < this.size;j++) {
				if (i === exception.x && j === exception.y) continue;
				if (this.grid[i][j] === 0) list.push([i,j]);
			}
		}
		return list;
	}

	/**
	 * Get value at row x, and column y
	 * @param { Position } position the coordinate
	 * @return { number } value in field
	 */
	get(position) {
		return (position.in(0,this.size)) ? this.grid[position.x][position.y] : 2;
	}

	/**
	 * Change value at given position
	 * @param { Position } position coordinate
	 * @param { number } value 0 | 1 | 2 | 3
	 */
	set(position, value) {
		if (!position.in(0,this.size)) throw new Error('position invalide');
		this.grid[position.x][position.y] = value;
	}

	/**
	 * Set value to zero at given position
	 * @param { Position } position coordinate
	 */
	clear(position) {
		this.set(position,0);
	}

	/**
	 * Access to current state of case in array
	 * @return { Array<Array<number>> } grid value
	 */
	getGrid() {
		return this.grid;
	}

	/**
	 * Show gamestate tag and show state game
	 * @param { boolean } win win game or lose
	 */
	displayGameState(win) {
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

	update() {
		document.querySelectorAll('td').forEach(td => {
			adaptSizeCase(td,Game.globalSize);
		})
	}
}