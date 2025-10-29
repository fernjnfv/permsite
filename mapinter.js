const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");

const mapImage = new Image();
mapImage.src = "risunok2.png"; // Файл карты
const chaikImage = new Image();
chaikImage .src = "chaik_map.png"; // Файл карты
const menuimage = new Image();
menuimage .src = "menu_image.jpg"; // Файл карты

const contrastmapImage= new Image();
contrastmapImage.src = "risunok2_up.png"; // Файл карты контрастный
const regionImage = document.getElementById("regionImage");

let hovered = false;
let curscale = 1.0
let x = 0
let y = 0
let x1 = 0
let y1 = 0
let displayWidth = 1
let displayHeight = 1
let displayWidth1 = 1
let displayHeight1= 1
let curimage = null
let hovered_old = true
let hovered_region = null
let hovered_region_old = null
let curr_map = 1
let scale = 1
let scale1 = 1

canvas.addEventListener("mousemove", (event) => {
    if (hovered){
		hovered_old = true}
	else{
		hovered_old = false
	}
	if (curr_map == 1) {
		const { offsetX, offsetY } = event;
		ctx.save();
		ctx.translate(x, y);
		ctx.scale(curscale ,curscale )
		hovered_region_old =  hovered_region
		for(let i=0; i<46; i++){
			hovered = ctx.isPointInPath(all_region[i], offsetX, offsetY);
			if (hovered){
				hovered_region = all_region[i]
				break;
			}
		}
		ctx.restore();
	} 
	if (curr_map == 3) {
		const { offsetX, offsetY } = event;
		let dishes = selectedRestaurant.dishes
		let dish = null
		for(let i=0; i<dishes.length; i++) { 
			dish = dishes[i]
			ctx.save();
			ctx.beginPath()
			ctx.translate(x1, y1);
			ctx.scale(scale1 ,scale1 )
			ctx.rect(dish.x, dish.y, dish.width, dish.height);
			hovered = ctx.isPointInPath(offsetX, offsetY);
			ctx.restore();
			if (hovered){
				draw();
				ctx.save();
				ctx.lineWidth = 3;
				ctx.beginPath()
				ctx.translate(x1, y1);
				ctx.scale(scale1 ,scale1 )
				ctx.rect(dish.x, dish.y, dish.width, dish.height);
				ctx.strokeStyle = "rgba(256, 0, 0, 1)";
				ctx.stroke();
				ctx.restore();
				break;
			}
		}
	}
	if ((hovered_old != hovered )  || hovered_region_old !=  hovered_region ) {
		if(curr_map == 1){
			draw();
			updateInfoBlock("none")
		}
		else{
			if(!hovered ){
				draw()
			}
		}
	}
});

canvas.addEventListener("click", (event) => {
    if(curr_map == 1){
		const { offsetX, offsetY } = event;
		ctx.save();
		ctx.translate(x, y);
		ctx.scale(curscale ,curscale )
		let clicked= ctx.isPointInPath(chaik , offsetX, offsetY);
		ctx.restore();
		if (clicked){
			openChaik()
		}
    }
})


canvas.addEventListener("click", (event) => {
    if(curr_map == 3){
        const { offsetX, offsetY } = event;
        let dishes = selectedRestaurant.dishes
        let dish = null
        for(let i=0; i<dishes.length; i++) { 
            dish = dishes[i]
            ctx.save();
            ctx.beginPath()
            ctx.translate(x1, y1);
            ctx.scale(scale1 ,scale1 )
            ctx.rect(dish.x, dish.y, dish.width, dish.height);
            let clicked= ctx.isPointInPath(offsetX, offsetY);
            ctx.restore();
            if (clicked){
                draw();
                updateInfoBlockMenu(i)
                break;
            }
		}
    }
})


function openChaik(){
	 curimage = chaikImage 
	 curr_map = 2
	 hovered = false
	 regionImage.src = "Chaik_letters.png"; 
	 draw();
}

function setCanvasSize() {
    const container = canvas.parentElement;
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.clientWidth;
}

function draw() {
	switch (curr_map ) {
		case 1:
			drawFirst();
			break;
		case 2:
			drawSecond();
			break;
		case 3:
			DrawTherd()
			break;
		default:
			alert( "Нет таких значений" );
	}    
}

function drawBacground()
{
    const imageWidth = curimage.naturalWidth;
    const imageHeight = curimage.naturalHeight;
    // Рассчитываем масштаб для сохранения пропорций
    scale = Math.min(canvas.width / imageWidth, canvas.height / imageHeight);

    // Вычисляем итоговые размеры изображения
    displayWidth = imageWidth * scale;
    displayHeight = imageHeight * scale;

    // Вычисляем позицию (по центру)
    x = (canvas.width- displayWidth) / 2;
    y = (canvas.height - displayHeight) / 2;

    //curscale = canvas.height / 402.0
    curscale = imageHeight*scale/ 402.0
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(curimage , x, y, displayWidth , displayHeight ); // Фоновая карта
}

function drawFirst()
{
	drawBacground()
	if (hovered) {
		buttons.forEach(button => button.classList.remove("active"));
		// Добавляем свечение или тень
		ctx.save();
		ctx.shadowColor = "rgba(0, 0, 0, 1.0)";
		ctx.shadowBlur = 60;  // Увеличил тень
		ctx.translate(x, y);
		ctx.scale(curscale , curscale);        
		ctx.fill(hovered_region )
		ctx.restore();
		ctx.save();
		ctx.translate(x, y);
		ctx.scale(curscale , curscale )
		ctx.strokeStyle = "white";
		ctx.lineWidth = 3;
		ctx.stroke(hovered_region );
		ctx.restore();
		ctx.save();
		ctx.translate(x, y);
		ctx.scale(curscale , curscale )
		ctx.clip(hovered_region );
		ctx.drawImage(curimage , 0, 0, displayWidth/curscale , displayHeight/curscale );
		ctx.stroke(hovered_region );
		ctx.restore();
	}
}

function drawSecond()
{
	drawBacground()
	drawMap()
}

function DrawTherd(){
	ctx.save();
	ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
	ctx.globalCompositeOperation = "destination-out";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = "destination-in"
	ctx.drawImage(mapImage, x, y, displayWidth , displayHeight ); 
	ctx.restore();

	const imageWidth = menuimage .naturalWidth;
	const imageHeight = menuimage .naturalHeight;
	// Рассчитываем масштаб для сохранения пропорций
	scale1 = Math.min(canvas.width / imageWidth, canvas.height / imageHeight);

	// Вычисляем итоговые размеры изображения
	displayWidth1 = imageWidth * scale1;
	displayHeight1 = imageHeight * scale1;

	// Вычисляем позицию (по центру)
	x1 = (canvas.width- displayWidth1) / 2;
	y1 = (canvas.height - displayHeight1) / 2;

	//curscale = canvas.height / 402.0
	curscale = imageHeight*scale/ 402.0
	ctx.drawImage(menuimage, x1, y1, displayWidth1 , displayHeight1 ); // Фоновая карта
	selectedRestaurant.dishes.forEach(dish=> {
		ctx.save();
		ctx.strokeStyle = "rgba(256, 0, 0, 0.2)";
		ctx.lineWidth = 3;
		ctx.beginPath()
		ctx.translate(x1, y1);
		ctx.scale(scale1 ,scale1 )
		ctx.rect(dish.x, dish.y, dish.width, dish.height);
		ctx.stroke();
		ctx.restore();
	})
}

function get_region(region){
    switch(region) {
		case 'russian':
			return [rusPath1, rusPath2];
		
		case 'komi':
			return [comiPath];
		
		case 'tatar':
			return [tatarPath];
		
		case 'turkic':
			return [turscPath1, turscPath2, turscPath3];
		
		case 'finno-ugric':
			return [finoPath1, finoPath2];
		
		case 'turkic-finno':
			return [mixPath];
	}
}

function drawselectedregion(region){
	cur_regions = get_region(region)
	resetdraw()
	ctx.save();
	ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
	ctx.globalCompositeOperation = "destination-out";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = "destination-in"
	ctx.drawImage(mapImage, x, y, displayWidth , displayHeight ); 
	ctx.restore();
	ctx.save();
	ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
	ctx.shadowBlur = 15;
	ctx.strokeStyle = "white";
	ctx.lineWidth = 3;
	ctx.translate(x, y);
	ctx.scale(curscale , curscale )
	for (let i = 0; i < cur_regions.length; i++) { 
		ctx.stroke(cur_regions[i]);
	}
	ctx.restore();
	for (let i = 0; i < cur_regions.length; i++) { 
		ctx.save();
		ctx.translate(x, y);
		ctx.scale(curscale , curscale )
		ctx.clip(cur_regions[i]);
		ctx.drawImage(mapImage, 0, 0, displayWidth/curscale , displayHeight/curscale );
		ctx.restore();
	}
	ctx.save();
	ctx.strokeStyle = "white";
	ctx.lineWidth = 3;
	ctx.translate(x, y);
	ctx.scale(curscale , curscale )
	for (let i = 0; i < cur_regions.length; i++) { 
		ctx.stroke(cur_regions[i]);
	}
    ctx.restore();
}

function resetdraw(){
    curimage = mapImage
    curr_map = 1
    regionImage.src = "Perms.png"; 
    draw()
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
		mapImage.onload = () => {
			curimage = mapImage
			setCanvasSize(); // Устанавливаем фиксированный размер
			draw();
		};
		if (mapImage.complete) {
			mapImage.onload();
		}
    }, 0); // Минимальная задержка, чтобы дать браузеру отрендерить макет
});

