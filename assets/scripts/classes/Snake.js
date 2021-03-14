class Snake extends GameObject {
	constructor(envData, emit) {
		super();
		this.head = new Head(3,3, envData, emit);
		this.last = null;
		this.body = [];
		this.newBody = null;
		this.environnement = envData;
		this.emit = emit;

		this.audio = document.createElement('audio');
		this.audio.src = "./assets/song/coin03.wav";
		this.loaded = false;

		this.body.forEach(part => {
			this.environnement.save(part.position.current, 3);
		});

		this.audio.oncanplay = () => {
			this.loaded = true;
		}
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
				this.environnement.remove(part.position.current);
				if (i === 0) {
					part.move(this.head.position.last);
				} else {
					part.move(this.body[i-1].position.last);
				}
				this.environnement.save(part.position.current, 3);
			});
			
			
			const current = this.head.position.current;
			const have = this.environnement.get(current);
			
			if (have > 0 && this.loaded) this.audio.play();

			// flip
			this.update();

			// ask if new part added
			if ( this.newBody != null) {
				this.upLevel()
				this.newBody.render();
				this.environnement.save(this.newBody.position.current, 3);
				this.body.push(this.newBody);
				this.last = this.newBody;
				this.newBody = null;
			}
			
			// test if eat
			if (have > 0) {
				this.environnement.remove(current)
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

	stop() {
		window.clearInterval(this.head.id);
	}
}
