class Snake extends Actor {
	
	constructor(envData, emit) {
		super();
		this.head = new Head(3,3, envData, emit);
		this.body = [];

		this.last = null;
		this.newBody = null;
		this.environnement = envData;
		this.emit = emit;
		this.body.forEach(part => {
			this.environnement.set(part.position.current, 3);
		});
	}

	upLevel() {
		const div = (this.last === null) ? 
			new Body(this.head.position.last.x,this.head.position.last.y): 
			new Body(this.last.position.last.x,this.last.position.last.y);
		this.newBody = div;
	}

	grow() {
		this.newBody = 1;
	}

	update() {
		[this.head, ...this.body].forEach(obj => {
			obj.update();
		});
	}

	move(direction) {
		this.head.move(direction, () => {
			
			// move all parts
			this.body.forEach((part,i) => {
				this.environnement.clear(part.position.current);
				if (i === 0) {
					part.move(this.head.position.last);
				} else {
					part.move(this.body[i-1].position.last);
				}
				this.environnement.set(part.position.current, part.num);
			});
			
			
			const current = this.head.position.current;
			const have = this.environnement.get(current);
			
			if (have > 0) this.environnement.sound.piece.play();

			// flip
			this.update();

			// ask if new part added
			if ( this.newBody != null) {
				this.upLevel()
				this.newBody.render();
				this.environnement.set(this.newBody.position.current, this.newBody.num);
				this.body.push(this.newBody);
				this.last = this.newBody;
				this.newBody = null;
			}
			
			// test if eat
			if (have > 0) {
				this.environnement.clear(current)
				this.grow();
				this.emit('eat');
			}
		});
	}

	render() {
		this.head.render();
		this.body.forEach(part => {
			part.render();
		});
	}

	delete() {
		this.head.delete();
		this.body.forEach(part => {
			part.delete();
		});
	}

	stop() { window.clearInterval(this.head.id); }
}
