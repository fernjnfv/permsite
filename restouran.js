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
	restaurants.forEach(rest => {
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
					<img src="img1.jpg" class="carousel-image side left">
					<img src="img2.jpg" class="carousel-image center">
					<img src="img3.jpg" class="carousel-image side right">
				</div>
				<button class="carousel-btn right-btn">&gt;</button>
			</div>
            
            <div class="menu-preview">
                <img src="${selectedRestaurant.menuImage}" id="menuButton" class="menu-image">
                <p><em>Нажмите, чтобы открыть меню</em></p>
            </div>
        </div>
    `;

	let images = document.querySelectorAll(".carousel-image");
    let order = [0, 1, 2]; // Индексы фотографий в текущем порядке

    document.querySelector(".right-btn").addEventListener("click", () => {
        order.unshift(order.pop()); // Сдвиг массива вправо
        updateCarousel();
    });

    document.querySelector(".left-btn").addEventListener("click", () => {
        order.push(order.shift()); // Сдвиг массива влево
        updateCarousel();
    });

    function updateCarousel() {
        images.forEach(img => img.classList.remove("center", "side", "left", "right"));
        images[order[0]].classList.add("side", "left");
        images[order[1]].classList.add("center");
        images[order[2]].classList.add("side", "right");
    }


    document.getElementById("menuButton").addEventListener("click", () => {
		showMenu = true;
		curr_map = 3        
		draw();
    });

}


canvas.addEventListener("click", (event) => {
	const { offsetX, offsetY } = event;
	ctx.save();
	ctx.translate(x, y);
	ctx.scale(scale ,scale )
	restaurants.forEach(rest => {
		ctx.translate(rest.x, rest.y);
		hovered = ctx.isPointInPath(iconPath, offsetX, offsetY);
		if (hovered ){
			selectedRestaurant = rest;
			updateRestaurantInfo()
		}
		ctx.translate(-rest.x, -rest.y);
	});
	ctx.restore();
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