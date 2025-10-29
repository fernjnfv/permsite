const buttons = document.querySelectorAll(".region-button");
const citySelect = document.getElementById("city");
const restSelect = document.getElementById("restaurant");
document.addEventListener("DOMContentLoaded", () => {
	const resetButton = document.getElementById("resetButton");
    let selectedType = null; // Запоминаем выделенный тип

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            resetCity()
			resetrest()
            // Если уже активна — снимаем выделение
            if (this.classList.contains("active")) {
                this.classList.remove("active");
                selectedType = null;
                clearHighlight();
                updateInfoBlock("none")
                return;
            }

            // Убираем выделение со всех кнопок
            buttons.forEach(btn => btn.classList.remove("active"));

            // Зажимаем нажатую кнопку
            this.classList.add("active");
            selectedType = this.getAttribute("data-type");

            // Заглушка: Выделяем область (замените на вашу функцию)
            highlightRegion(selectedType);
            updateInfoBlock(selectedType)
        });
    });

    // Кнопка сброса
    resetButton.addEventListener("click", () => {
        buttons.forEach(button => button.classList.remove("active"));
        selectedType = null;
        clearHighlight();
        updateInfoBlock("none")
        resetCity()
        resetrest()
    });

    //выделение области
    function highlightRegion(regionType) {
        console.log("Выделение региона:", regionType);
        drawselectedregion(regionType)
    }

    //очистка выделения
    function clearHighlight() {
       console.log("Сброс выделения");
       resetdraw()
    }

	function resetCity() {
		document.getElementById("city").selectedIndex = 0;
	}

	citySelect.addEventListener("change", () => {
		if (citySelect.selectedIndex == 1){
			restSelect.selectedIndex = 0
			openChaik()
			updateInfoBlock("none")
		}
	});

	function resetrest() {
		document.getElementById("restaurant").selectedIndex = 0;
	}

	restSelect.addEventListener("change", () => {
		if (restSelect .selectedIndex == 1){
			citySelect.selectedIndex = 1
			openChaik()
			selectedRestaurant = restaurants[0] 
			updateRestaurantInfo()
		}
	});
});
