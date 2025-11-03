const buttons = document.querySelectorAll(".region-button");
const citySelect = document.getElementById("city");
const restaurantSelect = document.getElementById("restaurant");

function updateRestoranSelectList(){
	const selectedCity = citySelect.value;
    const restaurants = all_towns.get(selectedCity).restorans || [];
    restaurantSelect.innerHTML = "";
	console.log(restaurants.size)
    if (restaurants.size === 0) {
      restaurantSelect.disabled = true;
      restaurantSelect.innerHTML = `<option value="" disabled selected>Нет данных</option>`;
      return;
    }
	
    restaurantSelect.disabled = false;
    restaurantSelect.innerHTML = `<option value="" disabled selected>Выберите ресторан</option>`;
	
    restaurants.forEach((restoran_name, restoran_id) => {
      const option = document.createElement("option");
      option.value = restoran_id;
      option.textContent = restoran_name;
      restaurantSelect.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", () => {
	const resetButton = document.getElementById("resetButton");
    let selectedType = null; // Запоминаем выделенный тип

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            resetCitySelect()
			resetRestoranSelect()
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
        resetCitySelect()
        resetRestoranSelect()
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

	function resetCitySelect() {
		document.getElementById("city").selectedIndex = 0;
	}

	citySelect.addEventListener("change", () => {
		if (citySelect.selectedIndex != 0){
			console.log("updated_city_select")
			updateRestoranSelectList()
			for(let i=0; i<all_regions_town.length; i++) {
				if (all_regions_town[i].town_id == citySelect.value){
					selectedTown = all_regions_town[i];
					break;
				}
			}
			restaurantSelect.selectedIndex = 0
			openTownMap()
			updateInfoBlock("none")
		}
	});

	
	function resetRestoranSelect(){
		restaurantSelect.innerHTML = "";
		restaurantSelect.disabled = true;
		restaurantSelect.innerHTML = `<option value="" selected disabled>Сначала выберите город</option>`;
		restaurantSelect.selectedIndex = 0;
	}

	restaurantSelect.addEventListener("change", () => {
		if (restaurantSelect.selectedIndex != 0 && citySelect.selectedIndex != 0){
			console.log("updated_town_select", restaurantSelect.value )
			openTownMap()
			for(let i=0; i<selectedTown.town_restorans.length; i++) {
				console.log(selectedTown.town_restorans[i].id, restaurantSelect.value)
				if (selectedTown.town_restorans[i].id == restaurantSelect.value){
					console.log("finded")
					selectedRestaurant = selectedTown.town_restorans[i];
					break;
				}
			}
			updateRestaurantInfo()
		}
	});
	
	all_towns.forEach((town_info, town_id) =>
	{
	  console.log(town_id);
	  const option = document.createElement("option");
      option.value = town_id;
      option.textContent = town_info.name;
      citySelect.appendChild(option);
	});
});
