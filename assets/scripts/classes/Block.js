class Block extends GameObject {

	constructor(x=-1,y=-1) {
		super();
		this.position = new Position(x,y)
		this.object = null;
		this.rendered = false;
	}

	static createObject(x,y,ref) {
		const div = document.createElement('div');
			div.classList.add(ref);
			div.dataset['i'] = x;
			div.dataset['j'] = y;
		return div;
	}

	generate(free) {
		let len = free.length;
		let target = free[rand(0,len-1)];
		this.position.x = target[0];
		this.position.y = target[1];
 	}

	update() {
		this.object.dataset['i'] = this.position.x;
		this.object.dataset['j'] = this.position.y;
		adaptPosition(this.object, Game.globalSize);
	}

	render() {
		if (this.rendered)
			return;
		
		this.rendered = true;
		super.render();
	}

}