class About {
	constructor(ref) {
		this.root = document.getElementById(ref);
	}
	
	set score(value) {
		this.root.innerHTML = `
			<div class="about-content">
				<strong>score:<strong> ${value[0]}
				<br/>
				<strong>goal:<strong> ${value[1]}
			</div>
		`;
	}
}
