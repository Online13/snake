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
 * @function 
 * @name render
 */
GameObject.prototype.render = function () {
	parent.appendChild(this.object);
};;

/**
 * remove object to parent
 * @function 
 * @name delete
 */
GameObject.prototype.delete = function () {
	parent.removeChild(this.object);
}