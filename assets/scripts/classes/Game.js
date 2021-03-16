class Game {
	
	constructor(size) {
		this.size = size;
		this.about = new About('about');
		this.finished = false;
		this.audio = {
			win: new Audio('./assets/song/win.wav'),
			lose:  new Audio('./assets/song/lose.wav'),
			piece: new Audio('./assets/song/coin03.wav'),
		};
		this.init();

		window.addEventListener('resize',(e) => {
			Game.globalSize = computeSizeCase(this.size);
			console.log('resize');
		});
	}

	static globalSize = 0;

	init() {
		Game.globalSize = computeSizeCase(this.size);
		this.highscore = parseInt(localStorage.getItem('hscore')) + 5 || 5;
		this.score = 0;
		this.piece = new Piece();
		this.field = new Field(this.size);
		this.emit = this.emit.bind(this);
		this.snake = new Snake({ ...this.field.data, sound: this.audio }, this.emit);
		this.about.score = [this.score,this.highscore];
	}
	
	play() {
		this.finished = false;
		// render Field
		this.field.render();
		// render Snake
		this.snake.render();
		// render Piece
		this.piece.generate(this.field.free(this.snake.head.position.current));
		this.piece.update();
		this.piece.render();
		// set in field piece position
		this.field.set(this.piece.position, this.piece.num);
		// handle input
		this.field.onkeyup((direction) => {
			if (direction != null) this.snake.move(direction);
		})
	}

	stop() {
		this.field.delete();
		this.snake.delete();
		this.piece.delete();
		this.init();
	}

	replay() {
		this.stop();
		this.play();
	}

	emit(eventName, ...params) {
		switch (eventName) {
			case 'eat':
				this.piece.generate(this.field.free(this.snake.head.position.current));
				this.piece.update();
				this.field.set(this.piece.position, this.piece.num);
				this.score++;
				this.about.score = [this.score,this.highscore];

				if (this.score >= this.highscore) {
					localStorage.setItem('hscore', this.score);
					this.emit('end', true);
					this.snake.stop();
				}

				break;
			case 'end':
				this.finished = true;
				this.emit(params[0] ? 'win': 'lose');
				this.field.displayGameState(params[0]);
				this.field.gamestate.querySelector('button').onclick = () => {
					this.replay();
				}
				break;

			case 'win':
				this.audio.win.play();
				break;
			case 'lose':
				this.audio.lose.play();
				break;
			default:
				alert('what ?');
				break;
		}
	}
}