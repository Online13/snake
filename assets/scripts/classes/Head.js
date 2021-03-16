/**
 * @class 
 * @classdesc Head who think and direct body
 */
class Head extends Part {
	/**
	 * Create head of snake
	 * @param { number } x 
	 * @param { number } y 
	 * @param { Object } envData 
	 * @param { Function } emit 
	 */
	constructor(x=0,y=0, envData, emit) {
		super(x,y);
		this.id = null;
		this.environnement = envData;
		this.emit = emit;
		this.moveDone = true;
	}

	/**
	 * Move the head
	 * @param { string } direction 
	 * @param { Function } cb 
	 * @returns 
	 */
	move(direction, cb) {
		if (this.moveDone === false)
			return;
		// to forbidden move to opposite direction
		if (isOpposite(direction,this.direction))
			return;

		this.object.classList.remove(this.direction);
		this.direction = direction;
		this.object.classList.add(this.direction);
		
		this.moveDone = false;
		
		// if moved, stop here
		if (this.id !== null) {
			return;
		}
		
		this.id = window.setInterval(() => {
			let temp = new Position(this.position.current);
			this.position.last = new Position(this.position.current);
			temp.add(toVector(this.direction));
			if (this.environnement.get(temp) > 1) { // if collision with something like part or wall
				window.clearInterval(this.id);
				this.emit('end', false);
				return;
			} else {
				this.position.current = temp;
			}
			cb();

			this.moveDone = true;
		}, 300);
	}

	render() {
		super.render();
		this.object.classList.add('head');
		this.object.classList.add(this.direction);
	}
}

/*
DEBUG ARRAY NUM
<div class="about-content">
	<h2>Head</h2>
	</div>
	<div class="about-content">
		<table class="debug">
			${this.environnement.num().map(row => {
					return `<tr>
						${row.map(val => {
							return `<td>${val}</td>`;
						}).join('')}
					</tr>`;
			}).join('')}
		</table>
	</div>
</div>
*/