const menu = document.querySelector('.menu');
const btn_next = document.querySelector('.play');
const btn_prev = document.querySelector('.return');

let game = null;

btn_next.addEventListener('click', e => {
	menu.classList.add('close');
	game = new Game(10);
	game.play();
})

btn_prev.addEventListener('click', e => {
	menu.classList.remove('close');
	if (!game.finished) game.stop();
});