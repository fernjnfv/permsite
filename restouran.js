const infoBlock = document.querySelector(".info");
let img = new Image();
img.src = "restaurant_icon.svg";
const iconPath = new Path2D(); // Создаём круглый Path2D
iconPath.arc(0, 0, 20, 0, Math.PI * 2);
let selectedRestaurant = null;
let showMenu = false;
let selectedDish = null;
let currentImageIndex = 0;



let menuOpen = false;

function draw_logo(rest ){
   ctx.save();
   ctx.translate(x, y);
   ctx.scale(scale , scale )
   ctx.drawImage(img, rest.x - 20, rest.y - 20, 40, 40);
   ctx.restore();
}

function drawMap() {
    ctx.save();
	selectedTown.town_restorans.forEach(rest => {
		img.onload = () => {
			draw_logo(rest )
		};
		if (img.complete) {
			draw_logo(rest )
		}
	});
}



function updateRestaurantInfo() {
    const infoBlock = document.querySelector(".info");
    infoBlock.innerHTML = `
        <div class="info-text">
            <h3>${selectedRestaurant.name}</h3>
            <p><strong>Адрес:</strong> ${selectedRestaurant.address}</p>
            <p><strong>Телефон:</strong> ${selectedRestaurant.phone}</p>
            <p><strong>Часы работы:</strong> ${selectedRestaurant.hours}</p>
            
			<div class="carousel-container">
				<button class="carousel-btn left-btn">&lt;</button>
				<div class="carousel">
				</div>
				<button class="carousel-btn right-btn">&gt;</button>
			</div>
            
            <div class="menu-preview">
                <img src="${selectedRestaurant.menuImage}" id="menuButton" class="menu-image">
                <p><em>Нажмите, чтобы открыть меню</em></p>
            </div>
        </div>
    `;

	function loadCarousel() {
		const carousel = document.querySelector(".carousel");
		carousel.innerHTML = ""; // Очистка старых изображений

		// Создаем картинки
		selectedRestaurant.images.forEach((src, i) => {
			const img = document.createElement("img");
			img.src = src;
			img.classList.add("carousel-image");
			carousel.appendChild(img);
		});

		// Обновляем ссылки на картинки
		images = document.querySelectorAll(".carousel-image");
		order = selectedRestaurant.images.map((_, i) => i);

		updateCarousel();
	}

	// Логика смены фото
	function updateCarousel() {
		if (!images.length) return;

		images.forEach(img => img.classList.remove("center", "side", "left", "right", "hidden"));

		if (images.length === 1) {
			// Только одна фотография — центр
			images[0].classList.add("center");
			return;
		}

		if (images.length === 2) {
			// Две фотографии — левая и центральная
			images[order[0]].classList.add("side", "left");
			images[order[1]].classList.add("center");
			return;
		}

		// Три и более — классическая расстановка
		images[order[0]].classList.add("side", "left");
		images[order[1]].classList.add("center");
		images[order[2]].classList.add("side", "right");

		// Остальные прячем (если 4+)
		for (let i = 3; i < images.length; i++) {
			images[order[i]].classList.add("hidden");
		}
	}

	// Слушатели стрелок
	document.querySelector(".right-btn").addEventListener("click", () => {
		if (images.length <= 1) return;
		order.unshift(order.pop());
		updateCarousel();
	});

	document.querySelector(".left-btn").addEventListener("click", () => {
		if (images.length <= 1) return;
		order.push(order.shift());
		updateCarousel();
	})


    document.getElementById("menuButton").addEventListener("click", () => {
		showMenu = true;
		curr_map = 3        
		draw();
    });
	
    loadCarousel();
}


canvas.addEventListener("click", (event) => {
	if(curr_map == 2){
		const { offsetX, offsetY } = event;
		ctx.save();
		ctx.translate(x, y);
		ctx.scale(scale ,scale )
		selectedTown.town_restorans.forEach(rest => {
			ctx.translate(rest.x, rest.y);
			hovered = ctx.isPointInPath(iconPath, offsetX*scale2, offsetY*scale2);
			if (hovered ){
				selectedRestaurant = rest;
				updateRestaurantInfo()
				updateResouranSelectorMenu()
			}
			ctx.translate(-rest.x, -rest.y);
		});
		ctx.restore();
	}
});



function openMenu() {
	if (!selectedRestaurant) return;
	menuOpen = true;
	menuOverlay.classList.add("menu-overlay");
	menuOverlay.innerHTML = `
		<div class='menu-close' onclick='closeMenu()'>Назад</div>
		<canvas id='menuCanvas'></canvas>
	`;
	document.body.appendChild(menuOverlay);
	drawMenu();
}

function closeMenu() {
	menuOpen = false;
	menuOverlay.remove();
}

function drawMenu() {
	
}