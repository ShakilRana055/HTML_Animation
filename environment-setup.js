let scenerios = new Array();

class Environment {
	constructor(divId, images, width){
		this.divisonSelector = document.getElementById(divId);
		this.height = this.divisonSelector.style.height;
		this.CreateStyle(images, width, this.height);
	}

	CreateStyle(imagesArray, width, height){
		let own = this;
		this.divisonSelector.ImageArray = new Array();
		imagesArray.forEach((info, index) => {
			let imageTag = document.createElement('img');
			imageTag.src = info;
			imageTag.style.position = 'absolute'; 
			imageTag.style.left = (width*index)+'px'; 
			imageTag.style.width = width+'px'; 
			imageTag.style.height = height; 
			own.divisonSelector.ImageArray[index] = imageTag;
			own.divisonSelector.appendChild(own.divisonSelector.ImageArray[index]);
			
		});
		scenerios = [...scenerios, own.divisonSelector];
		this.Movement();
	}
	Sleeper(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async Movement(){
		if (!scenerios) return;
		for (let i = scenerios.length - 1; i >= 0; i--) {

			let image = scenerios[i].ImageArray;
			let maxLength = scenerios[i].ImageArray.length;

			for (let j = 0; j < image.length; j++) {
				let currentStyle = image[j].style;
				currentStyle.left = (parseInt(currentStyle.left,10)-1)+'px';
			}
			var innerImage = scenerios[i].ImageArray[0].style; 
			if (parseInt(innerImage.left,10)+parseInt(innerImage.width,10)<0) {
				let nextStyle = scenerios[i].ImageArray.shift(); 
				nextStyle.style.left = (parseInt(nextStyle.style.left) + parseInt(nextStyle.style.width)*maxLength) + 'px'; 
				scenerios[i].ImageArray.push(nextStyle);
			}
		}
		await this.Sleeper(10);
		this.Movement();
	}

}
function start() {
	let skyImages=['Images/sky.png', 'Images/sky.png'];
	let waterImages=['Images/water2.png', 'Images/water2.png'];
	let city = ['Images/island.png', 'Images/island.png'];
	new Environment('m1', skyImages, 1100);
	new Environment('m2', waterImages, 1100);
	// new Environment('m3', city, 1100);
}
