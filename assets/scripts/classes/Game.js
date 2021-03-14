class Game {
	
	constructor(size) {
		this.about = new About('about');
		this.init(size);
		this.finished = false;
		this.audio = {
			win: document.createElement('audio'),
			lose: document.createElement('audio'),
		};
		this.audio.win.src = './assets/song/win.wav';
		this.audio.lose.src = './assets/song/lose.wav';
	}

	init(size) {
		this.highscore = parseInt(localStorage.getItem('hscore')) + 5 || 5;
		this.score = 0;
		this.size = size;
		this.piece = new Piece()
		this.field = new Field(size);
		this.emit = this.emit.bind(this);
		this.snake = new Snake(this.field.data, this.emit);
		this.about.score = [this.score,this.highscore];
	}
	
	play() {
		this.finished = false;
		// render Field
		this.field.render();
		// render Snake
		this.snake.render();
		// render Piece
		this.piece.generate(this.field.getFree(this.snake.head.position.current));
		this.piece.update();
		this.piece.render();
		// save in field piece position
		this.field.save(this.piece.position, 1);
		// handle input
		this.field.onkeyup((direction) => {
			if (direction != null) this.snake.move(direction);
		})
	}

	stop() {
		this.field.delete();
		this.piece.delete();
		this.snake.delete();
		this.init(this.size);
	}

	replay() {
		this.stop();
		this.play();
	}

	emit(eventName, ...params) {
		switch (eventName) {
			case 'eat':
				this.piece.generate(this.field.getFree(this.snake.head.position.current));
				this.piece.update();
				this.field.save(this.piece.position, 1);;
				this.score++;
				this.about.score = [this.score,this.highscore];;

				if (this.score >= this.highscore) {
					localStorage.setItem('hscore', this.score);
					this.emit('end', true);
					this.snake.stop();
				}

				break;
			case 'end':
				this.finished = true;
				params[0] ? this.audio.win.play() : this.audio.lose.play();
				this.field.end(params[0]);
				this.field.gamestate.querySelector('button').onclick = () => {
					this.replay();
				}
				break;
			default:
				alert('what ?');
				break;
		}
	}
}