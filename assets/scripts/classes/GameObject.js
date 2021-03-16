const parent = document.querySelector('.container');

/**
 * Represent an object
 * @constructs GameObject
 */
const GameObject = function() {
	this.object = null;
	
}

GameObject.prototype.update = null;

/**
 * add object to parent
 */
GameObject.prototype.render = function () {
	parent.appendChild(this.object);
	adaptSizeCase(this.object, Game.globalSize);
	adaptPosition(this.object, Game.globalSize);
};

/**
 * remove object to parent
 */
GameObject.prototype.delete = function () {
	parent.removeChild(this.object);
	this.object = null;
}