function updateInfoBlock(region) {
	const infoBlock = document.querySelector(".info");
	infoBlock.classList.add("active");
	switch(region) {
		case 'russian':
			infoBlock.innerHTML = russian_info;
			break;
		
		case 'komi':
			infoBlock.innerHTML = komi_info;
			break;
		
		case 'tatar':
			infoBlock.innerHTML = tatar_info;
			break;
		
		case 'turkic':
			infoBlock.innerHTML = turkic_info;
			break;
		
		case 'finno-ugric':
			infoBlock.innerHTML = finno_ugric_info;
			break;
		
		case 'turkic-finno':
			infoBlock.innerHTML = turkic_finno_info;
			break;
			
		default:
			infoBlock.classList.remove("active");
			infoBlock.innerHTML = `
			<h3>Информация</h3>
			`;
	}
	
	if(document.getElementById("prevImageBtn")){	
		document.getElementById("prevImageBtn").addEventListener("click", () => {
			currentIndex = (currentIndex - 1 + images1.length) % images1.length;
			console.log("right")
			updateImage();
		});
	}

	if(document.getElementById("nextImageBtn")){
	document.getElementById("nextImageBtn").addEventListener("click", () => {
		currentIndex = (currentIndex + 1) % images1.length;
		updateImage();
	});
	}
	
	imgElement = document.getElementById("switchableImage");
    captionElement = document.getElementById("imageCaption");
}

function updateInfoBlockMenu(index) {
    const cur_dish = selectedRestaurant.dishes[index]
    const infoBlock = document.querySelector(".info");
	infoBlock.scrollTop = 0;
    infoBlock.classList.add("active");
    infoBlock.innerHTML = `
		<div class="dish">
			<div class="info-text dish-name">
				<h3>${cur_dish.name}</h3>
			</div>
			<div class="dish-info">
				<div class="image-switch-container dish-image">
				<img src=${cur_dish.img} alt="${cur_dish.name}" class="info-image">
				</div>

					${cur_dish.recipe}
				
			</div>
		</div>
    `;
}